import numpy as np
# import mysql.connector
import asyncio
import json
from threading import Thread
import time
from typing import Dict, Any
from urllib.parse import urlparse
from flask import Blueprint, Flask, request
from server.constant.constants import MAX_ISOLATED_URL_BATCH_LENGTH, FROM_ISOLATED_URL, ADD_ISOLATED_URL_CONTENT, DELETE_ISOLATED_URL_CONTENT
from server.app.utils.decorators import token_required
from server.app.utils.sqlite_client import get_db_connection
from server.app.utils.diskcache_lock import diskcache_lock
from server.app.utils.url_helper import is_valid_url, normalize_url
from server.logger.logger_config import my_logger as logger
from server.rag.index.parser.html_parser.web_content_crawler import AsyncCrawlerSiteContent
from server.app.test_kt_interface import fetch_exercise_records, cal_stu_knowledge_state_similarity
# from prompt import TASK_PROMPTS
from zhipuai import ZhipuAI
import re
import os
import torch
import sys
from scipy import sparse
import heapq
from params import *
import time
from gikt import GIKT
from util import gen_gikt_graph, build_adj_list


# 获取当前脚本的绝对路径
script_dir = os.path.dirname(__file__)

# 使用绝对路径加载模型和数据文件
model_path = os.path.join(script_dir, 'model-1/results.pth')
qq_table_path = os.path.join(script_dir, 'data/qq_table.npz')
qs_table_path = os.path.join(script_dir, 'data/qs_table.npz')
ss_table_path = os.path.join(script_dir, 'data/ss_table.npz')
question2idx_path = os.path.join(script_dir, 'data/question2idx.npy')
idx2question_path = os.path.join(script_dir, 'data/idx2question.npy')

qq_table = sparse.load_npz(qq_table_path).toarray()
qs_table = sparse.load_npz(qs_table_path).toarray()
ss_table = sparse.load_npz(ss_table_path).toarray()
question2idx = np.load(question2idx_path, allow_pickle=True).item()
idx2question = np.load(idx2question_path, allow_pickle=True).item()
num_question = torch.tensor(qs_table.shape[0], device='cpu')
num_skill = torch.tensor(qs_table.shape[1], device='cpu')

q_neighbors_list, s_neighbors_list = build_adj_list()
q_neighbors, s_neighbors = gen_gikt_graph(
    q_neighbors_list, s_neighbors_list, 4, 10)
q_neighbors = torch.tensor(q_neighbors, dtype=torch.int64, device='cpu')
s_neighbors = torch.tensor(s_neighbors, dtype=torch.int64, device='cpu')

# 初始化模型
model = GIKT(
    num_question, num_skill, q_neighbors, s_neighbors, qs_table
).to('cpu')

model.load_state_dict(torch.load(model_path))


