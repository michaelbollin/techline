import { describe, expect, it } from "vitest";

import {
  createGpt3ApiCanvasState,
  getCurrentScene,
  GPT3_API_SCENES,
  PHASE_MS,
  stepGpt3ApiCanvasState,
  thinkingDotScale,
  visibleInputText,
  visibleResponseText,
} from "./canvas";

describe("gpt-3-api canvas", () => {
  it("types into the input bar before sending", () => {
    const state = createGpt3ApiCanvasState();
    const scene = getCurrentScene(state);

    stepGpt3ApiCanvasState(state, scene.prompt.length * PHASE_MS.inputTyping);
    expect(state.phase).toBe("send");
    expect(visibleInputText(scene, state.visibleInputChars)).toBe(scene.prompt);
  });

  it("shows thinking dots then streams the assistant reply", () => {
    const state = createGpt3ApiCanvasState();
    const scene = getCurrentScene(state);

    state.phase = "thinking";
    state.visibleInputChars = scene.prompt.length;
    stepGpt3ApiCanvasState(state, PHASE_MS.thinking + 1);
    expect(state.phase).toBe("streaming");

    stepGpt3ApiCanvasState(state, PHASE_MS.stream * 6);
    expect(visibleResponseText(scene, state.visibleResponseChars).length).toBeGreaterThan(0);
  });

  it("cycles scenes after hold and reset", () => {
    const state = createGpt3ApiCanvasState();
    const scene = getCurrentScene(state);

    state.phase = "hold";
    state.phaseElapsed = PHASE_MS.hold;
    stepGpt3ApiCanvasState(state, 1);
    expect(state.phase).toBe("reset");

    stepGpt3ApiCanvasState(state, PHASE_MS.reset);
    expect(state.phase).toBe("input-typing");
    expect(state.sceneIndex).toBe(1 % GPT3_API_SCENES.length);
    expect(getCurrentScene(state).prompt).not.toBe(scene.prompt);
  });

  it("animates thinking dots with a staggered wave", () => {
    expect(thinkingDotScale(140, 0)).toBeGreaterThan(thinkingDotScale(0, 0));
    expect(thinkingDotScale(0, 1)).not.toBe(thinkingDotScale(0, 0));
  });
});
