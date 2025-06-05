from transformers import T5Tokenizer, T5ForConditionalGeneration
import py3langid as langid
import re
from server.logger.logger_config import my_logger as logger

class QueryExpander:
    def __init__(self, model_name="t5-small"):
        self.tokenizer = T5Tokenizer.from_pretrained(model_name)
        self.model = T5ForConditionalGeneration.from_pretrained(model_name)

    def generate_paraphrase(self, query: str) -> str:
        input_ids = self.tokenizer.encode("paraphrase: " + query, return_tensors="pt", truncation=True, padding=True)
        output_ids = self.model.generate(input_ids, max_length=50, num_beams=5, early_stopping=True)
        return self.tokenizer.decode(output_ids[0], skip_special_tokens=True)

    def expand_query(self, query: str) -> list:
        paraphrases = [query]
        for _ in range(3):  # Generate 3 paraphrases
            paraphrase = self.generate_paraphrase(query)
            paraphrases.append(paraphrase)
        return paraphrases

def detect_query_lang(query: str) -> str:
    # Dictionary to map language codes to full language names
    lang_map = {
        'en': 'English',
        'zh': 'Chinese',
        'fr': 'French',
        'es': 'Spanish',
        'pt': 'Portuguese',
        'de': 'German',
        'ru': 'Russian',
        'ja': 'Japanese',
        'ko': 'Korean',
        'hi': 'Hindi',
        'ar': 'Arabic'
    }

    # Detect the language of the query
    lang, _ = langid.classify(query)

    # Get the full language name
    full_language = lang_map.get(lang, 'English')
    return full_language


def query_rewrite(query: str, bot_topic: str) -> str:
    # Detect the language of the query
    lang, _ = langid.classify(query)
    
    # Convert to lowercase for case-insensitive comparison
    query_lower = query.lower()
    bot_topic_lower = bot_topic.lower()
    
    # Check if the bot_topic is already included in the query
    if bot_topic_lower not in query_lower:
        # Using regular expression to remove trailing punctuation if present
        query_trimmed = re.sub(r'[?!.，。？！,]*$', '', query)

        # Language-specific adjustments for more colloquial expressions
        if lang == 'en':
            adjust_query = f"{query_trimmed}, about '{bot_topic}'"
        elif lang == 'zh':
            adjust_query = f"{query_trimmed}，关于'{bot_topic}'的信息"
        elif lang == 'fr':
            adjust_query = f"{query_trimmed}, à propos de '{bot_topic}'"
        elif lang == 'es':
            adjust_query = f"{query_trimmed}, sobre '{bot_topic}'"
        elif lang == 'pt':
            adjust_query = f"{query_trimmed}, sobre '{bot_topic}'"
        elif lang == 'de':
            adjust_query = f"{query_trimmed}, über '{bot_topic}'"
        elif lang == 'ru':
            adjust_query = f"{query_trimmed}, о '{bot_topic}'"
        elif lang == 'ja':
            adjust_query = f"{query_trimmed}、'{bot_topic}'について"
        elif lang == 'ko':
            adjust_query = f"{query_trimmed}，'{bot_topic}'에 대해"
        elif lang == 'hi':
            adjust_query = f"{query_trimmed}, '{bot_topic}' के बारे में"
        elif lang == 'ar':
            adjust_query = f"{query_trimmed}، حول '{bot_topic}'"
        else:
            adjust_query = f"{query_trimmed}, '{bot_topic}'"
        
        # Record the adjusted query
        logger.warning(f"Detected language: {lang}, Original query: '{query}', Adjusted query: '{adjust_query}'")
        return adjust_query
    else:
        # If the bot_topic is already in the query, log this info and return the original query
        logger.info(f"No adjustment needed for query: '{query}'")
        return query

def expand_and_rewrite_query(query: str, bot_topic: str) -> list:
    # First, rewrite the query if needed (using existing logic)
    rewritten_query = query_rewrite(query, bot_topic)
    
    # Then, expand the rewritten query using multi-query expansion
    expander = QueryExpander()
    expanded_queries = expander.expand_query(rewritten_query)
    
    return expanded_queries
