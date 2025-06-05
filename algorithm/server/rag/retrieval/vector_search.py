from typing import List, Tuple
from langchain.schema.document import Document
from server.rag.index.embedder.document_embedder import document_embedder
from rank_bm25 import BM25Okapi
from sklearn.feature_extraction.text import CountVectorizer

class VectorSearch:
    def __init__(self) -> None:
        self.vector_db = document_embedder.chroma_vector
        self.bm25_corpus = None  # 先设为空


    def _generate_bm25_corpus(self) -> List[str]:
        """
        Dynamically retrieve documents for BM25 corpus.
        """
        # 获取所有文档 id（假设Chroma里有）
        # 如果你的Chroma有查询方法的话，例如collection.get()，应该这样：
        collection = self.vector_db._collection  # 注意Chroma有这个内部_collection
        docs = collection.get(include=["documents"])  # 包括文档内容
        corpus = docs["documents"] if "documents" in docs else []
        return corpus


    def bm25_search(self, query: str, k: int = 4) -> List[Document]:
        """
        Perform a BM25 keyword-based search and return top-k documents.
        """
        if self.bm25_corpus is None:
            self.bm25_corpus = self._generate_bm25_corpus()
            self.bm25_index = BM25Okapi(self.bm25_corpus)  # 一次性建好index，不要每次都new

        tokenized_query = query.split()  # Tokenize query
        bm25_scores = self.bm25_index.get_scores(tokenized_query)

        ranked_docs = sorted(enumerate(bm25_scores), key=lambda x: x[1], reverse=True)[:k]

        # Retrieve the corresponding documents
        ids = self.vector_db._collection.get(ids=None)["ids"]  # 获取所有document的id列表
        documents = self.vector_db._collection.get(ids=ids, include=["documents"])["documents"]

        bm25_results = []
        for i, _ in ranked_docs:
            page_content = documents[i]
            doc = Document(page_content=page_content, metadata={})  # 构造一个langchain的Document对象
            bm25_results.append(doc)

        return bm25_results



    def max_marginal_relevance_search(self,
        query: str,
        k: int = 4,
        fetch_k: int = 20,
        lambda_mult: float = 0.5
    ) -> List[Tuple[Document, float]]:
        """
        Return docs selected using the maximal marginal relevance.
        Maximal marginal relevance optimizes for similarity to query AND diversity among selected documents.
        """
        ret = self.vector_db.max_marginal_relevance_search(query=query, k=k, fetch_k=fetch_k, lambda_mult=lambda_mult)
        return [(doc, 0.0) for doc in ret]

    def similarity_search_with_score(self, query: str, k: int = 4) -> List[Tuple[Document, float]]:
        """
        Run similarity search with Chroma with distance.
        """
        ret = self.vector_db.similarity_search_with_score(query=query, k=k)
        return ret

    def similarity_search_with_relevance_scores(self, query: str, k: int = 4) -> List[Tuple[Document, float]]:
        """
        Return docs and relevance scores in the range [0, 1].
        0 is dissimilar, 1 is most similar.
        """
        return self.vector_db.similarity_search_with_relevance_scores(query=query, k=k)

    def fusion_search(self, query: str, k: int = 4, fetch_k: int = 20, lambda_mult: float = 0.5) -> List[Document]:
        """
        Perform both BM25 and vector-based retrieval, and fuse the results.
        """
        # Retrieve BM25 results
        bm25_results = self.bm25_search(query, k=fetch_k)
        
        # Retrieve vector-based results
        vector_results = self.similarity_search_with_score(query, k=fetch_k)

        # Merge results (fusion strategy: prioritize vector search results, followed by BM25)
        all_results = bm25_results + [doc[0] for doc in vector_results]
        
        # Rank the merged results by similarity (could use some score merging strategy like RRF)
        merged_results = self.rank_merged_results(all_results, query)
        
        return merged_results[:k]

    def rank_merged_results(self, results: List[Document], query: str) -> List[Document]:
        """
        Simple ranking by similarity to the query. You can implement more sophisticated ranking (e.g., RRF).
        """
        ranked_results = []
        for doc in results:
            # You can compute some similarity score here if needed, for now just use placeholder
            similarity_score = self._compute_similarity(query, doc)
            ranked_results.append((doc, similarity_score))
        # Sort results by similarity score
        ranked_results.sort(key=lambda x: x[1], reverse=True)
        return [doc for doc, _ in ranked_results]

    def _compute_similarity(self, query: str, doc: Document) -> float:
        """
        Compute similarity score between the query and the document.
        Here, we can use any relevant metric (e.g., cosine similarity).
        For now, just a placeholder function.
        """
        # You can implement actual similarity calculation, for now it's just a random value
        return 0.5  # Placeholder similarity score
vector_search = VectorSearch()