TASK_PROMPTS = {
    "code-gen": {
        "functionalCorrectness":
            {
                "reference-free":
                    """\
                    You will be given the code snippet for a problem. 
                    Your task is to rate the code snippet only on one metric.
                    Please make sure you read and understand these instructions carefully.
                    Please keep this document open while reviewing, and refer to it as needed.
                    
                    Evaluation Criteria:
                    functionalCorrectness (0-4) - Execution-based quality of the code snippet combined with the problem. The correctness is measured by the all possible unit tests, and the comparison of the reference code. The combination of the code snippet and the problem should pass all the possible tests based on your understanding of the reference code. The length of the code snippet can not determine the correctness. You need to assess the logics line by line.
                    - A score of 0  (failing all possible test) means that the code snippet is totally incorrect and meaningless.
                    - A score of 4  (passing all possible test) means that the code snippet is totally correct and can handle all cases.
                    
                    
                    Evaluation Steps:
                    1. Read the problem carefully and identify required functionalities of the implementation.
                    2. Read the code snippet and compare it to the problem. Check if the code snippet covers all required functionalities of the problem. 
                    3. Assign a score for functionalCorrectness on a scale of 0 to 4, where 0 is the lowest and 4 is the highest based on the Evaluation Criteria.
                    
                    Problem:
                    
                    {{PROBLEM}}
                    
                    Code Snippet:
                    
                    {{OUTPUT}}
                    
                    Evaluation Form:
                    functionalCorrectness (scores ONLY):
                    """,
                "reference-enhanced":
                    """\
                    You will be given the code snippet for a problem. 
                    Your task is to rate the code snippet only on one metric.
                    Please make sure you read and understand these instructions carefully.
                    Please keep this document open while reviewing, and refer to it as needed.
                    
                    Evaluation Criteria:
                    functionalCorrectness (0-4) - Execution-based quality of the code snippet combined with the problem. The correctness is measured by the all possible unit tests, and the comparison of the reference code. The combination of the code snippet and the problem should pass all the possible tests based on your understanding of the reference code. The length of the code snippet can not determine the correctness. You need to assess the logics line by line.
                    - A score of 0  (failing all possible test) means that the code snippet is totally incorrect and meaningless.
                    - A score of 4  (passing all possible test) means that the code snippet is totally correct and can handle all cases.
                    
                    
                    Evaluation Steps:
                    1. Read the problem carefully and identify required functionalities of the implementation.
                    2. Read the code snippet and compare it to the reference code. Check if the code snippet covers all required functionalities of the problem, and if it is as good as the reference code. 
                    3. Assign a score for functionalCorrectness on a scale of 0 to 4, where 0 is the lowest and 4 is the highest based on the Evaluation Criteria.
                    
                    Problem:
                    
                    {{PROBLEM}}
                    
                    Reference Code:
                    
                    {{REFERENCE}}
                    
                    Code Snippet:
                    
                    {{OUTPUT}}
                    
                    Evaluation Form:
                    functionalCorrectness (scores ONLY):
                    """
            },
        "usefulness":
            {
                "reference-free":
                    """\
                    You will be given the code snippet for a problem.
                    Your task is to rate the code snippet only on one metric.
                    Please make sure you read and understand these instructions carefully.
                    Please keep this document open while reviewing, and refer to it as needed.
                    
                    Evaluation Criteria:
                    Usefulness (0-4) Usefulness of the code snippet based on the problem description.
                    
                    - A score of 0: Snippet is not at all helpful, it is irrelevant to the problem.
                    - A score of 1: Snippet is slightly helpful, it contains information relevant to the problem, but it is easier to write the solution from scratch.
                    - A score of 2: Snippet is somewhat helpful, it requires significant changes (compared to the size of the snippet), but is still useful.
                    - A score of 3: Snippet is helpful, but needs to be slightly changed to solve the problem.
                    - A score of 4: Snippet is very helpful, it solves the problem.
                    
                    Evaluation Steps:
                    1. Read the problem carefully and identify required functionalities of the implementation.
                    2. Read the code snippet and compare it to the problem. Check if the code snippet covers all required functionalities of the problem, and if it presents them in a clear and logical order. 
                    3. Assign a score for usefulness on a scale of 0 to 4, where 0 is the lowest and 4 is the highest based on the Evaluation Criteria.
                    
                    Problem:
                    
                    {{PROBLEM}}
                    
                    Code Snippet:
                    
                    {{OUTPUT}}
                    
                    Evaluation Form:
                    Usefulness (scores ONLY):
                    """,
                "reference-enhanced":
                    """\
                    You will be given the code snippet for a problem.
                    Your task is to rate the code snippet only on three metrics.
                    Please make sure you read and understand these instructions carefully.
                    Please keep this document open while reviewing, and refer to it as needed.
                    
                    Evaluation Criteria:
                    Usefulness (0-4) Usefulness of the code snippet based on the problem description and the comparison of reference code.
                    
                    - A score of 0: Snippet is not at all helpful, it is irrelevant to the problem.
                    - A score of 1: Snippet is slightly helpful, it contains information relevant to the problem, but it is easier to write the solution from scratch.
                    - A score of 2: Snippet is somewhat helpful, it requires significant changes (compared to the size of the snippet), but is still useful.
                    - A score of 3: Snippet is helpful, but needs to be slightly changed to solve the problem.
                    - A score of 4: Snippet is very helpful, it solves the problem.
                    
                    functionalCorrectness (0-4) Execution-based quality of the code snippet combined with the problem. The correctness is measured by all possible unit tests and the comparison of the reference code. The combination of the code snippet and the problem should pass all the possible tests based on your understanding of the reference code. The length of the code snippet can not determine the correctness. You need to assess the logic line by line. 
                    
                    - A score of 0 (failing all possible tests) means that the code snippet is totally incorrect and meaningless. 
                    - A score of 4 (passing all possible tests) means that the code snippet is totally correct and can handle all cases.
                    
                    codingStyle (0-4) Evaluate codingStyle in four areas: coding standards, comments, variable and function naming, and code structure.
                    
                    - A score of 0: Code snippet does not conform to any coding standards; lacks comments or comments are meaningless; variable and function naming is arbitrary and unclear; poor code structure with a lot of duplicate code or redundancy.
                    - A score of 1: Code snippet does not conform to Java coding standards; comments are lacking; variable and function naming is inaccurate or nonsensical; code structure is confusing and there is a lot of duplicate code.
                    - A score of 2: Code snippet generally conforms to Java coding standards; comments are lacking; there are some inaccuracies in variable and function naming; code structure is moderate with some duplicate code.
                    - A score of 3: Code snippet generally conforms to java coding standards; comments are clear but with a few omissions; variable and function naming are generally reasonable; code structure is generally clear with a few duplicates of code.
                    - A score of 4: Code snippet conforms to Java coding standards; comments are clear; variable naming and function naming are accurate and meaningful; code structure is reasonable with no duplicate code.
                    
                    Evaluation Steps:
                    1. Read the problem carefully and identify required functionalities of the implementation.
                    2. Read the code snippet and compare it to the problem and reference code. Check if the code snippet covers all required functionalities of the problem, and if it presents them in a clear and logical order. 
                    3. Assign a score for usefulness, functionalCorrectness and codingStyle on a scale of 0 to 4, where 0 is the lowest and 4 is the highest based on the Evaluation Criteria. Store the scores based on three criterias in the form of a dictionary, as shown: { "usefulness": 0, "functionalCorrectness": 4,"codingStyle":2 }.
                    
                    Problem:
                    
                    {{PROBLEM}}
                    
                    Reference Code:
                    
                    {{REFERENCE}}
                    
                    Code Snippet:
                    
                    {{OUTPUT}}
                    
                    Evaluation Form:
                    Evaluation (scores ONLY!!! NO Explanations and other extraneous content):
                    
                    """
            },
        "suggestion":
            {
                "reference-enhanced":
                    """\
                    You will be given the code snippet(using Java),problem and the evaluation results.
                    Your task is to give Chinese suggestions for code improvements based on three metrics scores.
                    Please make sure you read and understand these instructions carefully.
                    Please keep this document open while reviewing, and refer to it as needed.
                    
                    
                    Evaluation Steps:
                    1. read the problem carefully and determine the functionality required for implementation.
                    2. read the code snippet and give Chniese suggestions for improvement based on three assessments: usefulness, functionalCorrectness, and codingStyle.
                    
                    
                    Problem:
                    
                    {{PROBLEM}}
                    
                    
                    Code Snippet:
                    
                    {{OUTPUT}}
                    
                    Evaluation Scores:
                    
                    {{SCORE}}
                    
                    Suggestion:(Suggestion Only)
                    
                    
                    """
            }
    }
}


