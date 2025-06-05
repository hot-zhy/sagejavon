# 调用多个模型统一回答题目集
import openai
import json
import time

# 假设你已有的题目格式如下：
# [{"id": 1, "question": "What does 'null' mean in Java?", "answer": "A null value means no object is referenced."}, ...]

def call_openai_chat(model, prompt, max_tokens=512):
    response = openai.ChatCompletion.create(
        model=model,
        messages=[{"role": "user", "content": prompt}],
        temperature=0.5,
        max_tokens=max_tokens
    )
    return response['choices'][0]['message']['content']

def run_benchmark(question_file, output_file, model_list):
    with open(question_file, 'r', encoding='utf-8') as f:
        questions = json.load(f)

    results = []
    for q in questions:
        for model in model_list:
            try:
                response = call_openai_chat(model, q['question'])
                results.append({
                    "id": q['id'],
                    "question": q['question'],
                    "model": model,
                    "response": response
                })
                time.sleep(1)
            except Exception as e:
                print(f"❌ Model {model} failed on Q{q['id']}: {e}")
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

# 示例用法
# run_benchmark("questions.json", "model_responses.json", ["gpt-4", "gpt-3.5-turbo", "gpt-4o"])
