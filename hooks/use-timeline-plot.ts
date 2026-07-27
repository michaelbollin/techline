import * as d3 from "d3";
import { useMemo } from "react";

import { TIMELINE_AXIS_Y_RATIO, TIMELINE_EDGE_MARGIN, TIMELINE_EXTENT, TIMELINE_TOOLTIP_EDGE_INSET } from "@/lib/timeline/constants";
import { filterTimelineEvents } from "@/lib/timeline/filters";
import { resolveLabelLayout, labelTopLocalY } from "@/lib/timeline/label-layout";
import { measureLabelWidth } from "@/lib/timeline/measure-label";
import { filterEventsInTimelineRange, toPlottedEvents, type PlottedEvent } from "@/lib/timeline/plot-data";
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
    const t0 = xScale.invert(0).getTime();
    const t1 = xScale.invert(width).getTime();
    return Math.abs(t1 - t0) / Math.max(width, 1);
  }, [width, xScale]);

  const maxImportance = useMemo(() => maxImportanceForZoom(msPerPixel), [msPerPixel]);
  const maxLanes = useMemo(() => maxLanesForZoom(msPerPixel), [msPerPixel]);

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
      ),
    [labelWidths, maxImportance, maxLanes, plotted, width, xScale],
  );

  const stemStartY = useMemo(
    () => computeStemStarts(plotted, labelLayout, (timestamp) => xScale(timestamp)),
    [labelLayout, plotted, xScale],
  );

  const labelNodes = useMemo(() => {
    const visible = plotted.filter((event) => labelLayout.get(event.id)?.showLabel);
    return [...visible].sort((a, b) => {
      const laneA = labelLayout.get(a.id)?.lane ?? 0;
      const laneB = labelLayout.get(b.id)?.lane ?? 0;
      if (laneA !== laneB) {
        return laneA - laneB;
      }

      return xScale(a.timestamp) - xScale(b.timestamp);
    });
  }, [labelLayout, plotted, xScale]);

  const tooltipAnchor = useMemo(() => {
    if (!hovered || width <= 0) {
      return null;
    }

    const x = xScale(hovered.timestamp);
    const lane = labelLayout.get(hovered.id)?.lane ?? 0;
    const labelVisible = labelLayout.get(hovered.id)?.showLabel ?? false;
    const labelTop = axisY + labelTopLocalY(lane);

    return {
      x: Math.min(Math.max(x, TIMELINE_TOOLTIP_EDGE_INSET), width - TIMELINE_TOOLTIP_EDGE_INSET),
      y: labelVisible ? labelTop - 12 : axisY - 72,
    };
  }, [axisY, hovered, labelLayout, width, xScale]);

  return {
    filteredEvents,
    plotted,
    axisY,
    xScale,
    labelLayout,
    labelWidths,
    stemStartY,
    labelNodes,
    tooltipAnchor,
  };
}
