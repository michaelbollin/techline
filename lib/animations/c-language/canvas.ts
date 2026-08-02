export type CTokenSpec = {
  label: string;
  bg: string;
  fg: string;
};

export type TokenVisual = {
  label: string;
  bg: string;
  fg: string;
  x: number;
  y: number;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  progress: number;
  state: "waiting" | "moving" | "absorbed";
};

export type MemoryCell = {
  address: string;
  value: number | null;
  glow: number;
};

export type BitParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  char: "0" | "1";
  life: number;
};

export type CLanguagePhase =
  | "pause"
  | "feed"
  | "compile"
  | "write"
  | "celebrate"
  | "reset";

export type CLanguageCanvasState = {
  phase: CLanguagePhase;
  phaseElapsed: number;
  tokenIndex: number;
  tokens: TokenVisual[];
  memory: MemoryCell[];
  activeMemoryIndex: number;
  bits: BitParticle[];
  braceOpen: number;
  machineWobble: number;
  pointerPhase: number;
};

export const C_TOKEN_SPECS: CTokenSpec[] = [
  { label: "int", bg: "#4F7FD4", fg: "#FFFFFF" },
  { label: "char", bg: "#3D9A62", fg: "#FFFFFF" },
  { label: "void", bg: "#7B6BC4", fg: "#FFFFFF" },
  { label: "*", bg: "#E8A23B", fg: "#1A1A1A" },
];

export const MEMORY_VALUES = [0, 42, 65, 127] as const;

export const PHASE_MS = {
  pause: 700,
  feed: 720,
  compile: 980,
  write: 620,
  celebrate: 2000,
  reset: 800,
} as const;

const BG_TOP = "#F7F2E8";
const BG_BOTTOM = "#E8DFD0";
const INK = "#1F2933";
const MACHINE_BODY = "#D4C4B0";
const MACHINE_SHADOW = "rgba(31, 41, 51, 0.12)";

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

function easeOutBack(t: number) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
}

export function machineCenter(width: number, height: number) {
  return { x: width * 0.5, y: height * 0.54 };
}

export function machineMouth(width: number, height: number) {
  const center = machineCenter(width, height);
  return { x: center.x, y: center.y - height * 0.06 };
}

export function layoutQueuePosition(
  width: number,
  height: number,
  index: number,
  total: number,
) {
  const center = machineCenter(width, height);
  const spread = Math.min(width * 0.18, 120);
  const offset = index - (total - 1) / 2;
  return {
    x: center.x + offset * spread * 0.55,
    y: center.y - height * 0.22 - Math.abs(offset) * 8,
  };
}

export function layoutMemoryCells(_width: number, _height: number): MemoryCell[] {
  return MEMORY_VALUES.map((_, index) => ({
    address: `0x${(index * 4).toString(16).padStart(2, "0").toUpperCase()}`,
    value: null,
    glow: 0,
  }));
}

function createTokens(): TokenVisual[] {
  return C_TOKEN_SPECS.map((spec) => ({
    label: spec.label,
    bg: spec.bg,
    fg: spec.fg,
    x: 0,
    y: 0,
    fromX: 0,
    fromY: 0,
    toX: 0,
    toY: 0,
    progress: 0,
    state: "waiting",
  }));
}

export function createCLanguageCanvasState(width: number, height: number): CLanguageCanvasState {
  const tokens = createTokens();
  tokens.forEach((token, index) => {
    const pos = layoutQueuePosition(width, height, index, tokens.length);
    token.x = pos.x;
    token.y = pos.y;
    token.fromX = pos.x;
    token.fromY = pos.y;
    token.toX = pos.x;
    token.toY = pos.y;
  });

  return {
    phase: "pause",
    phaseElapsed: 0,
    tokenIndex: 0,
    tokens,
    memory: layoutMemoryCells(width, height),
    activeMemoryIndex: 0,
    bits: [],
    braceOpen: 0,
    machineWobble: 0,
    pointerPhase: 0,
  };
}

function spawnCompileBits(state: CLanguageCanvasState, width: number, height: number) {
  const mouth = machineMouth(width, height);
  for (let i = 0; i < 14; i += 1) {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.2;
    const speed = 1.4 + Math.random() * 2.2;
    state.bits.push({
      x: mouth.x + (Math.random() - 0.5) * 24,
      y: mouth.y + (Math.random() - 0.5) * 10,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      char: Math.random() > 0.5 ? "1" : "0",
      life: 1,
    });
  }
}

