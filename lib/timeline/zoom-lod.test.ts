import { describe, expect, it } from "vitest";

import { maxImportanceForZoom, maxLanesForViewport, maxLanesForZoom } from "./zoom-lod";

const MS_PER_DAY = 86_400_000;
const MS_PER_YEAR = 365.25 * MS_PER_DAY;

describe("maxImportanceForZoom", () => {
  it("shows fewer importance tiers when zoomed out", () => {
    expect(maxImportanceForZoom(MS_PER_DAY * 100, MS_PER_YEAR * 20)).toBe(0);
    expect(maxImportanceForZoom(MS_PER_DAY / 48, MS_PER_YEAR)).toBe(9);
    expect(maxImportanceForZoom(MS_PER_DAY / 48, MS_PER_YEAR * 10)).toBe(1);
    expect(maxImportanceForZoom(MS_PER_DAY / 100, MS_PER_YEAR * 0.1)).toBe(9);
  });
});

describe("maxLanesForZoom", () => {
  it("allows more lanes when zoomed in", () => {
    expect(maxLanesForZoom(MS_PER_DAY, MS_PER_YEAR * 0.1)).toBeGreaterThan(
      maxLanesForZoom(MS_PER_DAY * 20, MS_PER_YEAR * 20),
    );
  });
});

describe("maxLanesForViewport", () => {
  it("returns at least one lane", () => {
    expect(maxLanesForViewport(200, 0.4)).toBeGreaterThanOrEqual(1);
  });

  it("increases lane budget with taller viewports", () => {
    expect(maxLanesForViewport(1200, 0.4)).toBeGreaterThan(maxLanesForViewport(400, 0.4));
  });
});
