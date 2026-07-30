export type BarState = "idle" | "pivot" | "active" | "sorted";

export type QuicksortStep =
  | { type: "pivot"; index: number }
  | { type: "compare"; left: number; right: number }
  | { type: "swap"; left: number; right: number }
  | { type: "sorted"; from: number; to: number };

export type QuicksortBarVisual = {
  targetValue: number;
  displayValue: number;
  emphasis: number;
  sorted: number;
  lift: number;
};

export type QuicksortCanvasState = {
  bars: QuicksortBarVisual[];
  steps: QuicksortStep[];
  stepIndex: number;
  phaseElapsed: number;
  phaseDuration: number;
  runPhase: "sorting" | "celebrate" | "reset";
  celebrateElapsed: number;
  resetElapsed: number;
  activeSwap: {
    left: number;
    right: number;
    leftFrom: number;
    leftTo: number;
    rightFrom: number;
    rightTo: number;
  } | null;
  emphasisIndices: number[];
};

const BAR_COUNT = 24;

const TIMING = {
  compare: 240,
  pivot: 420,
  swap: 780,
  sorted: 480,
  celebrate: 1500,
  reset: 900,
} as const;

const BAR_COLOR = {
  top: { r: 59, g: 130, b: 246 },
  bottom: { r: 147, g: 197, b: 253 },
} as const;

const BAR_OPACITY = {
  base: 0.05,
  top: 0.12,
  emphasis: 0.05,
  sorted: 0.02,
} as const;

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function buildQuicksortSteps(values: number[]): QuicksortStep[] {
  const steps: QuicksortStep[] = [];
  const arr = [...values];

  function partition(low: number, high: number) {
    steps.push({ type: "pivot", index: high });
    let storeIndex = low;

    for (let index = low; index < high; index += 1) {
      steps.push({ type: "compare", left: index, right: high });

      if (arr[index] < arr[high]) {
        if (storeIndex !== index) {
          steps.push({ type: "swap", left: storeIndex, right: index });
          [arr[storeIndex], arr[index]] = [arr[index], arr[storeIndex]];
        }
        storeIndex += 1;
      }
    }

    if (storeIndex !== high) {
      steps.push({ type: "swap", left: storeIndex, right: high });
      [arr[storeIndex], arr[high]] = [arr[high], arr[storeIndex]];
    }

    return storeIndex;
  }

  function sort(low: number, high: number) {
    if (low >= high) {
      steps.push({ type: "sorted", from: low, to: high });
      return;
    }

    const pivotIndex = partition(low, high);
    sort(low, pivotIndex - 1);
    sort(pivotIndex + 1, high);
  }

  sort(0, arr.length - 1);
  steps.push({ type: "sorted", from: 0, to: arr.length - 1 });

  return steps;
}

function createBars(values: number[]): QuicksortBarVisual[] {
  return values.map((value) => ({
    targetValue: value,
    displayValue: value,
    emphasis: 0,
    sorted: 0,
    lift: 0,
  }));
}

export function createQuicksortCanvasState(): QuicksortCanvasState {
  const values = Array.from({ length: BAR_COUNT }, () => randomBetween(0.14, 1));

  return {
    bars: createBars(values),
    steps: buildQuicksortSteps(values),
    stepIndex: 0,
    phaseElapsed: 0,
    phaseDuration: 0,
    runPhase: "sorting",
    celebrateElapsed: 0,
    resetElapsed: 0,
    activeSwap: null,
    emphasisIndices: [],
  };
}

function beginStep(state: QuicksortCanvasState, step: QuicksortStep) {
  state.emphasisIndices = [];
  state.activeSwap = null;

  switch (step.type) {
    case "pivot":
      state.emphasisIndices = [step.index];
      state.phaseDuration = TIMING.pivot;
      state.bars[step.index].emphasis = 0.65;
      break;
    case "compare":
      state.emphasisIndices = [step.left, step.right];
      state.phaseDuration = TIMING.compare;
      state.bars[step.left].emphasis = 0.55;
      state.bars[step.right].emphasis = 0.55;
      break;
    case "swap": {
      const { left, right } = step;
      const leftValue = state.bars[left].targetValue;
      const rightValue = state.bars[right].targetValue;

      state.bars[left].targetValue = rightValue;
      state.bars[right].targetValue = leftValue;
      state.emphasisIndices = [left, right];
      state.bars[left].emphasis = 0.7;
      state.bars[right].emphasis = 0.7;
      state.bars[left].lift = 1;
      state.bars[right].lift = 1;
      state.activeSwap = {
        left,
        right,
        leftFrom: leftValue,
        leftTo: rightValue,
        rightFrom: rightValue,
        rightTo: leftValue,
      };
      state.phaseDuration = TIMING.swap;
      break;
    }
    case "sorted":
      state.phaseDuration = TIMING.sorted;
      for (let index = step.from; index <= step.to; index += 1) {
        state.bars[index].sorted = 1;
      }
      break;
  }

  state.phaseElapsed = 0;
}

