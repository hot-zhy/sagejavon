from concurrent.futures import ThreadPoolExecutor
from functools import wraps
import json
import os
from threading import Thread
import time
from typing import List, Dict, Any, Tuple
from urllib.parse import urlparse
from flask import Blueprint, Flask, request, Response
from langchain.schema.document import Document
from server.constant.constants import RECALL_TOP_K, RERANK_RECALL_TOP_K, MAX_QUERY_LENGTH, SESSION_EXPIRE_TIME, MAX_HISTORY_SESSION_LENGTH
from server.app.utils.decorators import token_required
from server.app.utils.sqlite_client import get_db_connection
from server.app.utils.diskcache_client import diskcache_client
from server.app.utils.diskcache_lock import diskcache_lock
from server.logger.logger_config import my_logger as logger
from server.rag.generation.llm_evaluate_ragas import llm_generator
from server.rag.pre_retrieval.query_transformation.rewrite import detect_query_lang
from server.rag.post_retrieval.rerank.flash_ranker import RerankRequest, reranker
from server.rag.retrieval.vector_search_evaluate_ragas import vector_search
import pandas as pd
from tqdm import tqdm
import traceback


LLM_NAME = "ZhipuAI"

MIN_RELEVANCE_SCORE = 0.4
BOT_TOPIC = "java"
USE_PREPROCESS_QUERY = 1
USE_RERANKING = 1
USE_DEBUG = 0



def get_user_query_history(user_id: str, is_streaming: bool) -> List[Any]:
    if is_streaming:
        history_key = f"open_kf:query_history:{user_id}:stream"
    else:
        history_key = f"open_kf:query_history:{user_id}"
    history_items = diskcache_client.get_list(history_key)[::-1]
    history = [json.loads(item) for item in history_items]
    return history


def save_user_query_history(user_id: str, query: str, answer: str, is_streaming: bool) -> None:
    try:
        # After generating the response from LLM
        # Store user query and LLM response in Cache
        if is_streaming:
            history_key = f"open_kf:query_history:{user_id}:stream"
            history_data = {'query': query, 'answer': answer}
        else:
            history_key = f"open_kf:query_history:{user_id}"
            answer_json = json.loads(answer)
            history_data = {'query': query, 'answer': answer_json}
        diskcache_client.append_to_list(history_key, json.dumps(
            history_data), ttl=SESSION_EXPIRE_TIME, max_length=MAX_HISTORY_SESSION_LENGTH)
    except Exception as e:
        logger.error(
            f"For the query: '{query}' and user_id: '{user_id}', is processed failed with Cache, the exception is {e}")

    timestamp = int(time.time())
    conn = None
    try:
        # Store user query and LLM resposne in DB
        conn = get_db_connection()
        try:
            with diskcache_lock.lock():
                if is_streaming:
                    conn.execute('INSERT INTO t_user_qa_record_tab (user_id, query, answer, source, ctime, mtime) VALUES (?, ?, ?, ?, ?, ?)',
                                 (user_id, query, answer, '[]', timestamp, timestamp))
                else:
                    conn.execute('INSERT INTO t_user_qa_record_tab (user_id, query, answer, source, ctime, mtime) VALUES (?, ?, ?, ?, ?, ?)',
                                 (user_id, query, answer_json["answer"], json.dumps(answer_json["source"]), timestamp, timestamp))
                conn.commit()
        except Exception as e:
            logger.error(f"process discache_lock exception:{e}")
            return {'retcode': -30000, 'message': f'An error occurred: {e}', 'data': {}}
    except Exception as e:
        logger.error(
            f"For the query: '{query}' and user_id: '{user_id}', is processed failed with Database, the exception is {e}")
    finally:
        if conn:
            conn.close()


