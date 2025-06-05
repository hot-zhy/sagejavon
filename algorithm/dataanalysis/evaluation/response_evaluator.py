import json
from sklearn.metrics import cohen_kappa_score

def label_answer_accuracy(response: str, gold: str) -> bool:
    return gold.lower() in response.lower()  # 或模糊匹配改进

def score_hint_effectiveness(response: str) -> int:
    if "think" in response and "why" in response:
        return 5
    elif "look at" in response or "try changing" in response:
        return 4
    elif "maybe" in response or "consider" in response:
        return 3
    elif "try again" in response:
        return 2
    else:
        return 1

def is_specific_hint(response: str, keywords: list) -> bool:
    return any(kw.lower() in response.lower() for kw in keywords)

def evaluate_responses(input_file, output_file, gold_file, keywords):
    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    with open(gold_file, 'r', encoding='utf-8') as f:
        gold_data = {q['id']: q['answer'] for q in json.load(f)}

    for item in data:
        gold = gold_data.get(item['id'], "")
        item['answer_accuracy'] = label_answer_accuracy(item['response'], gold)
        item['hint_effectiveness'] = score_hint_effectiveness(item['response'])
        item['hint_specificity'] = is_specific_hint(item['response'], keywords)

    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

# evaluate_responses("model_responses.json", "scored_responses.json", "questions.json", ["loop", "array", "null", "exception"])