urls_bp = Blueprint('urls', __name__, url_prefix='/open_kf_api/urls')


def async_isolated_url_content_task(url_dict: Dict[int, str], task_type: int) -> None:
    """
    Starts the asynchronous crawl and embedding process for a list of isolated urls.

    task_type:
      1 - add_content
      2 - delete_content
    """

    """Start the crawl content task in an asyncio event loop."""
    logger.info(
        f"async_isolated_url_content_task begin! url_dict: {url_dict}, task_type: {task_type}")
    crawler_content = AsyncCrawlerSiteContent(
        domain_list=[],
        doc_source=FROM_ISOLATED_URL
    )

    # Run the crawler
    if task_type == ADD_ISOLATED_URL_CONTENT:
        asyncio.run(crawler_content.add_content(url_dict))
    elif task_type == DELETE_ISOLATED_URL_CONTENT:
        asyncio.run(crawler_content.delete_content(url_dict))
    logger.info(f"async_isolated_url_content_task end!")


@urls_bp.route('/submit_isolated_url_list', methods=['POST'])
@token_required
def submit_isolated_url_list() -> Dict[str, Any]:
    data = request.json
    url_list = data.get('url_list')

    if not url_list:
        return {'retcode': -20000, 'message': 'url_list is required', 'data': {}}

    if len(url_list) > MAX_ISOLATED_URL_BATCH_LENGTH:
        return {'retcode': -20001, 'message': f"The size of 'url_list' is {len(url_list)}, which is greater than {MAX_ISOLATED_URL_BATCH_LENGTH}", 'data': {}}

    normalized_url_list = []
    for url in url_list:
        if not is_valid_url(url):
            logger.error(f"url: '{url}' is not a valid URL!")
            return {'retcode': -20002, 'message': f"url: '{url}' is not a valid URL", 'data': {}}
        normalized_url_list.append(normalize_url(url))

    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        # Find which URLs already exist in the database
        placeholders = ', '.join(['?'] * len(normalized_url_list))
        cur.execute(
            f"SELECT id, url FROM t_isolated_url_tab WHERE url IN ({placeholders})", normalized_url_list)
        existing_urls = {row['url']: row['id'] for row in cur.fetchall()}
        logger.warning(f"The existing_urls is {existing_urls}")

        # Determine new and existing URLs
        existing_to_update = []
        new_to_insert = []

        timestamp = int(time.time())
        for url in normalized_url_list:
            if url in existing_urls:
                existing_to_update.append((timestamp, existing_urls[url]))
            else:
                new_to_insert.append((url, timestamp, timestamp))

        try:
            with diskcache_lock.lock():
                # Update all existing URLs in one operation
                if existing_to_update:
                    cur.executemany(
                        "UPDATE t_isolated_url_tab SET doc_status = 1, mtime = ? WHERE id = ?", existing_to_update)

                # Insert all new URLs in one operation
                if new_to_insert:
                    cur.executemany(
                        "INSERT INTO t_isolated_url_tab (url, content, content_length, content_md5, doc_status, ctime, mtime) VALUES (?, '[]', 0, '', 1, ?, ?)", new_to_insert)

                conn.commit()
        except Exception as e:
            logger.error(f"Process discache_lock exception: {e}")
            return {'retcode': -30000, 'message': f'An error occurred: {e}', 'data': {}}

        cur.execute(
            f"SELECT id, url FROM t_isolated_url_tab WHERE url IN ({placeholders})", normalized_url_list)
        url_dict = {row['id']: row['url'] for row in cur.fetchall()}

        # Start the asynchronous crawl task
        Thread(target=async_isolated_url_content_task, args=(
            url_dict, ADD_ISOLATED_URL_CONTENT)).start()

        return {'retcode': 0, 'message': 'URLs processed successfully', 'data': {'url_id_list': list(url_dict.keys())}}
    except Exception as e:
        logger.error(f"An error occurred: {e}")
        return {'retcode': -30000, 'message': f'An error occurred: {e}', 'data': {}}
    finally:
        if conn:
            conn.close()