def refine_query(query: str, history_context: str, lang: str) -> str:
    prompt = f"""Given a conversation (between Human and Assistant) and a follow up message from Human, using the prior knowledge relationships, rewrite the message to be a standalone and detailed question that captures all relevant context from the conversation. Ensure the rewritten question:
1. Preserves the original intent of the follow-up message.
2. If the true intent of the follow-up message cannot be determined, make no modifications to avoid generating an incorrect question.
3. The length of the rewritten question should not increase significantly compared to the follow-up message, to avoid altering the original intent.
4. Do not directly use the content of the Assistant's responses to form the rewritten question. Prioritize referring to the information of the Human's historical question.
5. Maintains the same language as the follow-up message (e.g., reply in Chinese if the question was asked in Chinese and in English if it was asked in English).

Chat History (Sorted by request time from most recent to oldest):
{history_context}

Follow Up Input: {query}

**NOTE:** The detected language of the Input is '{lang}'. Please respond in '{lang}'.

Refined Standalone Question:"""

    beg_time = time.time()
    response = llm_generator.generate(prompt, False, False)
    timecost = time.time() - beg_time
    if os.getenv('LLM_NAME') == 'SparkAI':
        adjust_query = response.generations[0][0].text
    else:
        adjust_query = response.choices[0].message.content
    logger.warning(
        f"For the query: '{query}', the refined query is '{adjust_query}'. The timecost is {timecost}")
    if hasattr(response, 'usage'):
        logger.warning(
            f"[Track token consumption] for refine_query: '{query}', usage={response.usage}")
    return adjust_query


def search_documents(query: str, k: int) -> List[Tuple[Document, float]]:
    beg_time = time.time()
    results = vector_search.similarity_search_with_relevance_scores(query, k)
    timecost = time.time() - beg_time
    logger.warning(
        f"search_documents, query: '{query}', k: {k}, the timecost is {timecost}")
    return results


def rerank_documents(query: str, results: List[Tuple[Document, float]]) -> List[Dict[str, Any]]:
    passages: List[Dict[str, Any]] = []
    index = 1
    for doc, chroma_score in results:
        item = {
            "id": index,
            "text": doc.page_content,
            "metadata": doc.metadata,
            "chroma_score": chroma_score
        }
        index += 1
        passages.append(item)

    rerank_results = []
    if passages:
        beg_time = time.time()
        rerankrequest = RerankRequest(query=query, passages=passages)
        rerank_results = reranker.rerank(rerankrequest)
        timecost = time.time() - beg_time
        logger.warning(
            f"For the query: '{query}', rerank_documents, the timecost is {timecost}")

    if USE_DEBUG:
        rerank_info = "\n--------------------\n".join([
            f"ID: {item['id']}\nTEXT: {item['text']}\nMETADATA: {item['metadata']}\nCHROME_SCORE: {item['chroma_score']}\nSCORE: {item['score']}"
            for item in rerank_results
        ])
        logger.info(
            f"==========\nFor the query: '{query}', the rerank results is:\n{rerank_info}\n==========")

    return rerank_results


def filter_documents(results: List[Tuple[Document, float]], min_relevance_score: float) -> List[Tuple[Document, float]]:
    filter_results = []
    for doc, score in results:
        if score >= min_relevance_score:
            filter_results.append((doc, score))
    return filter_results


def get_recall_documents(current_query, refined_query, k, user_id, min_relevance_score: float) -> List[Tuple[Document, float]]:
    if current_query == refined_query:
        ret = search_documents(current_query, k)
        results = filter_documents(ret, min_relevance_score)
        if USE_DEBUG:
            results_info = "\n********************\n".join([
                f"URL: {doc.metadata['source']}\nscore: {score}\npage_content: {doc.page_content}"
                for doc, score in results
            ])
            logger.info(
                f"==========\nFor the current_query: '{current_query}', '{user_id}', the recall results is\n{results_info}\n==========")

        return results

    with ThreadPoolExecutor() as executor:
        future_ret1 = executor.submit(search_documents, current_query, k)
        future_ret2 = executor.submit(search_documents, refined_query, k)

        ret1 = filter_documents(future_ret1.result(), min_relevance_score)
        ret2 = filter_documents(future_ret2.result(), min_relevance_score)

        if USE_DEBUG:
            results_info1 = "\n********************\n".join([
                f"URL: {doc.metadata['source']}\nscore: {score}\npage_content: {doc.page_content}"
                for doc, score in ret1
            ])
            logger.info(
                f"==========\nFor the current_query: '{current_query}', '{user_id}', the recall results is\n{results_info1}\n==========")

            results_info2 = "\n********************\n".join([
                f"URL: {doc.metadata['source']}\nscore: {score}\npage_content: {doc.page_content}"
                for doc, score in ret2
            ])
            logger.info(
                f"==========\nFor the refined_query: '{refined_query}', '{user_id}', the recall results is\n{results_info2}\n==========")

        ret = ret1 + ret2
        results = []
        source_id_set = set()
        for doc, chroma_score in ret:
            source_id = doc.metadata["id"]
            if source_id not in source_id_set:
                source_id_set.add(source_id)
                results.append((doc, chroma_score))
            else:
                logger.warning(f"source_id: '{source_id}' is already existed!")

        return results

