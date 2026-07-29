import * as d3 from "d3";
import { describe, expect, it } from "vitest";

import { TIMELINE_EXTENT } from "./constants";
import {
  axisTickInterval,
  axisTicks,
  formatAxisTick,
  isYearZoomTick,
  visibleTimeSpanMs,
} from "./axis-ticks";

describe("visibleTimeSpanMs", () => {
  it("returns span for rescaled time axis", () => {
    const base = d3.scaleTime().domain(TIMELINE_EXTENT).range([0, 1000]);
    const span = visibleTimeSpanMs(base, 1000);
    expect(span).toBeCloseTo(TIMELINE_EXTENT[1] - TIMELINE_EXTENT[0], -6);
  });
});

describe("axisTickInterval", () => {
  const msPerYear = 365.25 * 86_400_000;

  it("uses year ticks when zoomed out", () => {
    expect(axisTickInterval(msPerYear * 5)).toBe("year");
  });

  it("uses month ticks when zoomed in", () => {
    expect(axisTickInterval(msPerYear * 0.5)).toBe("month");
  });
});

describe("axisTicks", () => {
  it("returns thinned year ticks when zoomed out", () => {
    const base = d3.scaleTime().domain(TIMELINE_EXTENT).range([0, 800]);
    const ticks = axisTicks(base, 800);
    expect(ticks.length).toBeGreaterThan(0);
    expect(ticks.every((tick) => tick instanceof Date)).toBe(true);
  });
});

describe("formatAxisTick", () => {
  it("formats year ticks as calendar year", () => {
    const date = new Date(Date.UTC(2000, 0, 1));
    expect(formatAxisTick(date, "year")).toBe("2000");
  });

  it("includes year on first month tick of a year", () => {
    const jan = new Date(Date.UTC(2000, 0, 1));
    expect(formatAxisTick(jan, "month")).toBe("Jan 2000");
  });

  it("omits year for subsequent months in same year", () => {
    const jan = new Date(Date.UTC(2000, 0, 1));
    const feb = new Date(Date.UTC(2000, 1, 1));
    expect(formatAxisTick(feb, "month", jan)).toBe("Feb");
  });
});

describe("isYearZoomTick", () => {
  it("is true only for year interval", () => {
    expect(isYearZoomTick(new Date(), "year")).toBe(true);
    expect(isYearZoomTick(new Date(), "month")).toBe(false);
  });
});
