import * as d3 from "d3";
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { TIMELINE_EXTENT } from "@/lib/timeline/constants";
import { computeFitTransformVertical } from "@/lib/timeline/vertical/zoom";
import { useTimelineViewActionsVertical } from "./use-timeline-view-actions-vertical";

describe("useTimelineViewActionsVertical", () => {
  it("resets filters and fits vertical timeline", () => {
    const animateTo = vi.fn();
    const transform = computeFitTransformVertical(800, TIMELINE_EXTENT);

    const { result } = renderHook(() =>
      useTimelineViewActionsVertical({
        height: 800,
        transform,
        plottedCount: 2,
        animateTo,
        updateFilters: vi.fn(),
        onResetFilters: vi.fn(),
      }),
    );

    act(() => {
      result.current.resetView();
    });

    expect(animateTo).toHaveBeenCalledTimes(1);
  });

  it("pans later when zoomed in", () => {
    const animateTo = vi.fn();
    const zoomed = d3.zoomIdentity.scale(20).translate(0, -1000);

    const { result } = renderHook(() =>
      useTimelineViewActionsVertical({
        height: 800,
        transform: zoomed,
        plottedCount: 2,
        animateTo,
        updateFilters: vi.fn(),
        onResetFilters: vi.fn(),
      }),
    );

    act(() => {
      result.current.panLater();
    });

    expect(animateTo).toHaveBeenCalledTimes(1);
  });
});