# 在这里评估不同的模型，和生成ragas的评估数据集，修改这个函数，执行过程中保存JSON，在用户端操作

def generate_answer(query: str, user_id: str, is_streaming: bool = False):
    try:
        bot_topic = BOT_TOPIC

        # Detect the language of the query
        lang = detect_query_lang(query)
        logger.warning(f"For query: '{query}', detect the language is '{lang}'!")

        history_context = f"""Human: Hello
    Assistant: I'm here to assist you with information related to `{bot_topic}`. If you have any specific questions about our services or need help, feel free to ask, and I'll do my best to provide you with accurate and relevant answers."""
        # Get the history session from the cache
        history_session = get_user_query_history(user_id, is_streaming)
        if history_session:
            # Build the history context, showing user's historical queries and answers
            history_context = "\n--------------------\n".join([
                f"**Human:** {item['query']}\n**Assistant:** {item['answer']}"
                for item in history_session
            ])

        if USE_PREPROCESS_QUERY and history_context:
            adjust_query = refine_query(query, history_context, lang)
        else:
            adjust_query = query

        if USE_RERANKING:
            top_k = RERANK_RECALL_TOP_K
        else:
            top_k = RECALL_TOP_K

        results = get_recall_documents(
            query, adjust_query, top_k, user_id, MIN_RELEVANCE_SCORE)

        filter_context = ''
        # Build the context with filtered documents, showing relevant documents
        if USE_RERANKING and results:
            # Rerank the documents
            rerank_results = rerank_documents(query, results)
            if rerank_results:
                filter_context = "\n--------------------\n".join([
                    f"Citation URL: {doc['metadata']['source']}\nDocument Content: {doc['text']}"
                    for doc in rerank_results[:RECALL_TOP_K]
                ])
        else:
            if len(results) > 1:
                results.sort(key=lambda x: x[1], reverse=True)

            if results:
                filter_context = "\n--------------------\n".join([
                    f"Citation URL: {doc.metadata['source']}\nDocument Content: {doc.page_content}"
                    for doc, score in results[:RECALL_TOP_K]
                ])

        if filter_context:
            context = f"""Chat History (Sorted by request time from most recent to oldest):
    {history_context}

    Documents Information:
    {filter_context}
    """
        else:
            # When no directly related documents are found, provide standard friendly response and guidance
            fallback_answer = f"""

    Please ensure:
    - If the user's question is a straightforward greeting, the assistant will offer a friendly standard response, guiding users to seek information or services related to `{bot_topic}`. Don't start with "I'm sorry, I cannot find a specific answer about '{query}' from the information provided.".
    - Maintain the context and meaning of the original message.
    - Respond in the language of the original question; for instance, reply in Chinese if the question was asked in Chinese and in English if it was asked in English!"""

            context = f"""Chat History (Sorted by request time from most recent to oldest):
    {history_context}

    Documents Information:
    {fallback_answer}
    """

        if not is_streaming:
            answer_format_prompt = '''**Expected Response Format:**
    The response should be a JSON object, with 'answer' and 'source' fields.
    - "answer": "A detailed and specific answer, crafted in the question's language and fully formatted using **Markdown** syntax. **Don't repeat the question**". Only cite the most relevant Documents that answer the question accurately.
    - "source": ["List only unique `Citation URL` from the context that are directly related to the answer. Ensure that each URL is listed only once. If no documents are referenced, or the documents are not relevant, use an empty list []. The number of `Citation URL` should not exceed {RECALL_TOP_K}. The generated answer must have indeed used content from the document corresponding to the `Citation URL` before including that URL in the `source`; otherwise, the URL should not be included in the `source`."]'''
        else:
            answer_format_prompt = '''**Expected Response Format:**
    The response should be fully formatted using **Mardown** syntax (Note: Don't start with 'Answer:' or 'answer:'). First output the answer. Then output the Sources. And remember the URL_PREFIX of the sources is 'https://rag.xhpolaris.com/'. And Remember to return the specific content of the files. Don't only return the url. You should also return the url's content.
    - A detailed and specific answer, crafted in the question's language. Don't repeat the question. Only cite the most relevant Documents that answer the question accurately.
    - Sources: "List only unique `Citation URL` from the context that are directly related to the answer. Ensure that each URL is listed only once. If no documents are referenced, or the documents are not relevant, return ''. The number of `Citation URL` should not exceed {RECALL_TOP_K}. The generated answer must have indeed used content from the document corresponding to the `Citation URL` before including that URL in the `Sources`; otherwise, the URL should not be included in the `Sources`."'''

        prompt = f"""
    You are a smart customer service assistant and problem-solver, tasked to answer any question about `{bot_topic}`. Using the provided context, answer the user's question to the best of your ability using the resources provided.

    If the user's question is a straightforward greeting, the assistant will offer a friendly standard response, guiding users to seek information or services related to `{bot_topic}`.

    Base on the Chat History and the provided context. First, analyze the provided context information without assuming prior knowledge. Identify all relevant aspects of knowledge contained within. Then, from various perspectives and angles, answer questions as thoroughly and comprehensively as possible to better address and resolve the user's question. If the question is not related to the provided context, the user is informed that no relevant answer can be provided.

    **Question:** {query}

    **Context for Answering the Question:**
    {context}

    **Response Requirements:**
    - Don't repeat the question at the beginning.
    - If unsure about the answer, proactively seek clarification.
    - Ensure that answers are strictly based on the provided context.
    - Inform users that questions unrelated to the provided context cannot be answered.
    - Format the answer using Markdown syntax for clarity and readability.
    - Respond in the language of the original question; for instance, reply in Chinese if the question was asked in Chinese and in English if it was asked in English!

    **REMEMBER:** Please do not fabricate any knowledge. If you cannot get knowledge from the provided context, please directly state that you do not know, rather than constructing nonexistent and potentially fake information!!!

    **NOTE:** The detected language of the question is '{lang}'. Please respond in '{lang}'.

    {answer_format_prompt}

    Please format answer as follows:
    The answer must be fully formatted using Markdown syntax. This includes:
    - **Bold** (`**bold**`) and *italic* (`*italic*`) text for emphasis.
    - Unordered lists (`- item`) for itemization and ordered lists (`1. item`) for sequencing.
    - `Inline code` (`` `Inline code` ``) for brief code snippets and (` ``` `) for longer examples, specifying the programming language for syntax highlighting when possible.
    - [Hyperlinks](URL) (`[Hyperlinks](URL)`) to reference external sources.
    - Headings (`# Heading 1`, `## Heading 2`, ...) to structure the answer effectively.
    """

        if USE_DEBUG:
            logger.info(f"$$$$$$$$$$\nPrompt is:\n{prompt}\n$$$$$$$$$$")

        if is_streaming:
            is_json = False
        else:
            is_json = True
        response = llm_generator.generate(prompt, is_streaming, is_json)
        print(response)
        return response
    except Exception as e:
        print("❌ [generate_answer] 错误:", str(e))
        traceback.print_exc()
        return json.dumps({
            "answer": f"[Error] internal error occurred: {str(e)}",
            "source": []
        }, ensure_ascii=False)
    

