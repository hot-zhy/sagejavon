import pandas as pd
import re

# 关键词列表，用于判断 hint 是否具体
COURSE_KEYWORDS = ["loop", "array", "null", "exception", "index", "recursion", "string", "class", "object"]

def is_specific_hint(text: str, keywords=COURSE_KEYWORDS) -> bool:
    return any(k in text.lower() for k in keywords)

def is_followup(text: str) -> bool:
    patterns = [
        r"what.*think", r"can you explain", r"why.*think", r"would it.*if", r"do you see.*alternative",
        r"how would", r"how else", r"would this work", r"what happens if"
    ]
    text = text.lower()
    return any(re.search(p, text) for p in patterns)

def is_kbr(text: str) -> bool:
    """
    判断中文学生回答中是否出现知识建构（Knowledge-Building）语言模式。
    包括反思、澄清、自我修正等表达。
    """
    kbr_signals = [
        "我明白了", "原来是这样", "我理解错了", "所以意思是", "我觉得问题在于",
        "我再试一次", "那我是不是应该", "如果我理解正确的话", "看来我之前的思路不对",
        "我应该用", "我猜问题可能是", "哦我知道了", "我想是因为", "我之前漏掉了",
        "现在我明白", "我理解了", "是我写错了", "我想通了", "我搞清楚了"
    ]
    return any(signal in text for signal in kbr_signals)


def evaluate_conversation(csv_file_path, output_csv="evaluated_output.csv", summary_csv="model_summary.csv"):
    df = pd.read_csv(csv_file_path, encoding='gbk')

    # SageJavon: role == 1
    df_sage = df[df['role'] == 1].copy()
    df_student = df[df['role'] == 0].copy()

    # 加入评估字段
    df_sage["is_followup"] = df_sage["content"].fillna("").apply(is_followup)
    df_sage["is_specific"] = df_sage["content"].fillna("").apply(is_specific_hint)

    # 假设 correctness 和 effectiveness 都是 1~5 或 0/1 值
    # Student 回复中的 KBR 检测
    df_student["is_kbr"] = df_student["content"].fillna("").apply(is_kbr)

    # 汇总结果
    model_stats = {
        "answer_accuracy_mean": df_sage["correctness"].mean(),
        "hinting_effectiveness_mean": df_sage["effectiveness"].mean(),
        "hinting_specificity_rate": df_sage["is_specific"].mean(),
        "followup_engagement_rate": df_sage["is_followup"].mean(),
        "kbr_rate": df_student["is_kbr"].mean()
    }

    # 导出详细打标签后的数据
    df_combined = pd.concat([df_sage, df_student]).sort_values(["chat_id", "sort"])
    df_combined.to_csv(output_csv, index=False)

    # 输出统计摘要
    pd.DataFrame([model_stats]).to_csv(summary_csv, index=False)
    print("✅ Finished. Summary saved to:", summary_csv)

# 示例运行
evaluate_conversation("../data/[new]stu_question_tags.csv")