@urls_bp.route('/get_isolated_url_list', methods=['POST'])
@token_required
def get_isolated_url_list():
    data = request.json
    url_id_list = data.get('id_list', None)  # Make site an optional parameter

    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        if url_id_list:
            placeholders = ', '.join(['?'] * len(url_id_list))
            cur.execute(
                f"SELECT id, url, content_length, doc_status, ctime, mtime FROM t_isolated_url_tab WHERE id IN ({placeholders})", url_id_list)
        else:
            cur.execute(
                "SELECT id, url, content_length, doc_status, ctime, mtime FROM t_isolated_url_tab")

        rows = cur.fetchall()
        response_data = {}
        response_data['url_list'] = [dict(row) for row in rows]
        return {'retcode': 0, 'message': 'Success', 'data': response_data}
    except Exception as e:
        logger.error(f"An error occurred while fetching URL list: {e}")
        return {'retcode': -30000, 'message': f'An error occurred: {e}', 'data': {}}
    finally:
        if conn:
            conn.close()


@urls_bp.route('/delete_isolated_url_list', methods=['POST'])
@token_required
def delete_isolated_url_list():
    data = request.json
    url_id_list = data.get('id_list')

    if not url_id_list:
        return {'retcode': -20000, 'message': 'id_list is required', 'data': {}}

    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        placeholders = ', '.join(['?'] * len(url_id_list))
        cur.execute(
            f"SELECT id, url FROM t_isolated_url_tab WHERE id IN ({placeholders})", url_id_list)
        url_dict = {row['id']: row['url'] for row in cur.fetchall()}

        # Use threading to avoid blocking the Flask application
        Thread(target=async_isolated_url_content_task, args=(
            url_dict, DELETE_ISOLATED_URL_CONTENT)).start()

        return {'retcode': 0, 'message': 'Started deleting the isolated URL list embeddings.', 'data': {}}
    except Exception as e:
        logger.error(f"An error occurred while fetching URL list: {e}")
        return {'retcode': -30000, 'message': f'An error occurred: {e}', 'data': {}}
    finally:
        if conn:
            conn.close()


