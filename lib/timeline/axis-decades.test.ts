import { describe, expect, it } from "vitest";

import {
  DECADE_BAND_GRADIENT_OPACITY_END,
  DECADE_BAND_GRADIENT_OPACITY_START,
  formatDecadeLabel,
  decadeStartsInRange,
  shouldShowDecadeBands,
} from "./axis-decades";
import { MS_PER_YEAR } from "./axis-ticks";

describe("formatDecadeLabel", () => {
  it("formats short decade labels", () => {
    expect(formatDecadeLabel(1930)).toBe("30s");
    expect(formatDecadeLabel(1990)).toBe("90s");
    expect(formatDecadeLabel(2000)).toBe("0s");
  });
});

describe("decadeStartsInRange", () => {
  it("returns decade starts within a year range", () => {
    expect(decadeStartsInRange(1936, 1942)).toEqual([1930, 1940]);
  });
});

describe("shouldShowDecadeBands", () => {
  it("shows only for year ticks with enough span", () => {
    expect(shouldShowDecadeBands(MS_PER_YEAR * 5, "year")).toBe(true);
    expect(shouldShowDecadeBands(MS_PER_YEAR, "year")).toBe(false);
    expect(shouldShowDecadeBands(MS_PER_YEAR * 5, "month")).toBe(false);
  });
});

describe("decade band gradient", () => {
  it("uses a shared light-to-medium horizontal ramp", () => {
    expect(DECADE_BAND_GRADIENT_OPACITY_START).toBeLessThan(DECADE_BAND_GRADIENT_OPACITY_END);
  });
});
