import { describe, expect, it } from "vitest";

import { axisWaveOffset, axisYAt, buildAxisPath, buildDecadeBandPath } from "./axis-path";

describe("axisWaveOffset", () => {
  it("returns zero at wave origin", () => {
    expect(axisWaveOffset(0)).toBeCloseTo(0);
  });

  it("oscillates within amplitude bounds", () => {
    const values = Array.from({ length: 20 }, (_, index) => axisWaveOffset(index * 40));
    expect(Math.max(...values)).toBeLessThanOrEqual(16);
    expect(Math.min(...values)).toBeGreaterThanOrEqual(-16);
  });
});

describe("axisYAt", () => {
  it("offsets base axis y by wave", () => {
    expect(axisYAt(0, 100)).toBe(100);
    expect(axisYAt(120, 100)).toBe(100 + axisWaveOffset(120));
  });
});

describe("buildAxisPath", () => {
  it("builds an SVG path from left to right", () => {
    const path = buildAxisPath(120, 200);
    expect(path.startsWith("M 0 ")).toBe(true);
    expect(path).toContain("L 120 ");
  });
});

describe("buildDecadeBandPath", () => {
  it("builds a closed path with a flat bottom and curvy top", () => {
    const getAxisY = (x: number) => axisYAt(x, 200);
    const path = buildDecadeBandPath(40, 160, 302, getAxisY);

    expect(path.startsWith("M 40 302")).toBe(true);
    expect(path).toContain("L 40 200");
    expect(path).toContain("L 160 ");
    expect(path.endsWith("302 Z")).toBe(true);
  });
});