@urls_bp.route('/get_isolated_url_sub_content_list', methods=['POST'])
@token_required
def get_isolated_url_sub_content_list():
    data = request.json
    url_id = data.get('id')
    page = data.get('page')
    page_size = data.get('page_size')

    # Validate mandatory parameters
    if None in (url_id, page, page_size):
        return {'retcode': -20000, 'message': 'Missing mandatory parameters', 'data': {}}

    if not isinstance(page, int) or not isinstance(page_size, int) or page < 1 or page_size < 1:
        return {'retcode': -20001, 'message': 'Invalid page or page_size parameters', 'data': {}}

    conn = None
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        # Retrieve the content from the database
        cur.execute(
            'SELECT content FROM t_isolated_url_tab WHERE id = ?', (url_id,))
        row = cur.fetchone()
        if not row:
            return {'retcode': -30000, 'message': 'Content not found', 'data': {}}

        content = row['content']
        content_vec = json.loads(content)

        # Calculate pagination details
        total_count = len(content_vec)
        start_index = (page - 1) * page_size
        end_index = start_index + page_size
        if start_index > 0 and start_index >= total_count:
            return {'retcode': -20002, 'message': 'Page number out of range', 'data': {}}

        # Slice the content vector to get the sub-content list for the current page
        sub_content_list = [
            {"index": start_index + index + 1,
                "content": part, "content_length": len(part)}
            for index, part in enumerate(content_vec[start_index:end_index], start=start_index)
        ]

        return {
            "retcode": 0,
            "message": "success",
            "data": {
                "total_count": total_count,
                "sub_content_list": sub_content_list
            }
        }
    except Exception as e:
        logger.error(f"An error occurred: {e}")
        return {'retcode': -30001, 'message': 'Database exception', 'data': {}}
    finally:
        if conn:
            conn.close()


