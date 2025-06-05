import json


def build_tree(nodes, parent_id):
    children = []
    for node in nodes:
        if node["parentId"] == parent_id:
            children.append({
                "data": {
                    "text": node["name"],
                    "generalization": [],
                    "expand": True,
                    "richText": True,
                    "isActive": False,
                    "uid": str(node["id"])
                },
                "children": build_tree(nodes, node["id"])
            })
    return children


def convert_json(output_file, input_file):
    with open(output_file, "r",encoding='utf-8') as f:
        nodes = json.load(f)

    # Find the root node(s)
    root_nodes = [node for node in nodes if node["parentId"] == 0]

    if len(root_nodes) != 1:
        raise ValueError("There should be exactly one root node")

    root_node = root_nodes[0]
    tree = {
        "data": {
            "text": root_node["name"],
            "generalization": [],
            "expand": True,
            "richText": True,
            "isActive": False,
            "uid": str(root_node["id"])
        },
        "children": build_tree(nodes, root_node["id"])
    }

    with open(input_file, "w",encoding='utf-8') as f:
        json.dump(tree, f, indent=4)


if __name__ == "__main__":
    output_file = "output.json"
    input_file = "revert.json"
    convert_json(output_file, input_file)
