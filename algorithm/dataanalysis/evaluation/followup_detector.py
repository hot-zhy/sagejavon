import re
import json
import csv
import os
import nltk
nltk.download('punkt')
from nltk.tokenize import sent_tokenize
from scipy.stats import mannwhitneyu


def is_followup(sentence: str) -> bool:
    sentence = sentence.strip().lower()
    followup_patterns = [
        r"what (do you|would you|might you|could you) think",
        r"can you explain",
        r"do you see (an|any) alternative",
        r"how (would|might|could) this (change|work)",
        r"why do you think",
        r"would it still work if",
        r"can you try .* with .*",
        r"what happens if",
        r"can you think of",
        r"is there (another|a different) way",
        r"how else",
    ]
    for pattern in followup_patterns:
        if re.search(pattern, sentence):
            return True
    return False


def analyze_model_outputs(file_path: str, csv_out="followup_summary.csv", details_out="followup_examples.json"):
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    model_stats = {}
    detailed_examples = []

    for item in data:
        model = item["model"]
        response = item["response"]
        sentences = sent_tokenize(response)

        fup_found = False
        fup_sentences = []

        for s in sentences:
            if is_followup(s):
                fup_found = True
                fup_sentences.append(s)

        if model not in model_stats:
            model_stats[model] = {"total": 0, "followup": 0}
        model_stats[model]["total"] += 1
        if fup_found:
            model_stats[model]["followup"] += 1
            detailed_examples.append({
                "id": item.get("id", None),
                "model": model,
                "followup_sentences": fup_sentences,
                "original": response
            })

    # 输出统计结果
    print("\n📊 Follow-up Engagement Rate per Model:\n")
    with open(csv_out, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(["Model", "Follow-up Count", "Total Count", "Engagement Rate (%)"])
        for model, stats in model_stats.items():
            total = stats["total"]
            fup = stats["followup"]
            rate = (fup / total) * 100 if total else 0.0
            print(f"{model:<15}  {fup}/{total}  ({rate:.1f}%)")
            writer.writerow([model, fup, total, f"{rate:.1f}"])

    # 输出示例句子
    with open(details_out, 'w', encoding='utf-8') as f:
        json.dump(detailed_examples, f, ensure_ascii=False, indent=2)

    print(f"\n✅ Summary saved to {csv_out}")
    print(f"✅ Example follow-up sentences saved to {details_out}")

def run_significance_test(data: list, model1: str, model2: str):
    """
    比较两个模型在 follow-up 概率上的显著性差异。
    输入 data 是模型输出的 JSON 列表（与 model_outputs.json 格式相同）
    """
    def binary_followup_scores(model_name):
        return [
            int(is_followup(s))
            for item in data
            if item["model"] == model_name
            for s in sent_tokenize(item["response"])
        ]

    scores1 = binary_followup_scores(model1)
    scores2 = binary_followup_scores(model2)

    print(f"\n📊 Significance Test: {model1} vs {model2}")
    print(f"  {model1} samples: {len(scores1)} | {model2} samples: {len(scores2)}")

    if not scores1 or not scores2:
        print("⚠️ 数据不足，无法比较。")
        return

    stat, p = mannwhitneyu(scores1, scores2, alternative='greater')
    print(f"  Mann-Whitney U statistic = {stat:.2f}, p-value = {p:.4f}")
    if p < 0.05:
        print("  ✅ 差异显著（p < 0.05）")
    else:
        print("  ❌ 差异不显著（p ≥ 0.05）")


if __name__ == "__main__":
    example_file = "model_outputs.json"
    analyze_model_outputs(example_file)

    # 显著性检验示例
    with open(example_file, 'r', encoding='utf-8') as f:
        all_data = json.load(f)
    run_significance_test(all_data, "SageJavon", "GPT-4")