@urls_bp.route('/get_code_score', methods=['POST'])
def score():
    data = request.get_json()
    print("进入请求，获取请求数据")
    print(data)
    stu_code = data['code']
    problem = data['question']
    # 题目id
    if stu_code is None:
        print("代码为空，不存在！")
        return {
            'code': 0,
            'msg': '代码不存在',
            'data': {}
        }
    else:
        # glm-4评分
        print("进行评分！！")
        # print(stu_code)
        score_results = evaluate(problem=problem, output=stu_code)
        score_json = extract_json_with_regex(score_results)
        print("score json:", score_json)
        score = json.loads(score_json)
        suggestion = suggest(
            problem=problem, output=stu_code, score=score_results)
        # e_dict = {
        #     'usefulness':score['usefulness'],
        #     'functionalCorrectness':score['functionalCorrectness'],
        #     'codingStyle':score['codingStyle'],
        #     'suggestion':suggestion }

        return {
            'code': 1,
            'msg': "成功！",
            'data': {
                'usefulness': score['usefulness'],
                'functionalCorrectness': score['functionalCorrectness'],
                'codingStyle': score['codingStyle'],
                'suggestion': suggestion
            }
        }

    # 存给数据库


# 调用glm-4评分

def evaluate(problem, output, reference=None, task="code-gen", aspect="usefulness"):

    prompts = TASK_PROMPTS[task][aspect]["reference-enhanced"]
    prompts = prompts.replace(
        "{{PROBLEM}}", problem).replace("{{OUTPUT}}", output)
    # 请填写您自己的APIKey
    client = ZhipuAI(
        api_key=os.getenv('ZHIPUAI_API_KEY'))
    response = client.chat.completions.create(
        model=os.getenv('GLM_MODEL_NAME'),
        max_tokens=4095,
        messages=[
            {"role": "user", "content": prompts},
        ],
    )

    raw_output = response.choices[0].message.content
    print(raw_output)
    return raw_output


def suggest(problem, output, score, task='code-gen', aspect='suggestion'):
    prompts = TASK_PROMPTS[task][aspect]["reference-enhanced"]
    prompts = prompts.replace("{{PROBLEM}}", problem).replace(
        "{{OUTPUT}}", output).replace("{{SCORE}}", score)

    # 请填写您自己的APIKey
    client = ZhipuAI(
        api_key=os.getenv('ZHIPUAI_API_KEY'))
    response = client.chat.completions.create(
        model=os.getenv('GLM_MODEL_NAME'),  # 填写需要调用的模型名称
        max_tokens=4095,  # 填写生成内容的最长token数
        messages=[
            {"role": "user", "content": prompts},
        ],
    )

    raw_output = response.choices[0].message.content
    print(raw_output)
    return raw_output

@urls_bp.route('/get_program_tutor', methods=['POST'])
def program():
    data = request.get_json()
    question = data['question']
    tutor_prompt = "作为编程辅导讲师，你需要一步一步地帮助学生解决编程问题。请确保理解学生的问题，观察他们的解决方法是否正确。如果学生答案有误，提示他们如何改进，而不是直接给出答案。当学生询问如何解决问题时，可以通过提供一些Java知识点来引导他们逐步解决问题，但避免直接给出完整答案。你的目标是教会学生相关知识，并培养他们的算法和编程思维能力。接下来是学生的具体问题："
    prompt = tutor_prompt + question 
    # 请填写您自己的APIKey
    client = ZhipuAI(
        api_key=os.getenv('ZHIPUAI_API_KEY'))
    response = client.chat.completions.create(
        model=os.getenv('GLM_MODEL_NAME'),  # 填写需要调用的模型名称
        messages=[
            {"role": "user", "content": prompt},
        ],
    )
    raw_output = response.choices[0].message.content
    return {
        'code': 1,
        'msg': "success",
        'data': {
            'response': raw_output
        }
    }