def generate_answer_without_RAG(query: str, user_id: str, is_streaming: bool = False):
    try:
        bot_topic = BOT_TOPIC

        # Detect the language of the query
        lang = detect_query_lang(query)
        logger.warning(f"For query: '{query}', detect the language is '{lang}'!")

        history_context = f"""Human: Hello
    Assistant: I'm here to assist you with information related to `{bot_topic}`. If you have any specific questions about our services or need help, feel free to ask, and I'll do my best to provide you with accurate and relevant answers."""
        # Get the history session from the cache
        history_session = get_user_query_history(user_id, is_streaming)
        if history_session:
            # Build the history context, showing user's historical queries and answers
            history_context = "\n--------------------\n".join([
                f"**Human:** {item['query']}\n**Assistant:** {item['answer']}"
                for item in history_session
            ])

        if USE_PREPROCESS_QUERY and history_context:
            adjust_query = refine_query(query, history_context, lang)
        else:
            adjust_query = query

        if USE_RERANKING:
            top_k = RERANK_RECALL_TOP_K
        else:
            top_k = RECALL_TOP_K

        results = get_recall_documents(
            query, adjust_query, top_k, user_id, MIN_RELEVANCE_SCORE)

        filter_context = ''
        # Build the context with filtered documents, showing relevant documents
        if USE_RERANKING and results:
            # Rerank the documents
            rerank_results = rerank_documents(query, results)
            if rerank_results:
                filter_context = "\n--------------------\n".join([
                    f"Citation URL: {doc['metadata']['source']}\nDocument Content: {doc['text']}"
                    for doc in rerank_results[:RECALL_TOP_K]
                ])
        else:
            if len(results) > 1:
                results.sort(key=lambda x: x[1], reverse=True)

            if results:
                filter_context = "\n--------------------\n".join([
                    f"Citation URL: {doc.metadata['source']}\nDocument Content: {doc.page_content}"
                    for doc, score in results[:RECALL_TOP_K]
                ])

        if not is_streaming:
            answer_format_prompt = '''**Expected Response Format:**
    The response should be a JSON object, with 'answer' and 'source' fields.
    - "answer": "A detailed and specific answer, crafted in the question's language and fully formatted using **Markdown** syntax. **Don't repeat the question**". Only cite the most relevant Documents that answer the question accurately.
    - "source": ["List only unique `Citation URL` from the context that are directly related to the answer. Ensure that each URL is listed only once. If no documents are referenced, or the documents are not relevant, use an empty list []. The number of `Citation URL` should not exceed {RECALL_TOP_K}. The generated answer must have indeed used content from the document corresponding to the `Citation URL` before including that URL in the `source`; otherwise, the URL should not be included in the `source`."]'''
        else:
            answer_format_prompt = '''**Expected Response Format:**
    The response should be fully formatted using **Mardown** syntax (Note: Don't start with 'Answer:' or 'answer:'). First output the answer. Then output the Sources. And remember the URL_PREFIX of the sources is 'https://rag.xhpolaris.com/'. And Remember to return the specific content of the files. Don't only return the url. You should also return the url's content.
    - A detailed and specific answer, crafted in the question's language. Don't repeat the question. Only cite the most relevant Documents that answer the question accurately.
    - Sources: "List only unique `Citation URL` from the context that are directly related to the answer. Ensure that each URL is listed only once. If no documents are referenced, or the documents are not relevant, return ''. The number of `Citation URL` should not exceed {RECALL_TOP_K}. The generated answer must have indeed used content from the document corresponding to the `Citation URL` before including that URL in the `Sources`; otherwise, the URL should not be included in the `Sources`."'''

        prompt = f"""
    You are a smart customer service assistant and problem-solver, tasked to answer any question about `{bot_topic}`. Using the provided context, answer the user's question to the best of your ability using the resources provided.

    If the user's question is a straightforward greeting, the assistant will offer a friendly standard response, guiding users to seek information or services related to `{bot_topic}`.

    Base on the Chat History and the provided context. First, analyze the provided context information without assuming prior knowledge. Identify all relevant aspects of knowledge contained within. Then, from various perspectives and angles, answer questions as thoroughly and comprehensively as possible to better address and resolve the user's question. If the question is not related to the provided context, the user is informed that no relevant answer can be provided.

    **Question:** {query}

    **Response Requirements:**
    - Don't repeat the question at the beginning.
    - If unsure about the answer, proactively seek clarification.
    - Ensure that answers are strictly based on the provided context.
    - Inform users that questions unrelated to the provided context cannot be answered.
    - Format the answer using Markdown syntax for clarity and readability.
    - Respond in the language of the original question; for instance, reply in Chinese if the question was asked in Chinese and in English if it was asked in English!

    **REMEMBER:** Please do not fabricate any knowledge. If you cannot get knowledge from the provided context, please directly state that you do not know, rather than constructing nonexistent and potentially fake information!!!

    **NOTE:** The detected language of the question is '{lang}'. Please respond in '{lang}'.

    {answer_format_prompt}

    Please format answer as follows:
    The answer must be fully formatted using Markdown syntax. This includes:
    - **Bold** (`**bold**`) and *italic* (`*italic*`) text for emphasis.
    - Unordered lists (`- item`) for itemization and ordered lists (`1. item`) for sequencing.
    - `Inline code` (`` `Inline code` ``) for brief code snippets and (` ``` `) for longer examples, specifying the programming language for syntax highlighting when possible.
    - [Hyperlinks](URL) (`[Hyperlinks](URL)`) to reference external sources.
    - Headings (`# Heading 1`, `## Heading 2`, ...) to structure the answer effectively.
    """

        if USE_DEBUG:
            logger.info(f"$$$$$$$$$$\nPrompt is:\n{prompt}\n$$$$$$$$$$")

        if is_streaming:
            is_json = False
        else:
            is_json = True
        response = llm_generator.generate(prompt, is_streaming, is_json)
        print(response)
        return response
    except Exception as e:
        print("❌ [generate_answer] 错误:", str(e))
        traceback.print_exc()
        return json.dumps({
            "answer": f"[Error] internal error occurred: {str(e)}",
            "source": []
        }, ensure_ascii=False)
    
