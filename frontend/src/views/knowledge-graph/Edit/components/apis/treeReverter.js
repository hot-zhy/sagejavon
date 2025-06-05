// treeReverter.js

function buildTree(nodes, parentId) {
  const children = [];
  for (const node of nodes) {
    if (node.parentId === parentId) {
      children.push({
        data: {
          text: node.name,
          generalization: [],
          expand: true,
          richText: true,
          isActive: false,
          uid: String(node.id)
        },
        children: buildTree(nodes, node.id)
      });
    }
  }
  return children;
}

function revertJson(nodes) {
  // Find the root node(s)
  const rootNodes = nodes.filter(node => node.parentId === 0);

  if (rootNodes.length !== 1) {
    throw new Error("There should be exactly one root node");
  }

  const rootNode = rootNodes[0];
  const tree = {
    data: {
      text: rootNode.name,
      generalization: [],
      expand: true,
      richText: true,
      isActive: false,
      uid: String(rootNode.id)
    },
    children: buildTree(nodes, rootNode.id)
  };

  return tree;
}

export { revertJson };
