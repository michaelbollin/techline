export type Y2kPhase = "countdown" | "rollover" | "chaos" | "celebration";

export type ConfettiParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  spin: number;
  color: string;
  width: number;
  height: number;
};

export type Y2kCanvasState = {
  phase: Y2kPhase;
  phaseElapsed: number;
  confetti: ConfettiParticle[];
  confettiWave: number;
};

export const DIGITS_FROM = [1, 9, 9, 9] as const;
export const DIGITS_TO = [2, 0, 0, 0] as const;

export const COUNTDOWN_START = 10;
export const COUNTDOWN_TICK_MS = 900;

export const ROLLOVER_HOLD_MS = 450;

export const PHASE_MS = {
  countdown: COUNTDOWN_START * COUNTDOWN_TICK_MS,
  rollover: ROLLOVER_HOLD_MS + 1400,
  chaos: 700,
  celebration: 10000,
} as const;

export const CONFETTI_PER_WAVE = 60;
export const CONFETTI_WAVE_INTERVAL_MS = 650;
export const CONFETTI_MAX_WAVES = 15;
export const CONFETTI_GRAVITY = 0.0000011;

export const PALETTE = {
  digit: "rgba(180, 255, 120, 0.72)",
  digitPanic: "rgba(250, 204, 21, 0.85)",
  digitDanger: "rgba(248, 113, 113, 0.9)",
  glow: "rgba(120, 220, 80, 0.35)",
  alert: "rgba(239, 68, 68, 0.55)",
  alertFill: "rgba(127, 29, 29, 0.18)",
  warning: "rgba(251, 191, 36, 0.75)",
} as const;

const DIGIT_STAGGER_MS = 100;

const CONFETTI_COLORS = ["#ef4444", "#fbbf24", "#22c55e", "#3b82f6", "#a855f7", "#f472b6", "#fde047"];

export const NEWS_TICKER_HEADLINES = [
  "BREAKING: FAA EXTENDS FLIGHT GROUND STOP AS Y2K CLOCKS NEAR MIDNIGHT",
  "FEDERAL RESERVE ACTIVATES EMERGENCY PAPER LEDGER BACKUP SYSTEMS",
  "WHITE HOUSE SITUATION ROOM ON HIGH ALERT FOR MILLENNIUM ROLLOVER",
  "COBOL PROGRAMMERS RECALLED FROM RETIREMENT FOR LAST-MINUTE PATCHES",
  "NUCLEAR PLANTS REPORT ALL SAFETY SYSTEMS HOLDING STEADY",
  "PENTAGON CONFIRMS MISSILE DEFENSE NETWORK PASSED DATE ROLLOVER TEST",
  "WALL STREET TRADING FLOORS STAY OPEN PAST CLOSE FOR CONTINGENCY DRILLS",
  "ATM NETWORKS ACROSS NATION REPORT INTERMITTENT DATE STAMP ERRORS",
  "MAJOR UTILITIES DISCONNECT GRID FROM INTERNET AS PRECAUTION",
  "HOSPITALS SWITCH TO MANUAL PATIENT RECORDS UNTIL SYSTEMS VERIFIED",
  "STATE DEPARTMENT ISSUES WORLDWIDE TRAVEL ADVISORY THROUGH JANUARY 3",
  "CIA WARNS OF POSSIBLE FOREIGN CYBER ATTACKS DURING ROLLOVER WINDOW",
  "MICROSOFT RELEASES EMERGENCY HOTFIX FOR WINDOWS 95 AND NT 4.0",
  "MAINFRAME OPERATORS WORKING DOUBLE SHIFTS IN DATA CENTERS NATIONWIDE",
  "FBI CYBER DIVISION MONITORING FOR MASS SYSTEM FAILURES AT MIDNIGHT",
  "SOCIAL SECURITY ADMINISTRATION POSTPONES BENEFIT DISBURSEMENTS",
  "TELECOM CARRIERS REPORT SURGE IN LONG-DISTANCE CALL VOLUME",
  "GROCERY STORES SEE PANIC BUYING OF WATER BATTERIES AND CANNED GOODS",
  "NEW YEAR'S EVE CELEBRATIONS CANCELLED IN MAJOR CITIES OVER SAFETY FEARS",
  "UNITED NATIONS ESTABLISHES GLOBAL Y2K COORDINATION HOTLINE",
] as const;

export const NEWS_TICKER_SEPARATOR = "   •   ";
export const NEWS_TICKER_SPEED = 0.62;

export function buildNewsTickerText(): string {
  return `${NEWS_TICKER_HEADLINES.join(NEWS_TICKER_SEPARATOR)}${NEWS_TICKER_SEPARATOR}`;
}

export function createY2kCanvasState(): Y2kCanvasState {
  return { phase: "countdown", phaseElapsed: 0, confetti: [], confettiWave: 0 };
}

