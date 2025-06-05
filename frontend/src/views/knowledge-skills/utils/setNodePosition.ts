// 根据节点的掌握程度mastery，确定节点坐标
// mastery为0、1、2的节点数量，分别对应熟练->不熟练

import type { ChartData } from "../types/chartDataType";
export function setNodePosition(o: ChartData) {
  const oCopy = { ...o };

  // 统计三种熟练程度的节点数量
  const masteryCount = [0, 0, 0];
  oCopy.nodes.forEach((node: any) => {
    masteryCount[node.mastery]++;
  });

  // 每行最多有8个节点
  const maxCount = 8;

  // 节点直径
  const radius = 50;

  // 节点之间的间距
  const gap = 200;

  // 计算top、middle、bottom的行数
  const lineCount = [0, 0, 0];
  lineCount.forEach((count, index) => {
    count = Math.ceil(masteryCount[index] / maxCount);
    lineCount[index] = count;
  });

  const topList = {
    curX: 0,
    curY: 0,
    curNodeCount: 0,
  };
  const middleList = {
    curX: 0,
    curY: lineCount[0] * (radius + gap) + gap,
    curNodeCount: 0,
  };
  const bottomList = {
    curX: 0,
    curY: (lineCount[0] + lineCount[1]) * (radius + gap) + gap * 2,
    curNodeCount: 0,
  };

  // 计算节点的坐标
  oCopy.nodes.forEach((node: any) => {
    // 根据node.mastery的值，选取对应的列表
    const list =
      node.mastery === 0
        ? topList
        : node.mastery === 1
        ? middleList
        : bottomList;
    // 计算节点的坐标
    node.x = list.curX;
    node.y = list.curY;
    list.curNodeCount++;
    list.curX += radius + gap;
    if (list.curNodeCount === maxCount) {
      list.curX = 0;
      list.curY += radius + gap;
      list.curNodeCount = 0;
    }
  });

  return oCopy;
}