function decayEmphasis(state: QuicksortCanvasState, deltaMs: number) {
  const decay = 1 - Math.exp(-deltaMs / 260);

  for (const bar of state.bars) {
    bar.emphasis = Math.max(0, bar.emphasis - decay);
    bar.lift = Math.max(0, bar.lift - decay * 1.2);
  }
}

function swapProgress(state: QuicksortCanvasState) {
  if (!state.activeSwap || state.phaseDuration <= 0) {
    return 0;
  }

  return easeInOutCubic(clamp01(state.phaseElapsed / state.phaseDuration));
}

function updateVisuals(state: QuicksortCanvasState, deltaMs: number) {
  const follow = 1 - Math.exp(-deltaMs / 95);

  for (const bar of state.bars) {
    bar.displayValue += (bar.targetValue - bar.displayValue) * follow;
  }

  if (state.activeSwap) {
    const progress = swapProgress(state);
    const { left, right, leftFrom, leftTo, rightFrom, rightTo } = state.activeSwap;

    state.bars[left].displayValue = leftFrom + (leftTo - leftFrom) * progress;
    state.bars[right].displayValue = rightFrom + (rightTo - rightFrom) * progress;
    state.bars[left].lift = Math.sin(progress * Math.PI) * 1.15;
    state.bars[right].lift = Math.sin(progress * Math.PI) * 1.15;
  }

  decayEmphasis(state, deltaMs);
}

function startNextStep(state: QuicksortCanvasState) {
  if (state.stepIndex >= state.steps.length) {
    state.runPhase = "celebrate";
    state.celebrateElapsed = 0;
    return;
  }

  beginStep(state, state.steps[state.stepIndex]);
  state.stepIndex += 1;
}

export function stepQuicksortCanvasState(state: QuicksortCanvasState, deltaMs: number) {
  if (state.runPhase === "celebrate") {
    state.celebrateElapsed += deltaMs;

    const pulse = (Math.sin(state.celebrateElapsed / 220) + 1) / 2;
    for (const bar of state.bars) {
      bar.emphasis = pulse * 0.18;
    }

    if (state.celebrateElapsed >= TIMING.celebrate) {
      state.runPhase = "reset";
      state.resetElapsed = 0;
    }

    updateVisuals(state, deltaMs);
    return;
  }

  if (state.runPhase === "reset") {
    state.resetElapsed += deltaMs;
    const progress = clamp01(state.resetElapsed / TIMING.reset);
    const fade = 1 - easeOutCubic(progress);

    for (const bar of state.bars) {
      bar.displayValue *= fade;
      bar.emphasis = 0;
      bar.sorted = 0;
      bar.lift = 0;
    }

    if (state.resetElapsed >= TIMING.reset) {
      const next = createQuicksortCanvasState();
      Object.assign(state, next);
    }

    return;
  }

  if (state.phaseDuration === 0) {
    startNextStep(state);
  }

  if (state.phaseDuration > 0) {
    state.phaseElapsed += deltaMs;
  }

  updateVisuals(state, deltaMs);

  if (state.phaseDuration === 0) {
    return;
  }

  if (state.phaseElapsed < state.phaseDuration) {
    return;
  }

  state.phaseDuration = 0;
  state.activeSwap = null;
}

function barGradient(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  height: number,
  emphasis: number,
  sorted: number,
) {
  const bottomAlpha = BAR_OPACITY.base + sorted * BAR_OPACITY.sorted;
  const topAlpha = BAR_OPACITY.top + emphasis * BAR_OPACITY.emphasis;
  const gradient = ctx.createLinearGradient(x, y, x, y + height);
  const { top, bottom } = BAR_COLOR;
  gradient.addColorStop(0, `rgba(${top.r}, ${top.g}, ${top.b}, ${topAlpha.toFixed(3)})`);
  gradient.addColorStop(1, `rgba(${bottom.r}, ${bottom.g}, ${bottom.b}, ${bottomAlpha.toFixed(3)})`);
  return gradient;
}

