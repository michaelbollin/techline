export type TidalWaveLayer = {
  id: string;
  baseline: number;
  amplitude: number;
  wavelength: number;
  speed: number;
  strokeWidth: number;
  color: string;
  fill: string;
};

export type InternetIconKind =
  | "globe"
  | "database"
  | "cloud"
  | "link"
  | "server"
  | "network"
  | "browser";

export type InternetSymbol = {
  id: string;
  kind: InternetIconKind;
  xRatio: number;
  layerIndex: number;
  drift: number;
  size: number;
};

export type TidalWaveCanvasState = {
  phase: number;
};

export const PALETTE = {
  shallow: "rgba(96, 165, 250, 0.32)",
  mid: "rgba(56, 189, 248, 0.38)",
  deep: "rgba(14, 165, 233, 0.44)",
  crest: "rgba(2, 132, 199, 0.52)",
  fillShallow: "rgba(96, 165, 250, 0.05)",
  fillDeep: "rgba(2, 132, 199, 0.1)",
  iconStroke: "rgba(2, 72, 120, 0.88)",
  iconFill: "rgba(3, 105, 161, 0.42)",
} as const;

export const INTERNET_SYMBOL_DEFS: Omit<InternetSymbol, "size">[] = [
  { id: "globe-1", kind: "globe", xRatio: 0.06, layerIndex: 0, drift: 0.72 },
  { id: "database-1", kind: "database", xRatio: 0.18, layerIndex: 1, drift: 0.95 },
  { id: "cloud-1", kind: "cloud", xRatio: 0.3, layerIndex: 2, drift: 0.8 },
  { id: "server-1", kind: "server", xRatio: 0.42, layerIndex: 1, drift: 1.1 },
  { id: "network-1", kind: "network", xRatio: 0.54, layerIndex: 3, drift: 0.88 },
  { id: "browser-1", kind: "browser", xRatio: 0.66, layerIndex: 0, drift: 1.15 },
  { id: "link-1", kind: "link", xRatio: 0.78, layerIndex: 2, drift: 1.05 },
  { id: "globe-2", kind: "globe", xRatio: 0.9, layerIndex: 3, drift: 0.7 },
  { id: "database-2", kind: "database", xRatio: 0.96, layerIndex: 1, drift: 1.2 },
];

export function buildTidalWaveLayers(width: number, height: number): TidalWaveLayer[] {
  return [
    {
      id: "wave-1",
      baseline: height * 0.58,
      amplitude: height * 0.034,
      wavelength: width * 0.24,
      speed: 1,
      strokeWidth: Math.min(4, Math.max(2, height * 0.004)),
      color: PALETTE.shallow,
      fill: PALETTE.fillShallow,
    },
    {
      id: "wave-2",
      baseline: height * 0.66,
      amplitude: height * 0.042,
      wavelength: width * 0.2,
      speed: 1.2,
      strokeWidth: Math.min(5, Math.max(2.5, height * 0.005)),
      color: PALETTE.mid,
      fill: "rgba(56, 189, 248, 0.07)",
    },
    {
      id: "wave-3",
      baseline: height * 0.74,
      amplitude: height * 0.05,
      wavelength: width * 0.16,
      speed: 1.45,
      strokeWidth: Math.min(6, Math.max(3, height * 0.006)),
      color: PALETTE.deep,
      fill: "rgba(14, 165, 233, 0.08)",
    },
    {
      id: "wave-4",
      baseline: height * 0.82,
      amplitude: height * 0.058,
      wavelength: width * 0.13,
      speed: 1.7,
      strokeWidth: Math.min(7, Math.max(3.5, height * 0.007)),
      color: PALETTE.crest,
      fill: PALETTE.fillDeep,
    },
  ];
}

export function buildInternetSymbols(width: number, height: number): InternetSymbol[] {
  const baseSize = Math.min(width, height);
  const size = Math.min(34, Math.max(20, baseSize * 0.038));

  return INTERNET_SYMBOL_DEFS.map((symbol) => ({
    ...symbol,
    size,
  }));
}

