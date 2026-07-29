import { describe, expect, it } from "vitest";

import { TIMELINE_EXTENT } from "@/lib/timeline/constants";
import {
  computeFitTransformVertical,
  computeZoomToYearVertical,
  visibleInnerTimeRangeVertical,
} from "./zoom";

describe("vertical zoom", () => {
  it("fits full extent vertically", () => {
    const transform = computeFitTransformVertical(800, TIMELINE_EXTENT);
    const [t0, t1] = visibleInnerTimeRangeVertical(transform, 800, TIMELINE_EXTENT);
    expect(t0).toBeCloseTo(TIMELINE_EXTENT[0], -6);
    expect(t1).toBeCloseTo(TIMELINE_EXTENT[1], -6);
  });

  it("zooms to a year vertically", () => {
    const transform = computeZoomToYearVertical(800, TIMELINE_EXTENT, 2000);
    const [t0, t1] = visibleInnerTimeRangeVertical(transform, 800, TIMELINE_EXTENT);
    expect(t1 - t0).toBeLessThan(Date.parse("2001-01-01T00:00:00Z") - Date.parse("2000-01-01T00:00:00Z"));
  });
});