export function rollDistance(from: number, to: number): number {
  const distance = (to - from + 10) % 10;
  return distance === 0 ? 10 : distance;
}

export function digitScrollPosition(from: number, to: number, progress: number): number {
  return from + rollDistance(from, to) * progress;
}

export function countdownNumber(phaseElapsed: number): number {
  const index = Math.floor(phaseElapsed / COUNTDOWN_TICK_MS);
  return Math.max(1, COUNTDOWN_START - index);
}

export function countdownProgress(phaseElapsed: number): number {
  const tick = phaseElapsed % COUNTDOWN_TICK_MS;
  return tick / COUNTDOWN_TICK_MS;
}

export function panicLevel(countdown: number): number {
  return 1 - (countdown - 1) / (COUNTDOWN_START - 1);
}

export function digitRollProgress(
  phaseElapsed: number,
  digitIndex: number,
  rollDurationMs: number,
): number {
  const start = digitIndex * DIGIT_STAGGER_MS;
  const elapsed = phaseElapsed - start;
  if (elapsed <= 0) {
    return 0;
  }

  const duration = rollDurationMs - DIGIT_STAGGER_MS * 3;
  return Math.min(1, elapsed / Math.max(1, duration));
}

function createConfettiPiece(
  width: number,
  height: number,
  index: number,
  waveIndex: number,
): ConfettiParticle {
  const isBurst = waveIndex === 0 && index < CONFETTI_PER_WAVE * 0.2;

  if (isBurst) {
    const angle = (index / (CONFETTI_PER_WAVE * 0.2)) * Math.PI * 2;
    const radius = width * (0.08 + Math.random() * 0.18);
    return {
      x: width / 2 + Math.cos(angle) * radius,
      y: height * (0.25 + Math.random() * 0.2),
      vx: Math.cos(angle) * width * 0.00025,
      vy: Math.sin(angle) * height * 0.0002 + height * 0.00015,
      rotation: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.06,
      color: CONFETTI_COLORS[index % CONFETTI_COLORS.length] ?? "#fbbf24",
      width: 7 + Math.random() * 11,
      height: 11 + Math.random() * 16,
    };
  }

  const spawnFromSide = index % 9 === 0;
  const fromLeft = index % 2 === 0;

  return {
    x: spawnFromSide ? (fromLeft ? -12 : width + 12) : Math.random() * width,
    y: spawnFromSide ? Math.random() * height * 0.85 : -Math.random() * height * 0.35 - 20,
    vx: spawnFromSide
      ? (fromLeft ? 1 : -1) * width * (0.00018 + Math.random() * 0.00022)
      : (Math.random() - 0.5) * width * 0.00028,
    vy: height * (0.0001 + Math.random() * 0.00022),
    rotation: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 0.05,
    color: CONFETTI_COLORS[index % CONFETTI_COLORS.length] ?? "#fbbf24",
    width: 7 + Math.random() * 12,
    height: 12 + Math.random() * 18,
  };
}

export function spawnConfettiWave(width: number, height: number, waveIndex: number): ConfettiParticle[] {
  return Array.from({ length: CONFETTI_PER_WAVE }, (_, index) =>
    createConfettiPiece(width, height, index, waveIndex),
  );
}

export function spawnConfetti(width: number, height: number): ConfettiParticle[] {
  return spawnConfettiWave(width, height, 0);
}

function spawnCelebrationConfettiWaves(
  state: Y2kCanvasState,
  width: number,
  height: number,
): void {
  const targetWave = Math.min(
    CONFETTI_MAX_WAVES,
    Math.floor(state.phaseElapsed / CONFETTI_WAVE_INTERVAL_MS) + 1,
  );

  while (state.confettiWave < targetWave) {
    state.confetti.push(...spawnConfettiWave(width, height, state.confettiWave));
    state.confettiWave += 1;
  }
}

export function stepY2kCanvasState(state: Y2kCanvasState, deltaMs: number, width: number, height: number): void {
  state.phaseElapsed += deltaMs;

  if (state.phase === "celebration") {
    spawnCelebrationConfettiWaves(state, width, height);

    for (const piece of state.confetti) {
      piece.x += piece.vx * deltaMs;
      piece.y += piece.vy * deltaMs;
      piece.vy += height * CONFETTI_GRAVITY * deltaMs;
      piece.rotation += piece.spin * deltaMs * 0.02;
      piece.x += Math.sin(piece.rotation * 2.4) * width * 0.000015 * deltaMs;
    }
  }

  const limit = PHASE_MS[state.phase];
  if (state.phaseElapsed < limit) {
    return;
  }

  state.phaseElapsed = 0;

  if (state.phase === "countdown") {
    state.phase = "rollover";
    return;
  }

  if (state.phase === "rollover") {
    state.phase = "chaos";
    return;
  }

  if (state.phase === "chaos") {
    state.phase = "celebration";
    state.confetti = spawnConfettiWave(width, height, 0);
    state.confettiWave = 1;
    return;
  }

  state.phase = "countdown";
  state.confetti = [];
  state.confettiWave = 0;
}