function advancePhase(state: CLanguageCanvasState, width: number, height: number) {
  state.phaseElapsed = 0;

  switch (state.phase) {
    case "pause":
      state.phase = "feed";
      break;
    case "feed":
      state.phase = "compile";
      spawnCompileBits(state, width, height);
      break;
    case "compile":
      state.phase = "write";
      break;
    case "write":
      if (state.tokenIndex < state.tokens.length - 1) {
        state.tokenIndex += 1;
        state.activeMemoryIndex = Math.min(
          state.activeMemoryIndex + 1,
          state.memory.length - 1,
        );
        state.phase = "pause";
      } else {
        state.phase = "celebrate";
      }
      break;
    case "celebrate":
      state.phase = "reset";
      break;
    case "reset":
      state.tokenIndex = 0;
      state.activeMemoryIndex = 0;
      state.tokens = createTokens();
      state.tokens.forEach((token, index) => {
        const pos = layoutQueuePosition(width, height, index, state.tokens.length);
        token.x = pos.x;
        token.y = pos.y;
        token.fromX = pos.x;
        token.fromY = pos.y;
        token.toX = pos.x;
        token.toY = pos.y;
      });
      state.memory = layoutMemoryCells(width, height);
      state.bits = [];
      state.braceOpen = 0;
      state.phase = "pause";
      break;
    default:
      break;
  }
}

export function stepCLanguageCanvasState(
  state: CLanguageCanvasState,
  width: number,
  height: number,
  deltaMs: number,
) {
  state.phaseElapsed += deltaMs;
  state.pointerPhase += deltaMs * 0.004;
  state.machineWobble += deltaMs * 0.01;

  const phaseDuration = PHASE_MS[state.phase];
  const phaseT = clamp01(state.phaseElapsed / phaseDuration);

  if (state.phase === "feed") {
    const token = state.tokens[state.tokenIndex];
    if (token.state === "waiting") {
      const queue = layoutQueuePosition(width, height, state.tokenIndex, state.tokens.length);
      const mouth = machineMouth(width, height);
      token.fromX = queue.x;
      token.fromY = queue.y;
      token.toX = mouth.x;
      token.toY = mouth.y;
      token.state = "moving";
      token.progress = 0;
    }

    token.progress = easeInOutCubic(phaseT);
    token.x = token.fromX + (token.toX - token.fromX) * token.progress;
    token.y = token.fromY + (token.toY - token.fromY) * token.progress;

    if (phaseT >= 1) {
      token.state = "absorbed";
    }

    state.braceOpen = easeOutBack(Math.min(1, phaseT * 1.4)) * 0.35;
  }

  if (state.phase === "compile") {
    state.braceOpen = 0.55 + Math.sin(state.machineWobble) * 0.08;
    if (state.phaseElapsed < 120) {
      spawnCompileBits(state, width, height);
    }
  }

  if (state.phase === "write") {
    state.braceOpen = 0.2 * (1 - phaseT);
    const cell = state.memory[state.activeMemoryIndex];
    cell.value = MEMORY_VALUES[state.activeMemoryIndex];
    cell.glow = easeOutBack(phaseT);
  }

  if (state.phase === "celebrate") {
    state.memory.forEach((cell, index) => {
      const wave = Math.sin(state.pointerPhase * 2 + index * 0.8);
      cell.glow = 0.35 + wave * 0.25;
      cell.value = MEMORY_VALUES[index];
    });
    state.braceOpen = 0.15 + Math.sin(state.pointerPhase * 3) * 0.05;
  }

  if (state.phase === "reset") {
    state.braceOpen = 0.15 * (1 - phaseT);
    state.memory.forEach((cell) => {
      cell.glow *= 0.92;
      if (phaseT > 0.6) {
        cell.value = null;
      }
    });
  }

  state.bits = state.bits
    .map((bit) => ({
      ...bit,
      x: bit.x + bit.vx,
      y: bit.y + bit.vy,
      vy: bit.vy + 0.04,
      life: bit.life - deltaMs / 900,
    }))
    .filter((bit) => bit.life > 0);

  if (state.phaseElapsed >= phaseDuration) {
    advancePhase(state, width, height);
  }
}

function drawBackground(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, BG_TOP);
  gradient.addColorStop(1, BG_BOTTOM);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.globalAlpha = 0.08;
  ctx.strokeStyle = INK;
  ctx.lineWidth = 1;
  const step = 28;
  for (let x = 0; x < width; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.06;
  ctx.font = "700 120px ui-sans-serif, system-ui, sans-serif";
  ctx.fillStyle = INK;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("C", width * 0.5, height * 0.18);
  ctx.restore();
}

