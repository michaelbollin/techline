import * as d3 from "d3";
import { useMemo } from "react";

import { TIMELINE_AXIS_Y_RATIO, TIMELINE_EDGE_MARGIN, TIMELINE_EXTENT } from "@/lib/timeline/constants";
import { filterTimelineEvents } from "@/lib/timeline/filters";
import { resolveLabelLayout } from "@/lib/timeline/label-layout";
import { measureLabelWidth } from "@/lib/timeline/measure-label";
import { filterEventsInTimelineRange, toPlottedEvents, type PlottedEvent } from "@/lib/timeline/plot-data";
import { visibleTimeSpanMs } from "@/lib/timeline/axis-ticks";
import { computeStemStarts } from "@/lib/timeline/stem-layout";
import { maxImportanceForZoom, maxLanesForZoom } from "@/lib/timeline/zoom-lod";
import type { TimelineEvent } from "@/lib/timeline/schema";

type UseTimelinePlotOptions = {
  events: TimelineEvent[];
  activeFilterIds: Set<string>;
  transform: d3.ZoomTransform;
  width: number;
  height: number;
  hovered: PlottedEvent | null;
};

export function useTimelinePlot({
  events,
  activeFilterIds,
  transform,
  width,
  height,
  hovered,
}: UseTimelinePlotOptions) {
  const filteredEvents = useMemo(
    () => filterTimelineEvents(filterEventsInTimelineRange(events), activeFilterIds),
    [activeFilterIds, events],
  );

  const plotted = useMemo(() => toPlottedEvents(filteredEvents), [filteredEvents]);

  const axisY = height * TIMELINE_AXIS_Y_RATIO;

  const baseScale = useMemo(() => {
    const margin = TIMELINE_EDGE_MARGIN;
    const innerWidth = Math.max(width - margin * 2, 1);
    return d3.scaleTime().domain(TIMELINE_EXTENT).range([margin, margin + innerWidth]);
  }, [width]);

  const xScale = useMemo(() => transform.rescaleX(baseScale), [baseScale, transform]);

  const msPerPixel = useMemo(() => {
    const span = visibleTimeSpanMs(xScale, width);
    return span / Math.max(width, 1);
  }, [width, xScale]);

  const visibleSpanMs = useMemo(() => visibleTimeSpanMs(xScale, width), [width, xScale]);

  const maxImportance = useMemo(() => maxImportanceForZoom(msPerPixel), [msPerPixel]);
  const maxLanes = useMemo(
    () => maxLanesForZoom(msPerPixel, visibleSpanMs),
    [msPerPixel, visibleSpanMs],
  );

  const labelWidths = useMemo(() => {
    const widths = new Map<string, number>();
    for (const event of plotted) {
      widths.set(event.id, measureLabelWidth(event.title));
    }
    return widths;
  }, [plotted]);

  const labelLayout = useMemo(
    () =>
      resolveLabelLayout(
        plotted,
        (timestamp) => xScale(timestamp),
        maxImportance,
        width,
        maxLanes,
        (event) => labelWidths.get(event.id) ?? measureLabelWidth(event.title),
        visibleSpanMs,
      ),
    [labelWidths, maxImportance, maxLanes, plotted, visibleSpanMs, width, xScale],
  );

  const stemStartY = useMemo(
    () => computeStemStarts(plotted, labelLayout, (timestamp) => xScale(timestamp)),
    [labelLayout, plotted, xScale],
  );

  const labelNodes = useMemo(() => {
    const visible = plotted.filter((event) => labelLayout.get(event.id)?.showLabel);
    const sorted = [...visible].sort((a, b) => {
      const laneA = labelLayout.get(a.id)?.lane ?? 0;
      const laneB = labelLayout.get(b.id)?.lane ?? 0;
      if (laneA !== laneB) {
        return laneA - laneB;
      }

      return xScale(a.timestamp) - xScale(b.timestamp);
    });

    if (!hovered) {
      return sorted;
    }

    const hoveredIndex = sorted.findIndex((event) => event.id === hovered.id);
    if (hoveredIndex === -1) {
      return sorted;
    }

    const hoveredEvent = sorted[hoveredIndex]!;
    return [...sorted.slice(0, hoveredIndex), ...sorted.slice(hoveredIndex + 1), hoveredEvent];
  }, [hovered, labelLayout, plotted, xScale]);

  return {
    filteredEvents,
    plotted,
    axisY,
    xScale,
    labelLayout,
    labelWidths,
    stemStartY,
    labelNodes,
  };
}
