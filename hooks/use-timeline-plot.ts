import * as d3 from "d3";
import { useCallback, useEffect, useMemo, useState } from "react";

import { axisYAt } from "@/lib/timeline/axis-path";

import { TIMELINE_AXIS_Y_RATIO, TIMELINE_EDGE_MARGIN, TIMELINE_EXTENT } from "@/lib/timeline/constants";
import { visibleTimeSpanMs } from "@/lib/timeline/axis-ticks";
import { filterTimelineEvents, hasActiveFilters } from "@/lib/timeline/filters";
import { resolveDotLayout } from "@/lib/timeline/dot-layout";
import { desktopDotRadius } from "@/lib/timeline/dot-metrics";
import { resolveLabelLayout } from "@/lib/timeline/label-layout";
import { measureTimelineLabelWidth } from "@/lib/timeline/measure-label";
import { reorderLabelsForHover, sortVisibleLabelNodes } from "@/lib/timeline/plot-labels";
import { filterEventsInTimelineRange, toPlottedEvents, type PlottedEvent } from "@/lib/timeline/plot-data";
import { IMPORTANCE_MAX } from "@/lib/timeline/importance";
import { computeStemStarts } from "@/lib/timeline/stem-layout";
import { makeBaseScale } from "@/lib/timeline/zoom";
import { maxImportanceForZoom, maxLanesForViewport, maxLanesForZoom } from "@/lib/timeline/zoom-lod";
import type { TimelineEvent } from "@/lib/timeline/schema";

type UseTimelinePlotOptions = {
  events: TimelineEvent[];
  activeFilterIds: Set<string>;
  fulltextQuery: string;
  transform: d3.ZoomTransform;
  width: number;
  height: number;
  hovered: PlottedEvent | null;
};

export function useTimelinePlot({
  events,
  activeFilterIds,
  fulltextQuery,
  transform,
  width,
  height,
  hovered,
}: UseTimelinePlotOptions) {
  const filteredEvents = useMemo(
    () => filterTimelineEvents(filterEventsInTimelineRange(events), activeFilterIds, fulltextQuery),
    [activeFilterIds, events, fulltextQuery],
  );

  const plotted = useMemo(() => toPlottedEvents(filteredEvents), [filteredEvents]);

  const [fontEpoch, setFontEpoch] = useState(0);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    let cancelled = false;

    void document.fonts.ready.then(() => {
      if (!cancelled) {
        setFontEpoch((epoch) => epoch + 1);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const axisY = height * TIMELINE_AXIS_Y_RATIO;

  const getAxisY = useCallback((x: number) => axisYAt(x, axisY), [axisY]);

  const baseScale = useMemo(() => makeBaseScale(width, TIMELINE_EXTENT), [width]);

  const xScale = useMemo(() => transform.rescaleX(baseScale), [baseScale, transform]);

  const visibleSpanMs = useMemo(() => visibleTimeSpanMs(xScale, width), [width, xScale]);
  const msPerPixel = visibleSpanMs / Math.max(width, 1);

  const maxImportance = useMemo(() => {
    if (hasActiveFilters(activeFilterIds, fulltextQuery)) {
      return IMPORTANCE_MAX;
    }

    return maxImportanceForZoom(msPerPixel, visibleSpanMs);
  }, [activeFilterIds, fulltextQuery, msPerPixel, visibleSpanMs]);

  const maxLanes = useMemo(() => {
    const byZoom = maxLanesForZoom(msPerPixel, visibleSpanMs);
    const byViewport = maxLanesForViewport(height, TIMELINE_AXIS_Y_RATIO);

    return Math.min(byZoom, byViewport);
  }, [height, msPerPixel, visibleSpanMs]);

  const labelWidths = useMemo(() => {
    const widths = new Map<string, number>();
    for (const event of plotted) {
      widths.set(event.id, measureTimelineLabelWidth(event.bubbleTitle));
    }
    return widths;
  }, [fontEpoch, plotted]);

  const labelLayout = useMemo(
    () =>
      resolveLabelLayout(
        plotted,
        (timestamp) => xScale(timestamp),
        maxImportance,
        width,
        maxLanes,
        (event) => labelWidths.get(event.id) ?? measureTimelineLabelWidth(event.bubbleTitle),
        visibleSpanMs,
      ),
    [labelWidths, maxImportance, maxLanes, plotted, visibleSpanMs, width, xScale],
  );

  const forceVisibleDotIds = useMemo(() => {
    const ids = new Set<string>();
    if (hovered) {
      ids.add(hovered.id);
    }
    for (const event of plotted) {
      if (labelLayout.get(event.id)?.showLabel) {
        ids.add(event.id);
      }
    }
    return ids;
  }, [hovered, labelLayout, plotted]);

  const dotLayout = useMemo(
    () =>
      resolveDotLayout(
        plotted,
        (timestamp) => xScale(timestamp),
        maxImportance,
        TIMELINE_EDGE_MARGIN,
        width - TIMELINE_EDGE_MARGIN,
        (event) => desktopDotRadius(event.importance, false),
        { forceVisibleIds: forceVisibleDotIds },
      ),
    [forceVisibleDotIds, maxImportance, plotted, width, xScale],
  );

  const stemStartY = useMemo(
    () => computeStemStarts(plotted, labelLayout, (timestamp) => xScale(timestamp)),
    [labelLayout, plotted, xScale],
  );

  const labelNodes = useMemo(() => {
    const sorted = sortVisibleLabelNodes(plotted, labelLayout, (timestamp) => xScale(timestamp));
    return reorderLabelsForHover(sorted, hovered);
  }, [hovered, labelLayout, plotted, xScale]);

  return {
    filteredEvents,
    plotted,
    axisY,
    getAxisY,
    xScale,
    labelLayout,
    dotLayout,
    stemStartY,
    labelNodes,
  };
}
