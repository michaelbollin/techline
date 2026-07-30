import { describe, expect, it } from "vitest";

import {
  createCdRomCanvasState,
  stepCdRomCanvasState,
} from "./cd-rom-canvas";

describe("cd-rom-canvas", () => {
  it("creates discs and data bits for the viewport", () => {
    const state = createCdRomCanvasState(800, 600);

    expect(state.discs).toHaveLength(7);
    expect(state.bits).toHaveLength(28);
    expect(state.laserDirection).toBe(1);
  });

  it("advances animation state without throwing", () => {
    const state = createCdRomCanvasState(800, 600);

    stepCdRomCanvasState(state, 800, 600, 16);
    stepCdRomCanvasState(state, 800, 600, 16);

    expect(state.laserY).not.toBe(120);
  });
});
