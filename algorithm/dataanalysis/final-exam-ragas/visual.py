import pandas as pd
import matplotlib.pyplot as plt

# 使用最新表格数据更新
data = {
    "Model": ["GLM-4-Flash", "GLM-4-Flash", "GLM-4-Flash",
              "GLM-4-Air", "GLM-4-Air", "GLM-4-Air",
              "GLM-4-Plus", "GLM-4-Plus", "GLM-4-Plus",
              "GPT-3.5-Turbo", "GPT-3.5-Turbo", "GPT-3.5-Turbo",
              "GPT-4", "GPT-4", "GPT-4"],
    "RAG": ["Original RAG", "Our RAG", "Without RAG"] * 5,
    "Context Precision": [
        0.1458, 0.2083, None,
        0.6667, 0.6875, None,
        0.8958, 0.8958, None,
        0.5912, 0.8125, None,
        0.9167, 0.9792, None
    ],
    "Faithfulness": [
        0.9635, 0.9635, 0.9397,
        0.9730, 0.9844, 0.9583,
        0.9792, 0.9792, 0.9792,
        0.9835, 0.9844, 0.9795,
        0.9906, 0.9948, 0.9635
    ],
    "Answer Relevance": [
        0.1107, 0.0747, 0.0433,
        0.3954, 0.4077, 0.0433,
        0.5844, 0.5979, 0.2012,
        0.4653, 0.4865, 0.2014,
        0.6628, 0.6676, 0.5871
    ],
    "Context Recall": [
        0.3448, 0.4125, None,
        0.6833, 0.7250, None,
        0.8163, 0.8299, None,
        0.7446, 0.7827, None,
        0.8376, 0.8878, None
    ]
}


df = pd.DataFrame(data)

# 可视化：每种指标一个子图，对比不同模型下三种 RAG 策略的表现
fig, axes = plt.subplots(2, 2, figsize=(14, 10))
metrics = ["Context Precision", "Context Recall", "Faithfulness", "Answer Relevance"]

for ax, metric in zip(axes.flat, metrics):
    for model in df["Model"].unique():
        subset = df[df["Model"] == model].copy()
        subset["RAG"] = pd.Categorical(subset["RAG"], categories=["Without RAG", "Original RAG", "Our RAG"], ordered=True)
        subset = subset.sort_values("RAG")
        ax.plot(subset["RAG"], subset[metric], marker='o', label=model)
    ax.set_title(metric)
    ax.set_xlabel("RAG Strategy")
    ax.set_ylabel("Score")
    ax.legend()
    ax.grid(True)

plt.suptitle("Evaluation Metrics Comparison across RAG Strategies and Models", fontsize=16)
plt.tight_layout(rect=[0, 0.03, 1, 0.97])
plt.show()