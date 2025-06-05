export type RawNode = {
  x?: number;
  y?: number;
  id: number;
  name: string;
  mastery: number;
};

export type RawEdge = {
  source: number;
  target: number;
};

export type ChartData = {
  nodes: RawNode[];
  edges: RawEdge[];
};
