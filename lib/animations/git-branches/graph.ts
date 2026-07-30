export type GitGraphNode = {
  id: string;
  lane: number;
  col: number;
  colorIndex: number;
  role?: "fork" | "merge";
};

export type GitGraphLink = {
  id: string;
  source: GitGraphNode;
  target: GitGraphNode;
  colorIndex: number;
  kind: "main" | "branch";
};

export type GitGraphPath = GitGraphLink & {
  d: string;
  stroke: string;
  strokeWidth: number;
};

export type GitGraph = {
  links: GitGraphPath[];
  nodes: Array<GitGraphNode & { cx: number; cy: number; r: number }>;
  animationOrder: string[];
  masterLabel: { x: number; y: number };
};

export const PALETTE = [
  "#9ca3af",
  "#2dd4bf",
  "#60a5fa",
  "#fbbf24",
  "#a78bfa",
  "#f87171",
  "#86efac",
  "#fbb6ce",
  "#7dd3fc",
] as const;

/** Every branch forks from master (lane 0) and merges back to master. */
type BranchDef = {
  forkCol: number;
  mergeCol: number;
  lane: number;
  colorIndex: number;
};

const BRANCH_DEFS: BranchDef[] = [
  { forkCol: 0.1, mergeCol: 0.2, lane: 1, colorIndex: 1 },
  { forkCol: 0.16, mergeCol: 0.28, lane: -1, colorIndex: 2 },
  { forkCol: 0.24, mergeCol: 0.36, lane: 2, colorIndex: 3 },
  { forkCol: 0.32, mergeCol: 0.44, lane: -2, colorIndex: 4 },
  { forkCol: 0.4, mergeCol: 0.52, lane: 1, colorIndex: 5 },
  { forkCol: 0.48, mergeCol: 0.6, lane: 3, colorIndex: 6 },
  { forkCol: 0.56, mergeCol: 0.68, lane: -1, colorIndex: 7 },
  { forkCol: 0.64, mergeCol: 0.76, lane: 2, colorIndex: 8 },
  { forkCol: 0.72, mergeCol: 0.84, lane: -2, colorIndex: 2 },
  { forkCol: 0.8, mergeCol: 0.92, lane: 1, colorIndex: 3 },
];

type Layout = {
  x: (col: number) => number;
  y: (lane: number) => number;
  mainY: number;
  mainLineWidth: number;
  branchLineWidth: number;
  masterLabel: { x: number; y: number };
};

function createLayout(width: number, height: number): Layout {
  const padX = width * 0.03;
  const mainY = height * 0.44;
  const laneGap = height * 0.09;

  return {
    x: (col: number) => padX + col * (width - padX * 2),
    y: (lane: number) => mainY + lane * laneGap,
    mainY,
    mainLineWidth: Math.min(13, Math.max(9, width * 0.006)),
    branchLineWidth: Math.min(10, Math.max(7, width * 0.005)),
    masterLabel: { x: padX + 2, y: mainY - 22 },
  };
}

/** Smooth U-shaped cubic: entire branch is one flowing curve, no straight segments. */
function branchPathD(forkX: number, mergeX: number, mainY: number, laneY: number): string {
  return `M ${forkX},${mainY} C ${forkX},${laneY} ${mergeX},${laneY} ${mergeX},${mainY}`;
}

function mainPathD(x0: number, x1: number, y: number): string {
  return `M ${x0},${y} L ${x1},${y}`;
}

function buildGraphLinks(layout: Layout): {
  links: Array<Omit<GitGraphPath, "d" | "stroke" | "strokeWidth"> & { d: string }>;
  nodes: GitGraphNode[];
  animationOrder: string[];
} {
  const nodes: GitGraphNode[] = [];
  const animationOrder: string[] = [];

  const nodeAt = (lane: number, col: number, colorIndex: number, role?: GitGraphNode["role"]) => {
    const id = `${lane}-${col.toFixed(4)}`;
    const existing = nodes.find((node) => node.id === id);

    if (existing) {
      if (role && !existing.role) {
        existing.role = role;
      }

      return existing;
    }

    const created: GitGraphNode = { id, lane, col, colorIndex, role };
    nodes.push(created);
    return created;
  };

  const mainFork = nodeAt(0, 0, 0);
  const mainEnd = nodeAt(0, 1, 0);

  const mainD = mainPathD(layout.x(0), layout.x(1), layout.mainY);

  const links: Array<Omit<GitGraphPath, "stroke" | "strokeWidth"> & { d: string }> = [
    {
      id: "main-trunk",
      source: mainFork,
      target: mainEnd,
      colorIndex: 0,
      kind: "main",
      d: mainD,
    },
  ];

  animationOrder.push("main-trunk");

  BRANCH_DEFS.forEach((def, index) => {
    const forkX = layout.x(def.forkCol);
    const mergeX = layout.x(def.mergeCol);
    const mainY = layout.mainY;
    const laneY = layout.y(def.lane);

    nodeAt(0, def.forkCol, 0, "fork");
    nodeAt(0, def.mergeCol, 0, "merge");

    const id = `branch-${index}`;
    links.push({
      id,
      source: nodeAt(0, def.forkCol, 0, "fork"),
      target: nodeAt(0, def.mergeCol, 0, "merge"),
      colorIndex: def.colorIndex,
      kind: "branch",
      d: branchPathD(forkX, mergeX, mainY, laneY),
    });
    animationOrder.push(id);
  });

  return { links, nodes, animationOrder };
}

function nodeRadius(role: GitGraphNode["role"], strokeWidth: number) {
  if (role === "merge") {
    return strokeWidth * 1.1;
  }

  if (role === "fork") {
    return strokeWidth * 0.9;
  }

  return strokeWidth * 0.65;
}

export function buildGitGraph(width: number, height: number): GitGraph {
  const layout = createLayout(width, height);
  const { links, nodes, animationOrder } = buildGraphLinks(layout);

  const paths: GitGraphPath[] = links.map((link) => ({
    ...link,
    stroke: PALETTE[link.colorIndex % PALETTE.length] ?? PALETTE[0],
    strokeWidth: link.kind === "main" ? layout.mainLineWidth : layout.branchLineWidth,
  }));

  return {
    links: paths,
    nodes: nodes.map((node) => ({
      ...node,
      cx: layout.x(node.col),
      cy: layout.y(node.lane),
      r: nodeRadius(node.role, node.lane === 0 ? layout.mainLineWidth : layout.branchLineWidth),
    })),
    animationOrder,
    masterLabel: layout.masterLabel,
  };
}

export function getOrderedLinks(graph: GitGraph): GitGraphPath[] {
  const byId = new Map(graph.links.map((link) => [link.id, link]));
  return graph.animationOrder
    .map((id) => byId.get(id))
    .filter((link): link is GitGraphPath => Boolean(link));
}