function drawBrace(
  ctx: CanvasRenderingContext2D,
  char: "{" | "}",
  x: number,
  y: number,
  scale: number,
  open: number,
) {
  const stretch = 1 + open * 0.22;
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(char === "{" ? stretch : stretch, 1);
  ctx.font = "700 64px ui-monospace, SFMono-Regular, Menlo, monospace";
  ctx.fillStyle = INK;
  ctx.globalAlpha = 0.22;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(char, 0, 0);
  ctx.restore();
}

function drawMachine(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  wobble: number,
  braceOpen: number,
) {
  const center = machineCenter(width, height);
  const bodyW = Math.min(width * 0.38, 220);
  const bodyH = Math.min(height * 0.2, 96);
  const wobbleX = Math.sin(wobble) * 2.5;
  const wobbleY = Math.cos(wobble * 1.3) * 1.5;

  drawBrace(ctx, "{", center.x - bodyW * 0.62, center.y, 1 + braceOpen, braceOpen);
  drawBrace(ctx, "}", center.x + bodyW * 0.62, center.y, 1 + braceOpen, braceOpen);

  ctx.save();
  ctx.translate(center.x + wobbleX, center.y + wobbleY);

  ctx.shadowColor = MACHINE_SHADOW;
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 8;

  const bodyGradient = ctx.createLinearGradient(0, -bodyH / 2, 0, bodyH / 2);
  bodyGradient.addColorStop(0, "#E8DCC8");
  bodyGradient.addColorStop(1, MACHINE_BODY);

  ctx.beginPath();
  ctx.roundRect(-bodyW / 2, -bodyH / 2, bodyW, bodyH, 18);
  ctx.fillStyle = bodyGradient;
  ctx.fill();

  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  ctx.strokeStyle = INK;
  ctx.globalAlpha = 0.18;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.globalAlpha = 1;

  const funnelTop = bodyW * 0.34;
  const funnelBottom = bodyW * 0.16;
  const funnelH = bodyH * 0.28;
  ctx.beginPath();
  ctx.moveTo(-funnelTop / 2, -bodyH / 2 - funnelH + 8);
  ctx.lineTo(funnelTop / 2, -bodyH / 2 - funnelH + 8);
  ctx.lineTo(funnelBottom / 2, -bodyH / 2 + 4);
  ctx.lineTo(-funnelBottom / 2, -bodyH / 2 + 4);
  ctx.closePath();
  ctx.fillStyle = "#C9B9A3";
  ctx.fill();
  ctx.strokeStyle = INK;
  ctx.globalAlpha = 0.15;
  ctx.stroke();
  ctx.globalAlpha = 1;

  ctx.font = "600 10px ui-monospace, SFMono-Regular, Menlo, monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = INK;
  ctx.globalAlpha = 0.55;
  ctx.fillText(".c", -bodyW * 0.28, 0);
  ctx.globalAlpha = 1;

  ctx.font = "700 13px ui-monospace, SFMono-Regular, Menlo, monospace";
  ctx.fillText("cc", 0, -2);

  ctx.font = "600 10px ui-monospace, SFMono-Regular, Menlo, monospace";
  ctx.globalAlpha = 0.55;
  ctx.fillText("0/1", bodyW * 0.28, 0);
  ctx.globalAlpha = 1;

  const arrowY = bodyH * 0.08;
  ctx.strokeStyle = "#4F7FD4";
  ctx.globalAlpha = 0.45;
  ctx.lineWidth = 2.5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-bodyW * 0.14, arrowY);
  ctx.lineTo(bodyW * 0.14, arrowY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(bodyW * 0.14, arrowY);
  ctx.lineTo(bodyW * 0.09, arrowY - 5);
  ctx.moveTo(bodyW * 0.14, arrowY);
  ctx.lineTo(bodyW * 0.09, arrowY + 5);
  ctx.stroke();
  ctx.globalAlpha = 1;

  const chuteW = bodyW * 0.22;
  const chuteH = bodyH * 0.18;
  ctx.beginPath();
  ctx.moveTo(-chuteW / 2, bodyH / 2 - 4);
  ctx.lineTo(chuteW / 2, bodyH / 2 - 4);
  ctx.lineTo(chuteW * 0.7, bodyH / 2 + chuteH);
  ctx.lineTo(-chuteW * 0.7, bodyH / 2 + chuteH);
  ctx.closePath();
  ctx.fillStyle = "#BFA894";
  ctx.fill();
  ctx.strokeStyle = INK;
  ctx.globalAlpha = 0.12;
  ctx.stroke();
  ctx.globalAlpha = 1;

  ctx.restore();
}

