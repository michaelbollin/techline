import * as d3 from "d3";
import { useCallback, useEffect, useMemo, useState } from "react";

import { axisXAt } from "@/lib/timeline/vertical/axis-path";
import { MOBILE_TIMELINE_AXIS_X } from "@/lib/timeline/vertical/constants";
import { resolveVerticalLabelLayout } from "@/lib/timeline/vertical/label-layout";
import { computeVerticalStemStarts } from "@/lib/timeline/vertical/stem-layout";
import {
  maxImportanceForZoom,
  maxLanesForViewportVertical,
  maxLanesForZoom,
} from "@/lib/timeline/vertical/zoom-lod";
import { makeBaseScaleVertical } from "@/lib/timeline/vertical/zoom";
import { TIMELINE_EXTENT } from "@/lib/timeline/constants";
import { visibleTimeSpanMs } from "@/lib/timeline/axis-ticks";
import { filterTimelineEvents, hasActiveFilters } from "@/lib/timeline/filters";
import { measureMobileLabelWidth } from "@/lib/timeline/vertical/label-metrics";
import { reorderLabelsForHover, sortVisibleLabelNodes } from "@/lib/timeline/plot-labels";
import { filterEventsInTimelineRange, toPlottedEvents, type PlottedEvent } from "@/lib/timeline/plot-data";
import { IMPORTANCE_MAX } from "@/lib/timeline/importance";
import type { TimelineEvent } from "@/lib/timeline/schema";

type UseMobileTimelinePlotOptions = {
  events: TimelineEvent[];
  activeFilterIds: Set<string>;
  fulltextQuery: string;
  transform: d3.ZoomTransform;
  width: number;
  height: number;
  hovered: PlottedEvent | null;
};

export function useMobileTimelinePlot({
  events,
  activeFilterIds,
  fulltextQuery,
  transform,
  width,
  height,
  hovered,
}: UseMobileTimelinePlotOptions) {
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

  const axisX = MOBILE_TIMELINE_AXIS_X;

  const getAxisX = useCallback((y: number) => axisXAt(y, axisX), [axisX]);

  const baseScale = useMemo(() => makeBaseScaleVertical(height, TIMELINE_EXTENT), [height]);

  const yScale = useMemo(() => transform.rescaleY(baseScale), [baseScale, transform]);

  const visibleSpanMs = useMemo(() => visibleTimeSpanMs(yScale, height), [height, yScale]);

  const msPerPixel = visibleSpanMs / Math.max(height, 1);

  const maxImportance = useMemo(() => {
    if (hasActiveFilters(activeFilterIds, fulltextQuery)) {
      return IMPORTANCE_MAX;
    }

    return maxImportanceForZoom(msPerPixel, visibleSpanMs);
  }, [activeFilterIds, fulltextQuery, msPerPixel, visibleSpanMs]);

  const maxLanes = useMemo(() => {
    const byZoom = maxLanesForZoom(msPerPixel, visibleSpanMs);
    const byViewport = maxLanesForViewportVertical(width);

    return Math.min(byZoom, byViewport);
  }, [msPerPixel, visibleSpanMs, width]);

  const labelWidths = useMemo(() => {
    const widths = new Map<string, number>();
    for (const event of plotted) {
      widths.set(event.id, measureMobileLabelWidth(event.title));
    }
    return widths;
  }, [fontEpoch, plotted]);

  const labelLayout = useMemo(
    () =>
      resolveVerticalLabelLayout(
        plotted,
        (timestamp) => yScale(new Date(timestamp)),
        axisX,
        maxImportance,
        width,
        maxLanes,
        (event) => labelWidths.get(event.id) ?? measureMobileLabelWidth(event.title),
        visibleSpanMs,
      ),
    [axisX, labelWidths, maxImportance, maxLanes, plotted, visibleSpanMs, width, yScale],
  );

  const stemStartX = useMemo(
    () => computeVerticalStemStarts(plotted, labelLayout, (timestamp) => yScale(new Date(timestamp))),
    [labelLayout, plotted, yScale],
  );

  const labelNodes = useMemo(() => {
    const sorted = sortVisibleLabelNodes(plotted, labelLayout, (timestamp) =>
      yScale(new Date(timestamp)),
    );
    return reorderLabelsForHover(sorted, hovered);
  }, [hovered, labelLayout, plotted, yScale]);

  return {
    filteredEvents,
    plotted,
    axisX,
    getAxisX,
    yScale,
    labelLayout,
    stemStartX,
    labelNodes,
  };
}
