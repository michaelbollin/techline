export type WebIcon = "globe" | "link" | "help" | "folder" | "code" | "person" | "download";

export type WebPageNode = {
  id: string;
  icon: WebIcon;
  cx: number;
  cy: number;
  size: number;
  role: "hub" | "page";
  fill: string;
  stroke: string;
};

export type WebGraphLink = {
  id: string;
  sourceId: string;
  targetId: string;
  d: string;
  stroke: string;
  strokeWidth: number;
};

export type WebGraph = {
  nodes: WebPageNode[];
  links: WebGraphLink[];
  animationOrder: string[];
};

/**
 * Satellite sections from the first website (info.cern.ch), in document order:
 * https://info.cern.ch/hypertext/WWW/TheProject.html
 */
const PAGE_DEFS: Array<{
  id: string;
  icon: WebIcon;
  fill: string;
  stroke: string;
  x: number;
  y: number;
}> = [
  { id: "whats-out-there", icon: "link", fill: "#bfdbfe", stroke: "#111827", x: 0.14, y: 0.16 },
  { id: "help", icon: "help", fill: "#fde68a", stroke: "#111827", x: 0.86, y: 0.14 },
  { id: "software", icon: "folder", fill: "#fbcfe8", stroke: "#111827", x: 0.9, y: 0.5 },
  { id: "technical", icon: "code", fill: "#bbf7d0", stroke: "#111827", x: 0.82, y: 0.84 },
  { id: "people", icon: "person", fill: "#ddd6fe", stroke: "#111827", x: 0.16, y: 0.84 },
  { id: "getting-code", icon: "download", fill: "#fed7aa", stroke: "#111827", x: 0.08, y: 0.5 },
];

const LINK_COLORS = ["#2563eb", "#7c3aed", "#db2777", "#ea580c", "#059669", "#0891b2"] as const;

const ANIMATION_ORDER = [
  "link-whats-out-there",
  "link-help",
  "link-software",
  "link-technical",
  "link-people",
  "link-getting-code",
] as const;

function curvedLinkPath(
  source: WebPageNode,
  target: WebPageNode,
  bow: number,
): string {
  const from = { x: source.cx, y: source.cy };
  const to = { x: target.cx, y: target.cy };
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.hypot(dx, dy) || 1;
  const cx = mx + (-dy / length) * length * bow;
  const cy = my + (dx / length) * length * bow;

  return `M ${from.x},${from.y} Q ${cx},${cy} ${to.x},${to.y}`;
}

export function buildWebGraph(width: number, height: number): WebGraph {
  const hubSize = Math.min(width, height) * 0.14;
  const pageSize = Math.min(width, height) * 0.1;
  const strokeWidth = Math.max(4, Math.min(7, Math.min(width, height) * 0.007));

  const hub: WebPageNode = {
    id: "info-cern",
    icon: "globe",
    cx: width * 0.48,
    cy: height * 0.5,
    size: hubSize,
    role: "hub",
    fill: "#fef08a",
    stroke: "#111827",
  };

  const pages: WebPageNode[] = PAGE_DEFS.map((page) => ({
    id: page.id,
    icon: page.icon,
    cx: width * page.x,
    cy: height * page.y,
    size: pageSize,
    role: "page",
    fill: page.fill,
    stroke: page.stroke,
  }));

  const nodes = [hub, ...pages];

  const links: WebGraphLink[] = pages.map((page, index) => ({
    id: `link-${page.id}`,
    sourceId: hub.id,
    targetId: page.id,
    d: curvedLinkPath(hub, page, index % 2 === 0 ? 0.14 : -0.14),
    stroke: LINK_COLORS[index % LINK_COLORS.length],
    strokeWidth,
  }));

  return {
    nodes,
    links,
    animationOrder: [...ANIMATION_ORDER],
  };
}

export function getOrderedLinks(graph: WebGraph): WebGraphLink[] {
  const byId = new Map(graph.links.map((link) => [link.id, link]));

  return graph.animationOrder
    .map((id) => byId.get(id))
    .filter((link): link is WebGraphLink => Boolean(link));
}

export function getNodeById(graph: WebGraph, id: string): WebPageNode | undefined {
  return graph.nodes.find((node) => node.id === id);
}
