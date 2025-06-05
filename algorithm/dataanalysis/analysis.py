import matplotlib.pyplot as plt

# Data for the plot
labels = [
    "Java Basics",
    "Java Beginner",
    "Java Intermediate",
    "Java Advanced",
    "Java Deep Dive",
    "Other"
]
values = [31.82, 40.91, 20.45, 4.55, 2.27, 0]

# Create a more academic-looking horizontal bar chart
fig, ax = plt.subplots(figsize=(8, 5))
bars = ax.barh(labels, values, color="#6baed6", edgecolor="black")

# Annotate bars with values
for bar, value in zip(bars, values):
    ax.text(bar.get_width() + 0.8, bar.get_y() + bar.get_height()/2,
            f"{value:.2f}%", va='center', fontsize=10, fontweight='semibold', color="black")

# Title and axis labels
ax.set_title("Distribution of Java Learning Levels", fontsize=13, fontweight='bold')
ax.set_xlabel("Percentage (%)", fontsize=11)
ax.set_xlim(0, 50)
ax.set_yticks(range(len(labels)))
ax.set_yticklabels(labels, fontsize=10)
ax.grid(axis='x', linestyle='--', alpha=0.6)

# Remove frame lines for cleaner look
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)

plt.tight_layout()
plt.show()