export function waveYAt(x: number, layer: TidalWaveLayer, phase: number): number {
  const radians = (x / layer.wavelength) * Math.PI * 2 + phase * layer.speed;
  return layer.baseline + Math.sin(radians) * layer.amplitude;
}

export function symbolXAt(symbol: InternetSymbol, width: number, phase: number): number {
  const travel = width * 1.15;
  const offset = symbol.xRatio * travel + phase * 55 * symbol.drift;
  return offset % travel - width * 0.08;
}

export function createTidalWaveCanvasState(): TidalWaveCanvasState {
  return { phase: 0 };
}

export function stepTidalWaveCanvasState(state: TidalWaveCanvasState, deltaMs: number): void {
  state.phase += deltaMs * 0.0014;
}

function drawWavePath(
  context: CanvasRenderingContext2D,
  layer: TidalWaveLayer,
  width: number,
  height: number,
  phase: number,
  step: number,
): void {
  context.beginPath();

  for (let x = 0; x <= width; x += step) {
    const y = waveYAt(x, layer, phase);
    if (x === 0) {
      context.moveTo(x, y);
    } else {
      context.lineTo(x, y);
    }
  }

  context.lineTo(width, height);
  context.lineTo(0, height);
  context.closePath();
}

function withIconStyle(
  context: CanvasRenderingContext2D,
  size: number,
  draw: () => void,
): void {
  context.save();
  context.strokeStyle = PALETTE.iconStroke;
  context.fillStyle = PALETTE.iconFill;
  context.lineWidth = Math.max(2, size * 0.08);
  context.lineCap = "round";
  context.lineJoin = "round";
  draw();
  context.restore();
}