def generate_answer_original_RAG(query: str, user_id: str, is_streaming: bool = False):
    try:
        bot_topic = BOT_TOPIC

        # Detect the language of the query
        lang = detect_query_lang(query)
        logger.warning(f"For query: '{query}', detect the language is '{lang}'!")

        history_context = f"""Human: Hello
    Assistant: I'm here to assist you with information related to `{bot_topic}`. If you have any specific questions about our services or need help, feel free to ask, and I'll do my best to provide you with accurate and relevant answers."""
        # Get the history session from the cache
        history_session = get_user_query_history(user_id, is_streaming)
        if history_session:
            # Build the history context, showing user's historical queries and answers
            history_context = "\n--------------------\n".join([
                f"**Human:** {item['query']}\n**Assistant:** {item['answer']}"
                for item in history_session
            ])

        if USE_PREPROCESS_QUERY and history_context:
            adjust_query = refine_query(query, history_context, lang)
        else:
            adjust_query = query

        if USE_RERANKING:
            top_k = RERANK_RECALL_TOP_K
        else:
            top_k = RECALL_TOP_K

        results = get_recall_documents(
            query, adjust_query, top_k, user_id, MIN_RELEVANCE_SCORE)

        filter_context = ''
        # Build the context with filtered documents, showing relevant documents
        if USE_RERANKING and results:
            # Rerank the documents
            rerank_results = rerank_documents(query, results)
            if rerank_results:
                filter_context = "\n--------------------\n".join([
                    f"Citation URL: {doc['metadata']['source']}\nDocument Content: {doc['text']}"
                    for doc in rerank_results[:RECALL_TOP_K]
                ])
        else:
            if len(results) > 1:
                results.sort(key=lambda x: x[1], reverse=True)

            if results:
                filter_context = "\n--------------------\n".join([
                    f"Citation URL: {doc.metadata['source']}\nDocument Content: {doc.page_content}"
                    for doc, score in results[:RECALL_TOP_K]
                ])

        if filter_context:
            context = f"""Chat History (Sorted by request time from most recent to oldest):
    {history_context}

    Documents Information:
    {filter_context}
    """
        else:
            # When no directly related documents are found, provide standard friendly response and guidance
            fallback_answer = f"""No documents found directly related to the current question!
    Please provide the response in the following format and ensure that the 'answer' part is translated into the same language as the user's question:

    "I'm sorry, I cannot find a specific answer about '{query}' from the information provided. I'm here to assist you with information related to `{bot_topic}`. If you have any specific questions about our services or need help, feel free to ask, and I'll do my best to provide you with accurate and relevant answers."

    Please ensure:
    - If the user's question is a straightforward greeting, the assistant will offer a friendly standard response, guiding users to seek information or services related to `{bot_topic}`. Don't start with "I'm sorry, I cannot find a specific answer about '{query}' from the information provided.".
    - Maintain the context and meaning of the original message.
    - Respond in the language of the original question; for instance, reply in Chinese if the question was asked in Chinese and in English if it was asked in English!"""

            context = f"""Chat History (Sorted by request time from most recent to oldest):
    {history_context}

    Documents Information:
    {fallback_answer}
    """

        if not is_streaming:
            answer_format_prompt = '''**Expected Response Format:**
    The response should be a JSON object, with 'answer' and 'source' fields.
    - "answer": "A detailed and specific answer, crafted in the question's language and fully formatted using **Markdown** syntax. **Don't repeat the question**". Only cite the most relevant Documents that answer the question accurately.
    - "source": ["List only unique `Citation URL` from the context that are directly related to the answer. Ensure that each URL is listed only once. If no documents are referenced, or the documents are not relevant, use an empty list []. The number of `Citation URL` should not exceed {RECALL_TOP_K}. The generated answer must have indeed used content from the document corresponding to the `Citation URL` before including that URL in the `source`; otherwise, the URL should not be included in the `source`."]'''
        else:
            answer_format_prompt = '''**Expected Response Format:**
    The response should be fully formatted using **Mardown** syntax (Note: Don't start with 'Answer:' or 'answer:'). First output the answer. Then output the Sources. And remember the URL_PREFIX of the sources is 'https://rag.xhpolaris.com/'. And Remember to return the specific content of the files. Don't only return the url. You should also return the url's content.
    - A detailed and specific answer, crafted in the question's language. Don't repeat the question. Only cite the most relevant Documents that answer the question accurately.
    - Sources: "List only unique `Citation URL` from the context that are directly related to the answer. Ensure that each URL is listed only once. If no documents are referenced, or the documents are not relevant, return ''. The number of `Citation URL` should not exceed {RECALL_TOP_K}. The generated answer must have indeed used content from the document corresponding to the `Citation URL` before including that URL in the `Sources`; otherwise, the URL should not be included in the `Sources`."'''

        prompt = f"""
    You are a smart customer service assistant and problem-solver, tasked to answer any question about `{bot_topic}`. Using the provided context, answer the user's question to the best of your ability using the resources provided.

    If the user's question is a straightforward greeting, the assistant will offer a friendly standard response, guiding users to seek information or services related to `{bot_topic}`.

    Base on the Chat History and the provided context. First, analyze the provided context information without assuming prior knowledge. Identify all relevant aspects of knowledge contained within. Then, from various perspectives and angles, answer questions as thoroughly and comprehensively as possible to better address and resolve the user's question. If the question is not related to the provided context, the user is informed that no relevant answer can be provided.

    **Question:** {query}

    **Context for Answering the Question:**
    {context}

    **Response Requirements:**
    - Don't repeat the question at the beginning.
    - If unsure about the answer, proactively seek clarification.
    - Ensure that answers are strictly based on the provided context.
    - Inform users that questions unrelated to the provided context cannot be answered.
    - Format the answer using Markdown syntax for clarity and readability.
    - Respond in the language of the original question; for instance, reply in Chinese if the question was asked in Chinese and in English if it was asked in English!

    **REMEMBER:** Please do not fabricate any knowledge. If you cannot get knowledge from the provided context, please directly state that you do not know, rather than constructing nonexistent and potentially fake information!!!

    **NOTE:** The detected language of the question is '{lang}'. Please respond in '{lang}'.

    {answer_format_prompt}

    Please format answer as follows:
    The answer must be fully formatted using Markdown syntax. This includes:
    - **Bold** (`**bold**`) and *italic* (`*italic*`) text for emphasis.
    - Unordered lists (`- item`) for itemization and ordered lists (`1. item`) for sequencing.
    - `Inline code` (`` `Inline code` ``) for brief code snippets and (` ``` `) for longer examples, specifying the programming language for syntax highlighting when possible.
    - [Hyperlinks](URL) (`[Hyperlinks](URL)`) to reference external sources.
    - Headings (`# Heading 1`, `## Heading 2`, ...) to structure the answer effectively.
    """

        if USE_DEBUG:
            logger.info(f"$$$$$$$$$$\nPrompt is:\n{prompt}\n$$$$$$$$$$")

        if is_streaming:
            is_json = False
        else:
            is_json = True
        response = llm_generator.generate(prompt, is_streaming, is_json)
        print(response)
        return response
    except Exception as e:
        print("❌ [generate_answer] 错误:", str(e))
        traceback.print_exc()
        return json.dumps({
            "answer": f"[Error] internal error occurred: {str(e)}",
            "source": []
        }, ensure_ascii=False)
    
