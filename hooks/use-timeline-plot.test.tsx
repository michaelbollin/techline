import * as d3 from "d3";
import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TIMELINE_EXTENT } from "@/lib/timeline/constants";
import { computeFitTransform } from "@/lib/timeline/zoom";
import { makePlottedEvent } from "@/test/fixtures/plotted-event";
import { makeTimelineEvent } from "@/test/fixtures/timeline-event";
import { useTimelinePlot } from "./use-timeline-plot";

describe("useTimelinePlot", () => {
  const width = 1200;
  const height = 800;
  const transform = computeFitTransform(width, TIMELINE_EXTENT);

  it("filters events and builds plot geometry", () => {
    const events = [
      makeTimelineEvent({ id: "a", tags: ["web"] }),
      makeTimelineEvent({ id: "b", tags: ["ai"] }),
    ];

    const { result } = renderHook(() =>
      useTimelinePlot({
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
    expect(result.current.filteredEvents[0]?.id).toBe("a");
    expect(result.current.plotted).toHaveLength(1);
    expect(result.current.axisY).toBe(height * 0.4);
    expect(result.current.xScale(Date.parse("2000-01-15T12:00:00Z"))).toBeTypeOf("number");
    expect(result.current.labelLayout.get("a")?.showLabel).toBeTypeOf("boolean");
  });

  it("promotes hovered label to the front", () => {
    const events = [
      makeTimelineEvent({ id: "first", title: "First", importance: 9 }),
      makeTimelineEvent({
        id: "second",
        title: "Second",
        date: "2000-02-01",
        importance: 9,
      }),
    ];
    const hovered = makePlottedEvent({ id: "second", title: "Second" });

    const { result } = renderHook(() =>
      useTimelinePlot({
        events,
        activeFilterIds: new Set(),
        fulltextQuery: "",
        transform,
        width,
        height,
        hovered,
      }),
    );

    expect(result.current.labelNodes.at(-1)?.id).toBe("second");
  });

  it("shows all importance tiers when filters are active", () => {
    const events = [makeTimelineEvent({ importance: 9 })];

    const { result } = renderHook(() =>
      useTimelinePlot({
        events,
        activeFilterIds: new Set(["web"]),
        fulltextQuery: "",
        transform: d3.zoomIdentity.scale(0.001).translate(0, 0),
        width,
        height,
        hovered: null,
      }),
    );

    expect(result.current.plotted).toHaveLength(1);
    expect(result.current.labelLayout.size).toBeGreaterThanOrEqual(0);
  });
});
