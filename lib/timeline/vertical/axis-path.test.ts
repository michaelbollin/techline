import { describe, expect, it } from "vitest";

import { axisWaveOffset, axisXAt, buildVerticalAxisPath } from "./axis-path";

describe("vertical axis path", () => {
  it("offsets x by wave", () => {
    expect(axisXAt(0, 100)).toBe(100);
    expect(axisXAt(120, 100)).toBe(100 + axisWaveOffset(120));
  });

  it("builds a top-to-bottom path", () => {
    const path = buildVerticalAxisPath(240, 80);
    expect(path.startsWith("M ")).toBe(true);
    expect(path).toContain("240");
  });
});
