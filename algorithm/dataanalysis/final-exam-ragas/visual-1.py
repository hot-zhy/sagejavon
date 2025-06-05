import pandas as pd
import matplotlib.pyplot as plt

# 数据来源于表格中的 GPT-3.5 和 GLM-4-Air
data = {
    "Model": ["GPT-3.5-Turbo"] * 3 + ["GLM-4-Air"] * 3,
    "RAG Strategy": ["Original RAG", "Our RAG", "Without RAG"] * 2,
    "Context Precision": [0.5912, 0.8125, None, 0.6667, 0.6875, None],
    "Answer Relevance": [0.4653, 0.4865, 0.2014, 0.3954, 0.4077, 0.0433]
}
df = pd.DataFrame(data)

# 可视化
fig, axes = plt.subplots(1, 2, figsize=(12, 5))
metrics = ["Context Precision", "Answer Relevance"]

for ax, metric in zip(axes, metrics):
    for model in df["Model"].unique():
        subset = df[df["Model"] == model].copy()
        subset["RAG Strategy"] = pd.Categorical(subset["RAG Strategy"], 
                                                categories=["Without RAG", "Original RAG", "Our RAG"], 
                                                ordered=True)
        subset = subset.sort_values("RAG Strategy")
        ax.plot(subset["RAG Strategy"], subset[metric], marker='o', label=model)
    ax.set_title(f"{metric} Comparison")
    ax.set_xlabel("RAG Strategy")
    ax.set_ylabel(metric)
    ax.legend()
    ax.grid(True)

plt.suptitle("RAG Gains in Mid-Tier Models: GPT-3.5 vs GLM-4-Air", fontsize=14)
plt.tight_layout()
plt.show()