function drawGlobeIcon(context: CanvasRenderingContext2D, size: number): void {
  const radius = size * 0.42;
  withIconStyle(context, size, () => {
    context.beginPath();
    context.arc(0, 0, radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();

    context.beginPath();
    context.ellipse(0, 0, radius * 0.38, radius, 0, 0, Math.PI * 2);
    context.stroke();

    context.beginPath();
    context.moveTo(-radius, 0);
    context.lineTo(radius, 0);
    context.stroke();

    context.beginPath();
    context.ellipse(0, 0, radius, radius * 0.42, 0, 0, Math.PI * 2);
    context.stroke();
  });
}

function drawDatabaseIcon(context: CanvasRenderingContext2D, size: number): void {
  const w = size * 0.7;
  const h = size * 0.55;
  withIconStyle(context, size, () => {
    context.beginPath();
    context.ellipse(0, -h * 0.45, w * 0.5, h * 0.18, 0, 0, Math.PI * 2);
    context.fill();
    context.stroke();

    context.fillRect(-w * 0.5, -h * 0.45, w, h * 0.72);
    context.strokeRect(-w * 0.5, -h * 0.45, w, h * 0.72);

    context.beginPath();
    context.ellipse(0, h * 0.27, w * 0.5, h * 0.18, 0, 0, Math.PI * 2);
    context.stroke();

    context.beginPath();
    context.ellipse(0, -h * 0.05, w * 0.5, h * 0.14, 0, 0, Math.PI * 2);
    context.stroke();
  });
}

function drawCloudIcon(context: CanvasRenderingContext2D, size: number): void {
  withIconStyle(context, size, () => {
    context.beginPath();
    context.arc(-size * 0.18, 0, size * 0.18, 0, Math.PI * 2);
    context.arc(size * 0.08, -size * 0.08, size * 0.22, 0, Math.PI * 2);
    context.arc(size * 0.28, 0, size * 0.16, 0, Math.PI * 2);
    context.arc(0, size * 0.05, size * 0.24, 0, Math.PI * 2);
    context.fill();
    context.stroke();
  });
}

function drawServerIcon(context: CanvasRenderingContext2D, size: number): void {
  const w = size * 0.78;
  const h = size * 0.22;
  withIconStyle(context, size, () => {
    for (let i = 0; i < 3; i += 1) {
      const y = -size * 0.34 + i * (h + size * 0.06);
      context.fillRect(-w * 0.5, y, w, h);
      context.strokeRect(-w * 0.5, y, w, h);

      context.beginPath();
      context.arc(-w * 0.32, y + h * 0.5, size * 0.04, 0, Math.PI * 2);
      context.fillStyle = PALETTE.iconStroke;
      context.fill();
      context.fillStyle = PALETTE.iconFill;
    }
  });
}

function drawNetworkIcon(context: CanvasRenderingContext2D, size: number): void {
  const nodes = [
    { x: 0, y: -size * 0.28 },
    { x: -size * 0.34, y: size * 0.18 },
    { x: size * 0.34, y: size * 0.18 },
    { x: 0, y: size * 0.34 },
  ];

  withIconStyle(context, size, () => {
    context.beginPath();
    context.moveTo(nodes[0].x, nodes[0].y);
    context.lineTo(nodes[1].x, nodes[1].y);
    context.lineTo(nodes[3].x, nodes[3].y);
    context.lineTo(nodes[2].x, nodes[2].y);
    context.closePath();
    context.stroke();

    for (const node of nodes) {
      context.beginPath();
      context.arc(node.x, node.y, size * 0.1, 0, Math.PI * 2);
      context.fill();
      context.stroke();
    }
  });
}

function drawBrowserIcon(context: CanvasRenderingContext2D, size: number): void {
  const w = size * 0.82;
  const h = size * 0.62;
  withIconStyle(context, size, () => {
    context.fillRect(-w * 0.5, -h * 0.5, w, h);
    context.strokeRect(-w * 0.5, -h * 0.5, w, h);

    context.fillStyle = "rgba(2, 72, 120, 0.75)";
    context.fillRect(-w * 0.5, -h * 0.5, w, h * 0.22);
    context.strokeRect(-w * 0.5, -h * 0.5, w, h * 0.22);

    context.beginPath();
    context.moveTo(-w * 0.34, h * 0.18);
    context.lineTo(-w * 0.08, h * 0.18);
    context.moveTo(-w * 0.34, h * 0.3);
    context.lineTo(w * 0.28, h * 0.3);
    context.stroke();
  });
}

function drawLinkIcon(context: CanvasRenderingContext2D, size: number): void {
  withIconStyle(context, size, () => {
    context.beginPath();
    context.arc(-size * 0.2, 0, size * 0.18, Math.PI * 0.5, Math.PI * 1.5);
    context.stroke();

    context.beginPath();
    context.arc(size * 0.2, 0, size * 0.18, -Math.PI * 0.5, Math.PI * 0.5);
    context.stroke();
  });
}

function drawInternetIcon(
  context: CanvasRenderingContext2D,
  kind: InternetIconKind,
  size: number,
): void {
  switch (kind) {
    case "globe":
      drawGlobeIcon(context, size);
      break;
    case "database":
      drawDatabaseIcon(context, size);
      break;
    case "cloud":
      drawCloudIcon(context, size);
      break;
    case "server":
      drawServerIcon(context, size);
      break;
    case "network":
      drawNetworkIcon(context, size);
      break;
    case "browser":
      drawBrowserIcon(context, size);
      break;
    case "link":
      drawLinkIcon(context, size);
      break;
  }
}

export function renderTidalWaveCanvas(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: TidalWaveCanvasState,
): void {
  context.clearRect(0, 0, width, height);

  const layers = buildTidalWaveLayers(width, height);
  const symbols = buildInternetSymbols(width, height);
  const step = Math.max(4, Math.floor(width / 180));

  for (const layer of layers) {
    drawWavePath(context, layer, width, height, state.phase, step);
    context.fillStyle = layer.fill;
    context.fill();

    context.beginPath();
    for (let x = 0; x <= width; x += step) {
      const y = waveYAt(x, layer, state.phase);
      if (x === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    }

    context.strokeStyle = layer.color;
    context.lineWidth = layer.strokeWidth;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke();
  }

  for (const symbol of symbols) {
    const layer = layers[symbol.layerIndex];
    if (!layer) {
      continue;
    }

    const x = symbolXAt(symbol, width, state.phase);
    const y = waveYAt(x, layer, state.phase) - symbol.size * 0.55;

    context.save();
    context.translate(x, y);
    drawInternetIcon(context, symbol.kind, symbol.size);
    context.restore();
  }
}
