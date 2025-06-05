const defaultColor = ["#FE9F9F", "#FEE99F", "#ACFE9F"];

export const masteryToColor = (mastery: number) => {
  if (mastery === 0 || mastery === 1 || mastery === 2)
    return defaultColor[mastery];
  else return "#E3E3E3";
};

// 其他主题颜色待添加