# def extract_json_with_regex(text):
#     pattern = r'```json\s*(.*?)\s*```'
#     match = re.search(pattern, text, re.DOTALL)
#     if match:
#         return match.group(1)
#     else:
#         return text


# def extract_json_with_regex(text):
#     pattern = r'\{(.*?)\}'
#     match = re.search(pattern, text, re.DOTALL)
#     if match:
#         return match.group(1)
#     else:
#         return None


def extract_json_with_regex(text):
    # 查找第一个花括号之间的内容
    start_index = text.find('{')
    end_index = text.find('}')
    json_str = text[start_index:end_index + 1]

    try:
        # 尝试解析为JSON
        json_data = json.loads(json_str)
        # 转换为去除多余字符和换行符的JSON格式字符串
        cleaned_json_str = json.dumps(json_data, separators=(',', ':'))
        return cleaned_json_str
    except json.JSONDecodeError:
        # 如果解析失败，返回空字符串或其他适当的处理方式
        return ''


@urls_bp.route('/get_recommend_list', methods=['GET'])
def recommend():
    num = int(request.args.get("questionNum"))
    # user_id
    user_id = request.args.get("userId")
    print(user_id)
    history_answers = fetch_exercise_records(
        user_id)['exerciseRecordList']  # 获取历史答题记录
    q_list = [question2idx[a['exerciseId']]
              for a in history_answers]  # 获取答题记录的index
    # 获取相关的习题
    q_set_related = set()  # 所有相关问题的id集合
    for q_id in q_list:
        q_set_related.update(np.where(qq_table[q_id] > 0)[0].tolist())
    q_list_related = list(q_set_related)  # 所有相关问题的id数组
    if num > len(q_list_related):  # 相关题目比需要推荐的少，允许[重复]选
        q_list_related *= int(num / len(q_list_related) + 1)
    a_list = [1 if a['score'] >
              0 else 0 for a in history_answers]  # 获取答题answer记录
    max_length = 200  # 需要改为传值？
    question_tensor_list = []
    answer_tensor_list = []
    mask_tensor_list = []
    time_step = len(q_list)
    for q_related in q_list_related:
        combined_q_list = q_list + [q_related]  # 原始的答题记录加上最后一道用于预测的题目
        combined_a_list = a_list + [0]
        combined_m_list = [1 for i in range(len(combined_q_list))]
        if len(combined_q_list) < max_length:  # 如果序列长度小于最大长度
            combined_q_list += [0] * (max_length - len(combined_q_list))
            combined_a_list += [0] * (max_length - len(combined_a_list))
            combined_m_list += [0] * (max_length - len(combined_m_list))
        elif len(combined_q_list) > max_length:
            combined_q_list = combined_q_list[-max_length:]
            combined_a_list = combined_a_list[-max_length:]
            combined_m_list = combined_m_list[-max_length:]
        question_tensor_list.append(combined_q_list)
        answer_tensor_list.append(combined_a_list)
        mask_tensor_list.append(combined_m_list)
    question_tensor = torch.tensor(question_tensor_list, dtype=torch.int64)
    answer_tensor = torch.tensor(answer_tensor_list, dtype=torch.int64)
    mask_tensor = torch.tensor(mask_tensor_list, dtype=torch.int64)
    # 模型预测
    c_list = model(
        question=question_tensor,
        response=answer_tensor,
        mask=mask_tensor
    ).squeeze(dim=0).tolist()
    # 获取预测结果
    predict_list = [c_list[i][time_step] for i in range(len(q_list_related))]
    # 排序预测结果
    recommend = heapq.nsmallest(num, zip(predict_list, q_list_related))
    # 四舍五入预测结果，把推荐问题的index转为问题id
    c_list, q_list_recommend = [round(rec[0], 4) for rec in recommend], [
        idx2question[rec[1]] for rec in recommend]
    return {
        'code': 1,
        'msg': "success",
        'data': {
            'qList': q_list_recommend,
            'cList': c_list,
        }
    }