# glm-4-flash  glm-4-air  glm-4-plus gpt-3.5-turbo gpt-4
# without_rag  original_rag  our_rag
# 论文中要加的几部分（放在最后的对比实验中（分析完部署数据结果以后新增的对比实验））：
# 1. 数据集选择Java常见面试题目 50道
# 2. 后台知识库的内容包括菜鸟编程 liuaoxuefeng的网站等网站，我们的RAG系统会爬取，还有上传的Java课堂的题目以及slides
# 3. 选用的评测模型:glm-4-flash  glm-4-air  glm-4-plus gpt-3.5-turbo gpt-4 选用的RAG:without_rag  original_rag  our_rag
# 4. 评估方式 ragas，ragas中的评估指标有哪些，ragas的优势，小数据量就可以全面地评估出基于RAG的llm回答的质量，尤其是特定领域的
# 5  评估结果, 做成表格 结果分析 结果可视化，RAG各部分的时间分析 效率问题
# 6. 在附录里应该有例子



# 现在主要要修改的就是文字部分
# 1. 论文中整体突出对RAG的改进部分，说了改了哪里，以及我们的提升是源于什么
# 2. 修改前面内容，introduction和related work 是不是要加一些RAG评估相关的论文
# 3. 整篇论文的章节组织是否合理
# 4. 加上github仓库链接，在摘要
# 5. 重新完善highlights, abstract, 图 
# 6. 换模板
# 7. 检查一遍   本周可以完成


