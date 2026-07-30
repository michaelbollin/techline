import { describe, expect, it } from "vitest";

import {
  createGitBranchesCanvasState,
  stepGitBranchesCanvasState,
} from "./canvas";

describe("git-branches canvas", () => {
  it("creates a main branch path", () => {
    const state = createGitBranchesCanvasState(800, 600);

    expect(state.branches).toHaveLength(1);
    expect(state.branches[0]?.kind).toBe("main");
  });

  it("grows the main branch over time", () => {
    const state = createGitBranchesCanvasState(800, 600);

    for (let frame = 0; frame < 120; frame += 1) {
      stepGitBranchesCanvasState(state, 32);
    }

    expect(state.branches[0]?.drawProgress).toBeGreaterThan(0);
  });
});