#最新版本的推荐接口
@urls_bp.route('/get_recommend_list_with_user_similarity', methods=['GET'])
def recommend_with_user_similarity():
    num = int(request.args.get("questionNum"))
    # user_id
    user_id = request.args.get("userId")
    print(user_id)
    # 获取所有的相似学生信息
    similar_users = cal_stu_knowledge_state_similarity(user_id)
    history_answers = fetch_exercise_records(user_id)['exerciseRecordList']
    all_questions = history_answers[:]
    # print(len(all_questions))
    print(len(similar_users))
    for student in similar_users:
        all_questions.extend(fetch_exercise_records(student[0])['exerciseRecordList'])
        # print(len(all_questions))
    print(len(history_answers))
    print(len(all_questions))
    q_list_all_questions = [question2idx[a['exerciseId']] for a in all_questions]  # 获取所有答题记录的index
    # 获取相关的习题
    q_set_related = set()  # 所有相关问题的id集合
    for q_id in q_list_all_questions:
        q_set_related.update(np.where(qq_table[q_id] > 0)[0].tolist())
    q_list_related = list(q_set_related)  # 所有相关问题的id数组
    if num > len(q_set_related):  # 相关题目比需要推荐的少，允许[重复]选
        q_list_related *= int(num / len(q_list_related) + 1)
    q_list = [question2idx[a['exerciseId']] for a in history_answers] 
    a_list = [1 if a['score'] >  0 else 0 for a in history_answers]  # 获取答题answer记录

    max_length = 200  # 需要改为传值
    question_tensor_list = []
    answer_tensor_list = []
    mask_tensor_list = []
    time_step = len(q_list)
    for q_related in q_list_related:
        combined_q_list = q_list + [q_related]  # 原始的答题记录加上最后一道用于预测的题目
        combined_a_list = a_list + [0]
        combined_m_list = [1 for i in range(len(combined_q_list))]
        if len(combined_q_list) < max_length:  # 如果序列长度小于最大长度
            combined_q_list += [0] * (max_length - len(combined_q_list))
            combined_a_list += [0] * (max_length - len(combined_a_list))
            combined_m_list += [0] * (max_length - len(combined_m_list))
        elif len(combined_q_list) > max_length:
            combined_q_list = combined_q_list[-max_length:]
            combined_a_list = combined_a_list[-max_length:]
            combined_m_list = combined_m_list[-max_length:]
        question_tensor_list.append(combined_q_list)
        answer_tensor_list.append(combined_a_list)
        mask_tensor_list.append(combined_m_list)
    question_tensor = torch.tensor(question_tensor_list, dtype=torch.int64)
    answer_tensor = torch.tensor(answer_tensor_list, dtype=torch.int64)
    mask_tensor = torch.tensor(mask_tensor_list, dtype=torch.int64)
    # 模型预测
    c_list = model(
        question=question_tensor,
        response=answer_tensor,
        mask=mask_tensor
    ).squeeze(dim=0).tolist()
    # 获取预测结果
    predict_list = [abs(c_list[i][time_step] - 0.6) for i in range(len(q_list_related))]
    # 排序预测结果
    recommend = heapq.nsmallest(num, zip(predict_list, q_list_related))
    # 四舍五入预测结果，把推荐问题的index转为问题id
    c_list, q_list_recommend = [round(rec[0], 4) for rec in recommend], [
        idx2question[rec[1]] for rec in recommend]
    return {
        'code': 1,
        'msg': "success",
        'data': {
            'qList': q_list_recommend,
            'cList': c_list,
        }
    }

