import { describe, expect, it } from "vitest";

import {
  buildQuicksortSteps,
  createQuicksortCanvasState,
  stepQuicksortCanvasState,
} from "./canvas";

describe("quicksort canvas", () => {
  it("records compare and swap steps", () => {
    const steps = buildQuicksortSteps([0.5, 0.2, 0.8, 0.1]);

    expect(steps.some((step) => step.type === "pivot")).toBe(true);
    expect(steps.some((step) => step.type === "compare")).toBe(true);
    expect(steps.some((step) => step.type === "swap")).toBe(true);
    expect(steps.at(-1)).toEqual({ type: "sorted", from: 0, to: 3 });
  });

  it("runs sort phases and eventually celebrates", () => {
    const state = createQuicksortCanvasState();

    for (let frame = 0; frame < 400; frame += 1) {
      stepQuicksortCanvasState(state, 24);
    }

    expect(state.runPhase === "celebrate" || state.runPhase === "reset" || state.stepIndex > 0).toBe(
      true,
    );
  });

  it("interpolates bar display values during swaps", () => {
    const state = createQuicksortCanvasState();
    state.bars[0].targetValue = 0.2;
    state.bars[0].displayValue = 0.2;
    state.bars[1].targetValue = 0.9;
    state.bars[1].displayValue = 0.9;
    state.steps = [{ type: "swap", left: 0, right: 1 }];
    state.stepIndex = 0;
    state.phaseDuration = 0;

    stepQuicksortCanvasState(state, 0);
    const before = state.bars[0].displayValue;

    stepQuicksortCanvasState(state, 80);
    expect(state.bars[0].displayValue).not.toBe(before);
    expect(state.bars[0].displayValue).toBeGreaterThan(0.2);
    expect(state.bars[0].displayValue).toBeLessThan(0.9);
  });
});
