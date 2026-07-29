import * as d3 from "d3";
import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TIMELINE_EXTENT } from "@/lib/timeline/constants";
import { computeFitTransformVertical } from "@/lib/timeline/vertical/zoom";
import { makePlottedEvent } from "@/test/fixtures/plotted-event";
import { makeTimelineEvent } from "@/test/fixtures/timeline-event";
import { useMobileTimelinePlot } from "./use-mobile-timeline-plot";

describe("useMobileTimelinePlot", () => {
  const width = 390;
  const height = 800;
  const transform = computeFitTransformVertical(height, TIMELINE_EXTENT);

  it("filters events and builds vertical plot geometry", () => {
    const events = [
      makeTimelineEvent({ id: "a", tags: ["web"] }),
      makeTimelineEvent({ id: "b", tags: ["ai"] }),
    ];

    const { result } = renderHook(() =>
      useMobileTimelinePlot({
        events,
        activeFilterIds: new Set(["web"]),
        fulltextQuery: "",
        transform,
        width,
        height,
        hovered: null,
      }),
    );

    expect(result.current.filteredEvents).toHaveLength(1);
    expect(result.current.plotted).toHaveLength(1);
    expect(result.current.axisX).toBeTypeOf("number");
    expect(result.current.yScale(new Date("2000-01-15"))).toBeTypeOf("number");
    expect(result.current.labelLayout.get("a")).toBeDefined();
  });

  it("promotes hovered label to the front", () => {
    const events = [
      makeTimelineEvent({ id: "first", tags: ["web"], importance: 0 }),
      makeTimelineEvent({ id: "second", date: "2005-06-01", tags: ["web"], importance: 0 }),
    ];
    const hovered = makePlottedEvent({ id: "second" });

    const { result } = renderHook(() =>
      useMobileTimelinePlot({
        events,
        activeFilterIds: new Set(["web"]),
        fulltextQuery: "",
        transform,
        width,
        height,
        hovered,
      }),
    );

    expect(result.current.labelNodes.length).toBeGreaterThan(0);
    expect(result.current.labelNodes.at(-1)?.id).toBe("second");
  });
});
