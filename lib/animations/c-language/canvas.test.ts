import { describe, expect, it } from "vitest";

import {
  createCLanguageCanvasState,
  PHASE_MS,
  stepCLanguageCanvasState,
} from "./canvas";

describe("c-language canvas", () => {
  it("feeds tokens through compile phases", () => {
    const state = createCLanguageCanvasState(640, 480);

    stepCLanguageCanvasState(state, 640, 480, PHASE_MS.pause + 1);
    expect(state.phase).toBe("feed");

    stepCLanguageCanvasState(state, 640, 480, PHASE_MS.feed);
    expect(state.phase).toBe("compile");
    expect(state.bits.length).toBeGreaterThan(0);

    stepCLanguageCanvasState(state, 640, 480, PHASE_MS.compile);
    expect(state.phase).toBe("write");

    stepCLanguageCanvasState(state, 640, 480, 1);
    expect(state.memory[0].value).toBe(0);
  });

  it("loops after celebrate and reset", () => {
    const state = createCLanguageCanvasState(640, 480);
    state.phase = "celebrate";
    state.phaseElapsed = 0;
    state.tokenIndex = state.tokens.length - 1;
    state.memory.forEach((cell, index) => {
      cell.value = index;
    });

    stepCLanguageCanvasState(state, 640, 480, PHASE_MS.celebrate);
    expect(state.phase).toBe("reset");

    stepCLanguageCanvasState(state, 640, 480, PHASE_MS.reset);
    expect(state.phase).toBe("pause");
    expect(state.tokenIndex).toBe(0);
    expect(state.memory.every((cell) => cell.value === null)).toBe(true);
  });
});