function drawScrollingDigit(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  from: number,
  to: number,
  progress: number,
  digitSize: number,
): void {
  const clipH = digitSize * 1.05;
  const scroll = digitScrollPosition(from, to, progress);
  const base = Math.floor(scroll);
  const fraction = scroll - base;

  context.save();
  context.beginPath();
  context.rect(x - digitSize * 0.35, y - clipH * 0.85, digitSize * 0.7, clipH);
  context.clip();

  for (let offset = 0; offset < 2; offset += 1) {
    const digit = (base + offset) % 10;
    const drawY = y + offset * clipH - fraction * clipH;
    context.fillText(String(digit), x, drawY);
  }

  context.restore();
}

function drawPanicOverlay(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  intensity: number,
  elapsed: number,
  flashing: boolean,
): void {
  const pulse = 0.5 + Math.sin(elapsed * 0.02) * 0.5;
  const alpha = intensity * pulse * 0.35;

  context.fillStyle = `rgba(127, 29, 29, ${alpha})`;
  context.fillRect(0, 0, width, height);

  if (flashing && Math.floor(elapsed / 120) % 2 === 0) {
    context.fillStyle = `rgba(239, 68, 68, ${0.12 + intensity * 0.2})`;
    context.fillRect(0, 0, width, height);
  }

  const bannerY = height * 0.12;
  context.fillStyle = `rgba(239, 68, 68, ${0.25 + intensity * 0.35})`;
  context.fillRect(0, bannerY, width, height * 0.07);

  context.font = `700 ${Math.min(width * 0.028, 34)}px ui-monospace, SFMono-Regular, Menlo, monospace`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = PALETTE.warning;
  context.fillText("⚠ SYSTEM DATE OVERFLOW IMMINENT — ALL SERVERS AT RISK ⚠", width / 2, bannerY + height * 0.035);
}

