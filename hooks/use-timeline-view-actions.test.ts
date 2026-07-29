import * as d3 from "d3";
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { TIMELINE_EXTENT } from "@/lib/timeline/constants";
import { computeFitTransform } from "@/lib/timeline/zoom";
import { useTimelineViewActions } from "./use-timeline-view-actions";

describe("useTimelineViewActions", () => {
  it("resets filters and fits timeline", () => {
    const animateTo = vi.fn();
    const updateFilters = vi.fn();
    const onResetFilters = vi.fn();
    const transform = computeFitTransform(1200, TIMELINE_EXTENT);

    const { result } = renderHook(() =>
      useTimelineViewActions({
        width: 1200,
        transform,
        plottedCount: 3,
        animateTo,
        updateFilters,
        onResetFilters,
      }),
    );

    act(() => {
      result.current.resetView();
    });

    expect(updateFilters).toHaveBeenCalledWith(new Set());
    expect(onResetFilters).toHaveBeenCalledTimes(1);
    expect(animateTo).toHaveBeenCalledTimes(1);
  });

  it("exposes pan availability based on transform", () => {
    const fit = computeFitTransform(1200, TIMELINE_EXTENT);
    const { result } = renderHook(() =>
      useTimelineViewActions({
        width: 1200,
        transform: fit,
        plottedCount: 1,
        animateTo: vi.fn(),
        updateFilters: vi.fn(),
        onResetFilters: vi.fn(),
      }),
    );

    expect(result.current.showPanEarlier).toBe(false);
    expect(result.current.showPanLater).toBe(false);
  });

  it("pans earlier when zoomed in", () => {
    const animateTo = vi.fn();
    const zoomed = d3.zoomIdentity.scale(20).translate(-1000, 0);

    const { result } = renderHook(() =>
      useTimelineViewActions({
        width: 1200,
        transform: zoomed,
        plottedCount: 1,
        animateTo,
        updateFilters: vi.fn(),
        onResetFilters: vi.fn(),
      }),
    );

    act(() => {
      result.current.panEarlier();
    });

    expect(animateTo).toHaveBeenCalledTimes(1);
  });
});
