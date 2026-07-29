import { describe, expect, it } from "vitest";

import { TIMELINE_EXTENT } from "./constants";
import { makePlottedEvent } from "@/test/fixtures/plotted-event";
import {
  canPanEarlier,
  canPanLater,
  clampZoomTransform,
  computeFitTransform,
  computePanTransform,
  computeTransformForTimeRange,
  computeZoomToEvents,
  computeZoomToDecade,
  computeZoomToYear,
  makeBaseScale,
  visibleInnerTimeRange,
  yearTimeRange,
} from "./zoom";

describe("makeBaseScale", () => {
  it("maps extent to inner width with margins", () => {
    const scale = makeBaseScale(1000, TIMELINE_EXTENT);
    expect(scale(TIMELINE_EXTENT[0])).toBeGreaterThan(0);
    expect(scale(TIMELINE_EXTENT[1])).toBeLessThan(1000);
  });
});

describe("computeFitTransform", () => {
  it("shows full extent at fit zoom", () => {
    const transform = computeFitTransform(1200, TIMELINE_EXTENT);
    const [t0, t1] = visibleInnerTimeRange(transform, 1200, TIMELINE_EXTENT);
    expect(t0).toBeCloseTo(TIMELINE_EXTENT[0], -6);
    expect(t1).toBeCloseTo(TIMELINE_EXTENT[1], -6);
  });
});

describe("yearTimeRange", () => {
  it("clamps years to timeline bounds", () => {
    const [start, end] = yearTimeRange(2000);
    expect(start).toBe(Date.parse("2000-01-01T00:00:00Z"));
    expect(end).toBe(Date.parse("2000-12-31T23:59:59.999Z"));
  });
});

describe("computeZoomToYear", () => {
  it("zooms to a single calendar year", () => {
    const transform = computeZoomToYear(1200, TIMELINE_EXTENT, 2000);
    const [t0, t1] = visibleInnerTimeRange(transform, 1200, TIMELINE_EXTENT);
    expect(t0).toBeGreaterThanOrEqual(TIMELINE_EXTENT[0]);
    expect(t1).toBeLessThanOrEqual(TIMELINE_EXTENT[1]);
    expect(t1 - t0).toBeLessThan(Date.parse("2001-01-01T00:00:00Z") - Date.parse("2000-01-01T00:00:00Z"));
  });
});

describe("computeZoomToDecade", () => {
  it("zooms to a calendar decade", () => {
    const transform = computeZoomToDecade(1200, TIMELINE_EXTENT, 1990);
    const [t0, t1] = visibleInnerTimeRange(transform, 1200, TIMELINE_EXTENT);
    expect(t0).toBeGreaterThanOrEqual(Date.parse("1990-01-01T00:00:00Z"));
    expect(t1).toBeLessThanOrEqual(Date.parse("1999-12-31T23:59:59.999Z"));
  });
});

describe("pan helpers", () => {
  const fit = computeFitTransform(1200, TIMELINE_EXTENT);

  it("detects when panning is possible", () => {
    const zoomed = computeZoomToYear(1200, TIMELINE_EXTENT, 2000);
    expect(canPanEarlier(zoomed, 1200, TIMELINE_EXTENT)).toBe(true);
    expect(canPanLater(zoomed, 1200, TIMELINE_EXTENT)).toBe(true);
    expect(canPanEarlier(fit, 1200, TIMELINE_EXTENT)).toBe(false);
    expect(canPanLater(fit, 1200, TIMELINE_EXTENT)).toBe(false);
  });

  it("pans visible window earlier or later", () => {
    const zoomed = computeZoomToYear(1200, TIMELINE_EXTENT, 2000);
    const [before0] = visibleInnerTimeRange(zoomed, 1200, TIMELINE_EXTENT);
    const earlier = computePanTransform(zoomed, 1200, TIMELINE_EXTENT, "earlier");
    const [after0] = visibleInnerTimeRange(earlier, 1200, TIMELINE_EXTENT);
    expect(after0).toBeLessThan(before0);
  });
});

describe("clampZoomTransform", () => {
  it("keeps visible range inside extent", () => {
    const overshoot = computeTransformForTimeRange(1200, TIMELINE_EXTENT, [
      TIMELINE_EXTENT[0] - 1_000_000_000,
      TIMELINE_EXTENT[1] + 1_000_000_000,
    ]);
    const clamped = clampZoomTransform(overshoot, 1200, TIMELINE_EXTENT);
    const [t0, t1] = visibleInnerTimeRange(clamped, 1200, TIMELINE_EXTENT);
    expect(t0).toBeGreaterThanOrEqual(TIMELINE_EXTENT[0]);
    expect(t1).toBeLessThanOrEqual(TIMELINE_EXTENT[1]);
  });
});

describe("computeZoomToEvents", () => {
  it("returns fit transform for empty targets", () => {
    const fit = computeFitTransform(1200, TIMELINE_EXTENT);
    const zoom = computeZoomToEvents(1200, TIMELINE_EXTENT, []);
    expect(zoom.k).toBeCloseTo(fit.k, 5);
  });

  it("zooms to plotted event timestamps", () => {
    const targets = [
      makePlottedEvent({ timestamp: Date.parse("2000-01-01T12:00:00Z") }),
      makePlottedEvent({ id: "b", timestamp: Date.parse("2000-06-01T12:00:00Z") }),
    ];
    const transform = computeZoomToEvents(1200, TIMELINE_EXTENT, targets, { tight: true });
    const [t0, t1] = visibleInnerTimeRange(transform, 1200, TIMELINE_EXTENT);
    expect(t0).toBeLessThanOrEqual(targets[0]!.timestamp);
    expect(t1).toBeGreaterThanOrEqual(targets[1]!.timestamp);
  });
});
