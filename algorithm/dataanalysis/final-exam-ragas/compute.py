import os
import pandas as pd

input_dir = "evaluate_output"  # 你保存csv的文件夹
output_txt = "evaluation_summary.txt"

# 需要统计的四个指标
metrics = [
    "context_precision",
    "faithfulness",
    "answer_relevancy",
    "context_recall"
]

# 用于收集结果
results = []

for filename in os.listdir(input_dir):
    if filename.endswith(".csv"):
        filepath = os.path.join(input_dir, filename)
        try:
            df = pd.read_csv(filepath)

            # 过滤掉 response 为 "ERROR" 的行
            df_filtered = df

            # 创建一个记录字典
            record = {"filename": filename}

            for metric in metrics:
                if metric in df_filtered.columns:
                    # 筛掉值为0的行再求平均
                    filtered_metric = df_filtered[df_filtered[metric] != 100][metric]
                    mean_val = filtered_metric.mean() if not filtered_metric.empty else 0
                    record[metric] = round(mean_val, 4)
                else:
                    record[metric] = "N/A"

            results.append(record)

        except Exception as e:
            print(f"❌ 处理 {filename} 时出错: {e}")

# 写入文本文件
with open(output_txt, "w", encoding="utf-8") as f:
    f.write("文件名\t\tContext Precision\tFaithfulness\tAnswer Relevancy\tContext Recall\n")
    for record in results:
        f.write(f"{record['filename']}\t{record['context_precision']}\t\t{record['faithfulness']}\t\t{record['answer_relevancy']}\t\t{record['context_recall']}\n")

print(f"✅ 已保存统计结果至 {output_txt}")
