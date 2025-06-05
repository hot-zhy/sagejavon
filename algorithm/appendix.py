from graphviz import Digraph

dot = Digraph('G', filename='paper_structure_hierarchy.gv', format='png')
dot.attr(rankdir='LR', splines='ortho')  # Top to Bottom, orthogonal lines
dot.attr('node', shape='box', style='filled', fontname='Arial', fontsize='10')

# 一级节点（主入口）
dot.node('Intro', 'Introduction', fillcolor='#B3D9FF')

# 二级节点（白底中间节点）
second_level_nodes = {
    'RW': 'Related Work',
    'SDA': 'System Design and Architecture',
    'Features': 'Primary SageJavon Assistance Features',
    'Deploy': 'Semester-Long Class Deployment',
    'Analysis': 'Quantitative and Thematic Analysis',
    'Eval': 'Comparative Evaluation with Baseline Systems',
    'Insights': 'Student Perspectives and Comparative Insights',
}
for k, v in second_level_nodes.items():
    dot.node(k, v, fillcolor='white')
    dot.edge('Intro', k)

# 三级节点（浅蓝色）
third_level_nodes = {
    'RW': ['Large Pre-Trained Language Models', 'Intelligent Tutoring Systems for Programming', 'Knowledge Tracing~(KT)'],
    'SDA': ['[Learn] Module: Conversational Learning', '[Practice] Module: Exercise Behavior Modeling',
            '[Evaluate] Module: Code Evaluation', '[Support] Module: Resource Recommendation'],
    'Features': ['Conversational Learning Based on LLMs', 'Knowledge Q&A with LLMs (RAG)'],
    'Deploy': ['Course Structure', 'Deployment and Participants', 'Data Sources'],
    'Eval': ['Evaluation of Retrieval-Augmented Generation', 'Comparative Evaluation Against ChatGPT'],
    'Insights': ['Dimension-wise Comparison Analysis']
}

for parent, children in third_level_nodes.items():
    for i, child in enumerate(children):
        node_id = f"{parent}_{i}"
        dot.node(node_id, child, fillcolor='#EAF4FF')
        dot.edge(parent, node_id)

# 渲染输出
dot.render(view=True)