function barTravelX(state: QuicksortCanvasState, index: number, barPitch: number) {
  if (!state.activeSwap) {
    return 0;
  }

  const { left, right } = state.activeSwap;
  const progress = swapProgress(state);

  if (index === left) {
    return progress * (right - left) * barPitch;
  }

  if (index === right) {
    return progress * (left - right) * barPitch;
  }

  return 0;
}

function drawSwapArc(
  ctx: CanvasRenderingContext2D,
  state: QuicksortCanvasState,
  chartHeight: number,
  layout: {
    paddingX: number;
    barWidth: number;
    gap: number;
    baselineY: number;
    barPitch: number;
  },
) {
  if (!state.activeSwap) {
    return;
  }

  const progress = swapProgress(state);
  if (progress <= 0.04 || progress >= 0.96) {
    return;
  }

  const { left, right } = state.activeSwap;
  const leftBar = state.bars[left];
  const rightBar = state.bars[right];
  const leftX =
    layout.paddingX + left * layout.barPitch + layout.barWidth / 2 + barTravelX(state, left, layout.barPitch);
  const rightX =
    layout.paddingX + right * layout.barPitch + layout.barWidth / 2 + barTravelX(state, right, layout.barPitch);
  const leftTop =
    layout.baselineY -
    leftBar.displayValue * chartHeight -
    leftBar.lift * Math.min(18, layout.barWidth * 0.55) -
    8;
  const rightTop =
    layout.baselineY -
    rightBar.displayValue * chartHeight -
    rightBar.lift * Math.min(18, layout.barWidth * 0.55) -
    8;
  const arcHeight = Math.max(24, Math.abs(right - left) * layout.barPitch * 0.35);

  ctx.save();
  ctx.strokeStyle = "rgba(59, 130, 246, 0.08)";
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 6]);
  ctx.beginPath();
  ctx.moveTo(leftX, leftTop);
  ctx.quadraticCurveTo((leftX + rightX) / 2, leftTop - arcHeight, rightX, rightTop);
  ctx.stroke();
  ctx.restore();
}

export function renderQuicksortCanvas(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: QuicksortCanvasState,
) {
  ctx.clearRect(0, 0, width, height);

  const paddingX = 28;
  const paddingTop = 48;
  const paddingBottom = 0;
  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingTop - paddingBottom;
  const barPitch = chartWidth / state.bars.length;
  const barWidth = barPitch;
  const gap = Math.min(4, barWidth * 0.18);
  const baselineY = height - paddingBottom;
  const layout = { paddingX, barWidth, gap, baselineY, barPitch };

  ctx.save();
  ctx.strokeStyle = "rgba(59, 130, 246, 0.05)";
  ctx.lineWidth = 1;

  for (let line = 1; line <= 4; line += 1) {
    const y = paddingTop + (chartHeight / 4) * line;
    ctx.beginPath();
    ctx.moveTo(paddingX, y);
    ctx.lineTo(paddingX + chartWidth, y);
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.moveTo(paddingX, baselineY);
  ctx.lineTo(paddingX + chartWidth, baselineY);
  ctx.stroke();
  ctx.restore();

  drawSwapArc(ctx, state, chartHeight, layout);

  const drawOrder = state.bars.map((_, index) => index);
  if (state.activeSwap) {
    const { left, right } = state.activeSwap;
    drawOrder.sort((a, b) => {
      const liftA = a === left || a === right ? 1 : 0;
      const liftB = b === left || b === right ? 1 : 0;
      return liftA - liftB;
    });
  }

  for (const index of drawOrder) {
    const bar = state.bars[index];
    const barHeight = bar.displayValue * chartHeight;
    const liftOffset = bar.lift * Math.min(18, barWidth * 0.5);
    const travelX = barTravelX(state, index, barPitch);
    const x = paddingX + index * barPitch + gap / 2 + travelX;
    const w = Math.max(3, barWidth - gap);
    const y = baselineY - barHeight - liftOffset;
    const radius = Math.min(5, w / 2);
    const drawHeight = barHeight + liftOffset;

    ctx.fillStyle = barGradient(ctx, x, y, drawHeight, bar.emphasis, bar.sorted);
    ctx.beginPath();
    ctx.roundRect(x, y, w, drawHeight, [radius, radius, 0, 0]);
    ctx.fill();
  }
}
