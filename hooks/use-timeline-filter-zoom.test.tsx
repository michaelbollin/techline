import * as d3 from "d3";
import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { TIMELINE_EXTENT } from "@/lib/timeline/constants";
import { computeFitTransform } from "@/lib/timeline/zoom";
import { makePlottedEvent } from "@/test/fixtures/plotted-event";
import { useTimelineFilterZoom } from "./use-timeline-filter-zoom";

describe("useTimelineFilterZoom", () => {
  it("zooms to filtered events when filters are active", () => {
    const animateTo = vi.fn();
    const plotted = [makePlottedEvent({ timestamp: Date.parse("2000-01-01T12:00:00Z") })];

    renderHook(() =>
      useTimelineFilterZoom({
        width: 1200,
        plotted,
        activeFilterIds: new Set(["web"]),
        fulltextQuery: "",
        animateTo,
      }),
    );

    expect(animateTo).toHaveBeenCalledTimes(1);
  });

  it("does not animate before initialization without filters", () => {
    const animateTo = vi.fn();

    renderHook(() =>
      useTimelineFilterZoom({
        width: 1200,
        plotted: [makePlottedEvent()],
        activeFilterIds: new Set(),
        fulltextQuery: "",
        animateTo,
      }),
    );

    expect(animateTo).not.toHaveBeenCalled();
  });

  it("restores fit transform after clearing filters", () => {
    const animateTo = vi.fn();
    const plotted = [makePlottedEvent()];

    const { rerender } = renderHook(
      (props) => useTimelineFilterZoom(props),
      {
        initialProps: {
          width: 1200,
          plotted,
          activeFilterIds: new Set(["web"]),
          fulltextQuery: "",
          animateTo,
        },
      },
    );

    animateTo.mockClear();

    rerender({
      width: 1200,
      plotted,
      activeFilterIds: new Set(),
      fulltextQuery: "",
      animateTo,
    });

    expect(animateTo).toHaveBeenCalledTimes(1);
    const transform = animateTo.mock.calls[0]![0] as d3.ZoomTransform;
    const fit = computeFitTransform(1200, TIMELINE_EXTENT);
    expect(transform.k).toBeCloseTo(fit.k, 5);
  });
});
