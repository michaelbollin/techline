export type TransistorPoint = { x: number; y: number };

export type TransistorPath = {
  id: string;
  d: string;
  strokeWidth: number;
  kind: "body" | "lead" | "arrow";
};

export type TransistorElectron = {
  id: string;
  d: string;
  delayMs: number;
  durationMs: number;
};

export type TransistorSchematic = {
  paths: TransistorPath[];
  animationOrder: string[];
  junction: TransistorPoint;
  junctionRadius: number;
  electronRadius: number;
  slab: { x: number; y: number; width: number; height: number; rx: number };
  electrons: TransistorElectron[];
};

export const PALETTE = {
  lead: "#c4a574",
  body: "#94a3b8",
  slab: "rgba(148, 163, 184, 0.12)",
  junction: "#fbbf24",
  electron: "#60a5fa",
} as const;

const EDGE_PAD_X = 0.05;
const EDGE_PAD_Y = 0.06;
const BODY_HALF_SPAN = 0.38;

function linePath(from: TransistorPoint, to: TransistorPoint): string {
  return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
}

function strokeWidths(width: number, height: number) {
  const basis = Math.min(width, height);

  return {
    body: Math.min(20, Math.max(10, basis * 0.012)),
    lead: Math.min(16, Math.max(8, basis * 0.01)),
    arrow: Math.min(14, Math.max(7, basis * 0.009)),
    junction: Math.min(12, Math.max(6, basis * 0.012)),
    electron: Math.min(8, Math.max(4, basis * 0.008)),
  };
}

/** Builds an NPN transistor schematic whose leads span the full viewport. */
export function buildTransistorSchematic(width: number, height: number): TransistorSchematic {
  const padX = width * EDGE_PAD_X;
  const padY = height * EDGE_PAD_Y;
  const cx = width / 2;
  const cy = height / 2;
  const strokes = strokeWidths(width, height);

  const bodyTop = { x: cx, y: cy - height * BODY_HALF_SPAN };
  const bodyBottom = { x: cx, y: cy + height * BODY_HALF_SPAN };
  const baseEnd = { x: padX, y: cy };
  const collectorEnd = { x: width - padX, y: padY };
  const emitterEnd = { x: width - padX, y: height - padY };
  const junction = { x: cx, y: cy };

  const body: TransistorPath = {
    id: "body",
    d: linePath(bodyTop, bodyBottom),
    strokeWidth: strokes.body,
    kind: "body",
  };

  const base: TransistorPath = {
    id: "base",
    d: linePath(baseEnd, junction),
    strokeWidth: strokes.lead,
    kind: "lead",
  };

  const collector: TransistorPath = {
    id: "collector",
    d: linePath(bodyTop, collectorEnd),
    strokeWidth: strokes.lead,
    kind: "lead",
  };

  const emitter: TransistorPath = {
    id: "emitter",
    d: linePath(bodyBottom, emitterEnd),
    strokeWidth: strokes.lead,
    kind: "lead",
  };

  const emitterAngle = Math.atan2(bodyBottom.y - emitterEnd.y, bodyBottom.x - emitterEnd.x);
  const arrowInset = Math.min(width, height) * 0.04;
  const arrowSize = Math.min(width, height) * 0.028;
  const arrowTip = {
    x: bodyBottom.x - Math.cos(emitterAngle) * arrowInset,
    y: bodyBottom.y - Math.sin(emitterAngle) * arrowInset,
  };
  const arrowLeft = {
    x: arrowTip.x + Math.cos(emitterAngle + Math.PI / 2) * arrowSize,
    y: arrowTip.y + Math.sin(emitterAngle + Math.PI / 2) * arrowSize,
  };
  const arrowRight = {
    x: arrowTip.x + Math.cos(emitterAngle - Math.PI / 2) * arrowSize,
    y: arrowTip.y + Math.sin(emitterAngle - Math.PI / 2) * arrowSize,
  };

  const arrow: TransistorPath = {
    id: "arrow",
    d: `M ${arrowLeft.x} ${arrowLeft.y} L ${arrowTip.x} ${arrowTip.y} L ${arrowRight.x} ${arrowRight.y}`,
    strokeWidth: strokes.arrow,
    kind: "arrow",
  };

  const slabWidth = Math.min(width * 0.08, height * 0.12);
  const slab = {
    x: cx - slabWidth / 2,
    y: bodyTop.y - slabWidth * 0.15,
    width: slabWidth,
    height: bodyBottom.y - bodyTop.y + slabWidth * 0.3,
    rx: slabWidth * 0.22,
  };

  const electrons: TransistorElectron[] = [
    {
      id: "electron-base",
      d: linePath(baseEnd, junction),
      delayMs: 0,
      durationMs: 900,
    },
    {
      id: "electron-collector-1",
      d: linePath(junction, collectorEnd),
      delayMs: 620,
      durationMs: 850,
    },
    {
      id: "electron-collector-2",
      d: linePath(junction, collectorEnd),
      delayMs: 780,
      durationMs: 850,
    },
    {
      id: "electron-collector-3",
      d: linePath(junction, collectorEnd),
      delayMs: 940,
      durationMs: 850,
    },
  ];

  return {
    paths: [body, base, collector, emitter, arrow],
    animationOrder: ["body", "base", "collector", "emitter", "arrow"],
    junction,
    junctionRadius: strokes.junction,
    electronRadius: strokes.electron,
    slab,
    electrons,
  };
}

export function getOrderedPaths(schematic: TransistorSchematic): TransistorPath[] {
  return schematic.animationOrder
    .map((id) => schematic.paths.find((path) => path.id === id))
    .filter((path): path is TransistorPath => Boolean(path));
}