# 这里是各个模型的our和without  our: flash air  plusing  without: flash air 


OUTPUT_CSV = "./dataanalysis/final-exam-ragas/output/ragas_gpt4_our_rag.csv"
INTERMEDIATE_JSON = "./dataanalysis/final-exam-ragas/output/ragas_gpt4_our_rag.jsonl"
INPUT_CSV = "./dataanalysis/final-exam-ragas/input/ragas_questions_with_ref.csv"

user_id = "ragas_eval_user"
df = pd.read_csv(INPUT_CSV)

if not {"user_input", "reference"}.issubset(df.columns):
    raise ValueError("输入文件必须包含列：'user_input', 'reference'")

results: List[Dict] = []

for i, row in tqdm(df.iterrows(), total=len(df), desc="调用RAG生成回答"):
    query = row["user_input"]
    reference = row["reference"]
    print(f"🔍 正在处理问题: {query}")

    try:
        response_json = generate_answer(query, user_id=user_id, is_streaming=False)

        if not response_json:
            raise ValueError("generate_answer 返回为空")

        print(f"🔍 Response Raw Type: {type(response_json)}")

        # ✅ STEP 1: 如果是 Completion 对象，先提取 content
        if hasattr(response_json, "choices") and hasattr(response_json.choices[0], "message"):
            raw_text = response_json.choices[0].message.content
        elif isinstance(response_json, str):
            raw_text = response_json
        else:
            raise ValueError("Unsupported response type")

        print("🧾 Raw LLM Answer Text:\n", raw_text)

        # ✅ STEP 2: 如果是 Markdown 格式包裹的 JSON，提取并解析
        if raw_text.strip().startswith("```json"):
            raw_text = raw_text.strip().removeprefix("```json").removesuffix("```").strip()

        try:
            parsed = json.loads(raw_text)
        except json.JSONDecodeError as e:
            print(f"[⚠️ JSON解析失败] 内容如下：\n{raw_text}\n错误信息: {e}")
            parsed = {}

        # ✅ STEP 3: 抽取 source 并转为 retrieved_contexts 数组形式
        sources = parsed.get("source", [])
        retrieved_contexts = []
        for src in sources:
            if isinstance(src, str):
                retrieved_contexts.append(src.strip())

        # ✅ STEP 4: 写入结果
        results.append({
            "user_input": query,
            "retrieved_contexts": retrieved_contexts,
            "response": parsed.get("answer", "ERROR"),
            "reference": reference
        })

        # ✅ STEP 5: 保存中间 JSONL 结果
        with open(INTERMEDIATE_JSON, "a", encoding="utf-8") as fout:
            fout.write(json.dumps({
                "query": query,
                "raw_response": parsed
            }, ensure_ascii=False) + "\n")

    except Exception as e:
        print(f"[ERROR] 处理问题: {query} 出错: {e}")
        results.append({
            "user_input": query,
            "retrieved_contexts": [],
            "response": "ERROR",
            "reference": reference
        })


# 保存 ragas 格式的数据集
df_out = pd.DataFrame(results)
df_out.to_csv(OUTPUT_CSV, index=False)
print(f"✅ 已保存 RAGAS 数据集：{OUTPUT_CSV}")