function drawToken(ctx: CanvasRenderingContext2D, token: TokenVisual) {
  if (token.state === "absorbed") {
    return;
  }

  const padX = 14;
  const padY = 8;
  ctx.font = "700 15px ui-monospace, SFMono-Regular, Menlo, monospace";
  const textW = ctx.measureText(token.label).width;
  const w = textW + padX * 2;
  const h = 28 + padY;

  ctx.save();
  ctx.translate(token.x, token.y);
  ctx.shadowColor = "rgba(31, 41, 51, 0.15)";
  ctx.shadowBlur = 8;
  ctx.shadowOffsetY = 4;

  ctx.beginPath();
  ctx.roundRect(-w / 2, -h / 2, w, h, 12);
  ctx.fillStyle = token.bg;
  ctx.fill();

  ctx.shadowColor = "transparent";
  ctx.fillStyle = token.fg;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(token.label, 0, 1);
  ctx.restore();
}

function getMemoryLayout(width: number, height: number) {
  const count = MEMORY_VALUES.length;
  const gap = Math.min(width * 0.16, 88);
  const totalWidth = gap * (count - 1);
  const startX = width * 0.5 - totalWidth / 2;
  const y = height * 0.8;
  const cellW = Math.min(56, gap * 0.72);
  const cellH = 44;

  return { count, gap, startX, y, cellW, cellH };
}

function drawMemoryRow(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  memory: MemoryCell[],
) {
  const layout = getMemoryLayout(width, height);

  ctx.font = "600 10px ui-monospace, SFMono-Regular, Menlo, monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  memory.forEach((cell, index) => {
    const x = layout.startX + layout.gap * index;
    const y = layout.y;

    if (cell.glow > 0) {
      ctx.save();
      ctx.globalAlpha = cell.glow * 0.35;
      ctx.beginPath();
      ctx.roundRect(
        x - layout.cellW / 2 - 4,
        y - layout.cellH / 2 - 4,
        layout.cellW + 8,
        layout.cellH + 8,
        12,
      );
      ctx.fillStyle = "#4F7FD4";
      ctx.fill();
      ctx.restore();
    }

    ctx.beginPath();
    ctx.roundRect(
      x - layout.cellW / 2,
      y - layout.cellH / 2,
      layout.cellW,
      layout.cellH,
      10,
    );
    ctx.fillStyle = "#FFFDF8";
    ctx.fill();
    ctx.strokeStyle = INK;
    ctx.globalAlpha = 0.2;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.globalAlpha = 1;

    ctx.fillStyle = INK;
    ctx.globalAlpha = 0.45;
    ctx.fillText(cell.address, x, y - layout.cellH / 2 - 14);
    ctx.globalAlpha = 1;

    if (cell.value !== null) {
      ctx.font = "700 16px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.fillStyle = INK;
      ctx.textBaseline = "middle";
      ctx.fillText(String(cell.value), x, y + 1);
      ctx.font = "600 10px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textBaseline = "top";
    }
  });
}

function drawPointer(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  activeIndex: number,
  pointerPhase: number,
) {
  const layout = getMemoryLayout(width, height);
  const x = layout.startX + layout.gap * activeIndex;
  const y = layout.y - layout.cellH / 2 - 18 + Math.sin(pointerPhase) * 4;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(-0.35);

  ctx.beginPath();
  ctx.moveTo(-18, 0);
  ctx.lineTo(10, 0);
  ctx.lineTo(10, -7);
  ctx.lineTo(22, 2);
  ctx.lineTo(10, 9);
  ctx.lineTo(10, 2);
  ctx.closePath();
  ctx.fillStyle = "#E8A23B";
  ctx.fill();
  ctx.strokeStyle = INK;
  ctx.globalAlpha = 0.25;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(-20, 0, 5, 0, Math.PI * 2);
  ctx.fillStyle = "#4F7FD4";
  ctx.globalAlpha = 1;
  ctx.fill();
  ctx.restore();
}

function drawBits(ctx: CanvasRenderingContext2D, bits: BitParticle[]) {
  ctx.font = "700 12px ui-monospace, SFMono-Regular, Menlo, monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (const bit of bits) {
    ctx.save();
    ctx.globalAlpha = bit.life * 0.55;
    ctx.fillStyle = bit.char === "1" ? "#4F7FD4" : INK;
    ctx.fillText(bit.char, bit.x, bit.y);
    ctx.restore();
  }
}

export function renderCLanguageCanvas(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: CLanguageCanvasState,
) {
  ctx.clearRect(0, 0, width, height);
  drawBackground(ctx, width, height);
  drawMemoryRow(ctx, width, height, state.memory);
  drawPointer(ctx, width, height, state.activeMemoryIndex, state.pointerPhase);
  drawMachine(ctx, width, height, state.machineWobble, state.braceOpen);
  state.tokens.forEach((token) => drawToken(ctx, token));
  drawBits(ctx, state.bits);
}