function drawNewsTicker(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  elapsed: number,
  intensity: number,
): void {
  const barHeight = height * 0.065;
  const tickerY = height - barHeight / 2;
  const fontSize = Math.min(width * 0.022, 22);

  context.fillStyle = `rgba(15, 23, 42, ${0.55 + intensity * 0.2})`;
  context.fillRect(0, height - barHeight, width, barHeight);

  context.strokeStyle = `rgba(248, 113, 113, ${0.35 + intensity * 0.25})`;
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(0, height - barHeight);
  context.lineTo(width, height - barHeight);
  context.stroke();

  context.font = `600 ${fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;
  context.textAlign = "left";
  context.textBaseline = "middle";
  context.fillStyle = `rgba(254, 226, 226, ${0.65 + intensity * 0.3})`;

  const text = buildNewsTickerText();
  const textWidth = context.measureText(text).width;
  const offset = (elapsed * NEWS_TICKER_SPEED) % textWidth;

  let x = -offset;
  while (x < width) {
    context.fillText(text, x, tickerY);
    x += textWidth;
  }
}

function drawStaticNoise(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  intensity: number,
  seed: number,
): void {
  const count = Math.floor(width * height * 0.00025 * intensity);

  for (let index = 0; index < count; index += 1) {
    const x = ((Math.sin(seed * 0.07 + index * 1.7) + 1) * 0.5) * width;
    const y = ((Math.cos(seed * 0.05 + index * 2.3) + 1) * 0.5) * height;
    context.fillStyle = index % 3 === 0 ? "rgba(255,255,255,0.2)" : "rgba(248,113,113,0.25)";
    context.fillRect(x, y, 2 + (index % 3), 2);
  }
}

function drawConfetti(
  context: CanvasRenderingContext2D,
  particles: ConfettiParticle[],
): void {
  for (const piece of particles) {
    context.save();
    context.translate(piece.x, piece.y);
    context.rotate(piece.rotation);
    context.fillStyle = piece.color;
    context.globalAlpha = 0.9;
    context.fillRect(-piece.width / 2, -piece.height / 2, piece.width, piece.height);
    context.strokeStyle = "rgba(15, 23, 42, 0.12)";
    context.lineWidth = 0.6;
    context.strokeRect(-piece.width / 2, -piece.height / 2, piece.width, piece.height);
    context.restore();
  }

  context.globalAlpha = 1;
}

function drawYearDisplay(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: Y2kCanvasState,
  shake: number,
): void {
  const digitSize = Math.min(width, height) * 0.2;
  const spacing = digitSize * 0.72;
  const centerX = width / 2 + shake;
  const centerY = height * 0.52;
  const startX = centerX - (spacing * 3) / 2;

  context.font = `700 ${digitSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.shadowColor = PALETTE.glow;
  context.shadowBlur = digitSize * 0.18;

  for (let index = 0; index < 4; index += 1) {
    const x = startX + index * spacing;
    const from = DIGITS_FROM[index] ?? 0;
    const to = DIGITS_TO[index] ?? 0;

    if (state.phase === "rollover") {
      context.fillStyle = PALETTE.digitPanic;
      if (state.phaseElapsed < ROLLOVER_HOLD_MS) {
        context.fillText(String(from), x, centerY);
        continue;
      }

      const rollElapsed = state.phaseElapsed - ROLLOVER_HOLD_MS;
      const progress = digitRollProgress(rollElapsed, index, PHASE_MS.rollover - ROLLOVER_HOLD_MS);
      drawScrollingDigit(context, x, centerY, from, to, progress, digitSize);
      continue;
    }

    if (state.phase === "chaos") {
      const chaosShake = Math.sin(state.phaseElapsed * 0.5 + index) * digitSize * 0.04;
      context.fillStyle = index % 2 === 0 ? PALETTE.digitDanger : PALETTE.digit;
      context.fillText(String(to), x + chaosShake, centerY);
      continue;
    }

    context.fillStyle = state.phase === "celebration" ? "rgba(134, 239, 172, 0.9)" : PALETTE.digit;
    context.fillText(String(to), x, centerY);
  }

  context.shadowBlur = 0;
}

export function renderY2kCanvas(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: Y2kCanvasState,
): void {
  context.clearRect(0, 0, width, height);

  const elapsed = state.phaseElapsed;

  if (state.phase === "countdown") {
    const number = countdownNumber(elapsed);
    const level = panicLevel(number);
    const tickProgress = countdownProgress(elapsed);
    const shake = Math.sin(elapsed * 0.04) * width * 0.008 * level;
    const scale = 1 + tickProgress * 0.08 * level;

    drawPanicOverlay(context, width, height, level, elapsed, number <= 3);
    drawNewsTicker(context, width, height, elapsed, level);

    const digitSize = Math.min(width, height) * 0.42 * scale;
    context.font = `700 ${digitSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.shadowColor = PALETTE.glow;
    context.shadowBlur = digitSize * 0.2;
    context.fillStyle = number <= 3 ? PALETTE.digitDanger : number <= 6 ? PALETTE.digitPanic : PALETTE.digit;
    context.fillText(String(number), width / 2 + shake, height * 0.5);

    context.shadowBlur = 0;
    context.font = `600 ${Math.min(width * 0.04, 48)}px ui-monospace, SFMono-Regular, Menlo, monospace`;
    context.fillStyle = `rgba(248, 250, 252, ${0.35 + level * 0.35})`;
    context.fillText("SECONDS TO MIDNIGHT", width / 2, height * 0.68);

    context.font = `500 ${Math.min(width * 0.028, 32)}px ui-monospace, SFMono-Regular, Menlo, monospace`;
    context.fillStyle = PALETTE.warning;
    context.fillText(`12/31/1999  23:59:${String(60 - number).padStart(2, "0")}`, width / 2 + shake * 0.5, height * 0.78);
    return;
  }

  const chaosLevel =
    state.phase === "chaos" ? 1 : state.phase === "rollover" ? 0.65 : state.phase === "celebration" ? 0.15 : 0;
  const shake =
    state.phase === "chaos"
      ? Math.sin(elapsed * 0.35) * width * 0.02
      : state.phase === "rollover"
        ? Math.sin(elapsed * 0.08) * width * 0.006
        : 0;

  if (state.phase === "chaos" || state.phase === "rollover") {
    drawPanicOverlay(context, width, height, chaosLevel, elapsed, true);
    drawNewsTicker(context, width, height, elapsed, chaosLevel);
    drawStaticNoise(context, width, height, chaosLevel, elapsed);
  }

  if (state.phase === "celebration") {
    if (elapsed < 180) {
      context.fillStyle = `rgba(255, 255, 255, ${0.55 * (1 - elapsed / 180)})`;
      context.fillRect(0, 0, width, height);
    }

    context.fillStyle = "rgba(15, 23, 42, 0.12)";
    context.fillRect(0, 0, width, height);
    drawConfetti(context, state.confetti);

    context.font = `700 ${Math.min(width * 0.05, 56)}px ui-monospace, SFMono-Regular, Menlo, monospace`;
    context.textAlign = "center";
    context.fillStyle = "rgba(134, 239, 172, 0.8)";
    context.fillText("WE SURVIVED!", width / 2, height * 0.18);
  }

  drawYearDisplay(context, width, height, state, shake);
}
