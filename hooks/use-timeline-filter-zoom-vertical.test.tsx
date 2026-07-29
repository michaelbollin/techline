import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { makePlottedEvent } from "@/test/fixtures/plotted-event";
import { useTimelineFilterZoomVertical } from "./use-timeline-filter-zoom-vertical";

describe("useTimelineFilterZoomVertical", () => {
  it("zooms to filtered events when filters are active", () => {
    const animateTo = vi.fn();

    renderHook(() =>
      useTimelineFilterZoomVertical({
        height: 800,
        plotted: [makePlottedEvent()],
        activeFilterIds: new Set(["ai"]),
        fulltextQuery: "",
        animateTo,
      }),
    );

    expect(animateTo).toHaveBeenCalledTimes(1);
  });
});
