// treeConverter.js

function traverseTree(node, parentId, level, result) {
  let nodeId = result.length + 1;
  result.push({
    id: nodeId,
    parentId: parentId,
    name: node.data.text.trim() || ""
  });
  (node.children || []).forEach(child => {
    traverseTree(child, nodeId, level + 1, result);
  });
}

function convertJson(data) {
  let result = [];
  traverseTree(data, 0, 0, result);
  return result;
}

export { convertJson };
