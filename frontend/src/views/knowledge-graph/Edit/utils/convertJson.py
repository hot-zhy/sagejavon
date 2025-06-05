import json


def traverse_tree(node, parent_id, level, result):
    node_id = len(result) + 1
    result.append({
        "id": node_id,
        "parentId": parent_id,
        "level": level,
        "query": 0,
        "name": node["data"]["text"].strip() if node["data"]["text"] else ""
    })
    for child in node.get("children", []):
        traverse_tree(child, node_id, level + 1, result)


def convert_json(input_file, output_file):
    with open(input_file, "r", encoding='utf-8') as f:
        data = json.load(f)

    result = []
    traverse_tree(data, 0, 0, result)

    with open(output_file, "w",encoding='utf-8') as f:
        json.dump(result, f, indent=4,ensure_ascii=False)

if __name__ == "__main__":
    input_file = "./java核心技术.json"
    output_file = "output.json"
    convert_json(input_file, output_file)
