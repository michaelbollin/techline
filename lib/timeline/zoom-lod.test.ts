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

  it("returns expected lane budgets across zoom levels", () => {
    expect(maxLanesForZoom(MS_PER_DAY, MS_PER_YEAR * 0.1)).toBe(6);
    expect(maxLanesForZoom(MS_PER_DAY, MS_PER_YEAR * 0.3)).toBe(5);
    expect(maxLanesForZoom(MS_PER_DAY, MS_PER_YEAR * 0.8)).toBe(4);
    expect(maxLanesForZoom(MS_PER_DAY, MS_PER_YEAR * 2)).toBe(4);
    expect(maxLanesForZoom(MS_PER_DAY, MS_PER_YEAR * 5)).toBe(3);
    expect(maxLanesForZoom(MS_PER_DAY * 20, MS_PER_YEAR * 20)).toBe(2);
  });
});

describe("maxImportanceForZoom span caps", () => {
  it("caps importance when viewing multi-year spans", () => {
    expect(maxImportanceForZoom(MS_PER_DAY / 100, MS_PER_YEAR * 10)).toBeLessThanOrEqual(1);
    expect(maxImportanceForZoom(MS_PER_DAY / 100, MS_PER_YEAR * 5)).toBeLessThanOrEqual(3);
    expect(maxImportanceForZoom(MS_PER_DAY / 100, MS_PER_YEAR * 2)).toBeLessThanOrEqual(6);
  });

  it("walks through intermediate ms-per-pixel tiers", () => {
    expect(maxImportanceForZoom(MS_PER_DAY * 30, MS_PER_YEAR)).toBe(1);
    expect(maxImportanceForZoom(MS_PER_DAY * 10, MS_PER_YEAR)).toBe(2);
    expect(maxImportanceForZoom(MS_PER_DAY * 5, MS_PER_YEAR)).toBe(3);
    expect(maxImportanceForZoom(MS_PER_DAY * 3, MS_PER_YEAR)).toBe(4);
    expect(maxImportanceForZoom(MS_PER_DAY * 1.5, MS_PER_YEAR)).toBe(5);
    expect(maxImportanceForZoom(MS_PER_DAY * 0.8, MS_PER_YEAR)).toBe(6);
    expect(maxImportanceForZoom(MS_PER_DAY / 8, MS_PER_YEAR)).toBe(7);
    expect(maxImportanceForZoom(MS_PER_DAY / 24, MS_PER_YEAR)).toBe(8);
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
