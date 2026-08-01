export type IcPoint = { x: number; y: number };

export type IcComponentKind = "resistor" | "transistor" | "capacitor";

export type IcComponent = {
  id: string;
  kind: IcComponentKind;
  fill: string;
  accent: string;
  spread: IcPoint;
  nested: IcPoint;
  size: number;
};

export type IcWire = {
  id: string;
  from: string;
  to: string;
  d: string;
  strokeWidth: number;
};

export type IcScene = {
  cx: number;
  cy: number;
  chip: { x: number; y: number; width: number; height: number; rx: number };
  components: IcComponent[];
  wires: IcWire[];
  strokeWidth: number;
  spreadScale: number;
  nestedScale: number;
  wavePath: string;
};

export const STROKE = "#111827";

export const PALETTE = {
  wire: "#d4a574",
  germanium: "#a8d4e6",
  germaniumEdge: "#5b8fa8",
  glow: "#fbbf24",
  resistor: { fill: "#fdba74", accent: "#ea580c" },
  transistor: { fill: "#93c5fd", accent: "#2563eb" },
  capacitor: { fill: "#d8b4fe", accent: "#9333ea" },
} as const;

const COMPONENT_META: Record<IcComponentKind, { fill: string; accent: string }> = {
  resistor: { fill: PALETTE.resistor.fill, accent: PALETTE.resistor.accent },
  transistor: { fill: PALETTE.transistor.fill, accent: PALETTE.transistor.accent },
  capacitor: { fill: PALETTE.capacitor.fill, accent: PALETTE.capacitor.accent },
};

function wireBetween(from: IcPoint, to: IcPoint, bend = 0.14): string {
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  const bendX = midX + (to.y - from.y) * bend;
  const bendY = midY - (to.x - from.x) * bend;
  return `M ${from.x} ${from.y} Q ${bendX} ${bendY} ${to.x} ${to.y}`;
}

function strokeWidth(basis: number) {
  return Math.max(4, Math.min(8, basis * 0.007));
}

function nestedCenter(chip: IcScene["chip"], slot: 0 | 1 | 2): IcPoint {
  const pad = chip.width * 0.06;
  const innerW = chip.width - pad * 2;
  const innerH = chip.height * 0.55;
  const innerY = chip.y + chip.height * 0.22;
  const gap = innerW * 0.04;
  const regionW = (innerW - gap * 2) / 3;
  const x = chip.x + pad + slot * (regionW + gap) + regionW / 2;
  const y = innerY + innerH / 2;

  return { x, y };
}

function buildWavePath(cx: number, chipTop: number, chipWidth: number, basis: number): string {
  const amplitude = basis * 0.028;
  const waveY = chipTop - basis * 0.06;
  const startX = cx - chipWidth * 0.34;
  const endX = cx + chipWidth * 0.34;
  const steps = 8;
  const step = (endX - startX) / steps;
  let path = `M ${startX} ${waveY}`;
  for (let index = 1; index <= steps; index += 1) {
    const x = startX + step * index;
    const y = waveY + (index % 2 === 0 ? 0 : index % 4 === 1 ? -amplitude : amplitude);
    path += ` L ${x} ${y}`;
  }
  return path;
}

export function buildIcScene(width: number, height: number): IcScene {
  const basis = Math.min(width, height);
  const cx = width * 0.5;
  const cy = height * 0.5;
  const spreadRadius = basis * 0.32;
  const componentSize = basis * 0.14;
  const chipWidth = basis * 0.5;
  const chipHeight = basis * 0.14;
  const sw = strokeWidth(basis);

  const chip = {
    x: cx - chipWidth / 2,
    y: cy - chipHeight * 0.15,
    width: chipWidth,
    height: chipHeight,
    rx: basis * 0.012,
  };

  const components: IcComponent[] = (
    [
      {
        id: "resistor",
        kind: "resistor" as const,
        spread: { x: cx - spreadRadius, y: cy - basis * 0.04 },
        nested: nestedCenter(chip, 0),
      },
      {
        id: "transistor",
        kind: "transistor" as const,
        spread: { x: cx + spreadRadius * 0.62, y: cy - spreadRadius * 0.78 },
        nested: nestedCenter(chip, 1),
      },
      {
        id: "capacitor",
        kind: "capacitor" as const,
        spread: { x: cx + spreadRadius * 0.62, y: cy + spreadRadius * 0.78 },
        nested: nestedCenter(chip, 2),
      },
    ] as const
  ).map((item) => {
    const meta = COMPONENT_META[item.kind];
    return {
      ...item,
      fill: meta.fill,
      accent: meta.accent,
      size: componentSize,
    };
  });

  const pointById = Object.fromEntries(components.map((component) => [component.id, component.spread]));

  const wires: IcWire[] = [
    {
      id: "wire-r-t",
      from: "resistor",
      to: "transistor",
      d: wireBetween(pointById.resistor!, pointById.transistor!, 0.18),
      strokeWidth: sw,
    },
    {
      id: "wire-t-c",
      from: "transistor",
      to: "capacitor",
      d: wireBetween(pointById.transistor!, pointById.capacitor!, 0.18),
      strokeWidth: sw,
    },
    {
      id: "wire-c-r",
      from: "capacitor",
      to: "resistor",
      d: wireBetween(pointById.capacitor!, pointById.resistor!, 0.18),
      strokeWidth: sw,
    },
  ];

  return {
    cx,
    cy,
    chip,
    components,
    wires,
    strokeWidth: sw,
    spreadScale: 1,
    nestedScale: 0.38,
    wavePath: buildWavePath(cx, chip.y, chip.width, basis),
  };
}

export function wirePathForPhase(
  wire: IcWire,
  components: IcComponent[],
  phase: "spread" | "nested",
): string {
  const from = components.find((component) => component.id === wire.from);
  const to = components.find((component) => component.id === wire.to);
  if (!from || !to) {
    return wire.d;
  }

  const fromPoint = phase === "spread" ? from.spread : from.nested;
  const toPoint = phase === "spread" ? to.spread : to.nested;
  return wireBetween(fromPoint, toPoint, phase === "spread" ? 0.18 : 0.04);
}

export function getOrderedWires(scene: IcScene): IcWire[] {
  return scene.wires;
}
