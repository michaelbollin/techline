import { describe, expect, it } from "vitest";

import {
  CONFETTI_PER_WAVE,
  CONFETTI_WAVE_INTERVAL_MS,
  COUNTDOWN_START,
  COUNTDOWN_TICK_MS,
  buildNewsTickerText,
  createY2kCanvasState,
  countdownNumber,
  digitRollProgress,
  digitScrollPosition,
  NEWS_TICKER_HEADLINES,
  panicLevel,
  PHASE_MS,
  rollDistance,
  stepY2kCanvasState,
} from "./canvas";

describe("y2k rollover canvas", () => {
  it("rolls digits from 1999 toward 2000", () => {
    expect(rollDistance(9, 0)).toBe(1);
    expect(digitScrollPosition(9, 0, 1)).toBe(10);
  });

  it("counts down from 10 with escalating panic", () => {
    expect(countdownNumber(0)).toBe(COUNTDOWN_START);
    expect(countdownNumber(COUNTDOWN_TICK_MS)).toBe(COUNTDOWN_START - 1);
    expect(panicLevel(10)).toBe(0);
    expect(panicLevel(1)).toBe(1);
  });

  it("builds a long seamless news ticker string", () => {
    const text = buildNewsTickerText();
    expect(NEWS_TICKER_HEADLINES.every((headline) => text.includes(headline))).toBe(true);
    expect(text.length).toBeGreaterThan(500);
  });

  it("staggers digit rolls during rollover", () => {
    expect(digitRollProgress(0, 0, PHASE_MS.rollover)).toBe(0);
    expect(digitRollProgress(250, 0, PHASE_MS.rollover)).toBeGreaterThan(0);
  });

  it("cycles through panic, rollover, chaos, and celebration", () => {
    const state = createY2kCanvasState();
    expect(state.phase).toBe("countdown");

    stepY2kCanvasState(state, PHASE_MS.countdown + 1, 1200, 800);
    expect(state.phase).toBe("rollover");

    stepY2kCanvasState(state, PHASE_MS.rollover + 1, 1200, 800);
    expect(state.phase).toBe("chaos");

    stepY2kCanvasState(state, PHASE_MS.chaos + 1, 1200, 800);
    expect(state.phase).toBe("celebration");
    expect(state.confetti.length).toBe(CONFETTI_PER_WAVE);

    stepY2kCanvasState(state, CONFETTI_WAVE_INTERVAL_MS * 2, 1200, 800);
    expect(state.confetti.length).toBeGreaterThan(CONFETTI_PER_WAVE);
    expect(state.confettiWave).toBeGreaterThan(1);

    stepY2kCanvasState(state, PHASE_MS.celebration, 1200, 800);
    expect(state.phase).toBe("countdown");
    expect(state.confetti).toHaveLength(0);
    expect(state.confettiWave).toBe(0);
  });
});
