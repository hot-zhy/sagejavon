"""
Source: https://github.com/PrithivirajDamodaran/FlashRank/blob/main/flashrank/Ranker.py
改进：使用 Huggingface Cross-Encoder 替代 onnxruntime 模型，接口和返回格式保持完全一致
"""

import collections
import json
from pathlib import Path
import sys
from typing import Optional, List, Dict, Any
from server.constant.constants import RERANK_MODEL_NAME
from server.logger.logger_config import my_logger as logger
from transformers import BertForSequenceClassification, BertTokenizer
import torch

default_cache_dir = "server/rag/post_retrieval/rerank/tmp_cache"
default_model = RERANK_MODEL_NAME

class RerankRequest:
    """ Represents a reranking request with a query and a list of passages. 
    
    Attributes:
        query (Optional[str]): The query for which the passages need to be reranked.
        passages (List[Dict[str, Any]]): The list of passages to be reranked.
    """

    def __init__(self, query: Optional[str] = None, passages: Optional[List[Dict[str, Any]]] = None):
        self.query: Optional[str] = query
        self.passages: List[Dict[str, Any]] = passages if passages is not None else []

class Ranker:
    """ A ranker class for reranking passages based on a provided query using Cross-Encoder model.

    Attributes:
        model (BertForSequenceClassification): The BERT model used for ranking.
        tokenizer (BertTokenizer): Tokenizer for BERT model.
    """

    def __init__(self, model_name: str = "cross-encoder/ms-marco-MiniLM-L-6-v2", cache_dir: str = default_cache_dir, max_length: int = 512):
        """ Initializes the Ranker class with specified model.

        Args:
            model_name (str): The Huggingface Cross-Encoder model to use.
            cache_dir (str): (Reserved, not used now)
            max_length (int): (Reserved, not used now)
        """
        self.model_name = model_name
        self.cache_dir: Path = Path(cache_dir)

        # Load the Cross-Encoder model using BertForSequenceClassification
        self.model = BertForSequenceClassification.from_pretrained(self.model_name)
        self.tokenizer = BertTokenizer.from_pretrained(self.model_name)

    def _prepare_model_dir(self, model_name: str):
        """(No longer needed) Placeholder for compatibility."""
        pass

    def _get_tokenizer(self, max_length: int = 512):
        """(No longer needed) Placeholder for compatibility."""
        pass

    def _load_vocab(self, vocab_file: Path) -> Dict[str, int]:
        """(No longer needed) Placeholder for compatibility."""
        return {}

    def rerank(self, request: RerankRequest) -> List[Dict[str, Any]]:
        """ Reranks a list of passages based on a query using Cross-Encoder.

        Args:
            request (RerankRequest): The request containing the query and passages.

        Returns:
            List[Dict[str, Any]]: The reranked passages with added 'score' fields.
        """
        query = request.query
        passages = request.passages

        if not query or not passages:
            logger.error("[RANKER] Empty query or passages received. Returning empty list.")
            return []

        query_passage_pairs = [[query, passage["text"]] for passage in passages]

        try:
            # Tokenize query and passages
            encodings = self.tokenizer.batch_encode_plus(query_passage_pairs, truncation=True, padding=True, return_tensors="pt")

            # Get model predictions
            with torch.no_grad():
                outputs = self.model(**encodings)
                scores = outputs.logits.squeeze().tolist()  # Get scores (assuming single output for classification)

        except Exception as e:
            logger.error(f"[RANKER] Cross-Encoder prediction failed: {e}")
            return passages  # fallback: return original passages without reordering

        # Assign the scores to passages
        for score, passage in zip(scores, passages):
            passage["score"] = float(score)

        # Sort passages by score (higher score is better)
        passages.sort(key=lambda x: x["score"], reverse=True)
        return passages

# Keep external interface exactly the same
reranker = Ranker()
