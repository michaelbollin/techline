"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useContainerSize } from "@/hooks/use-container-size";
import { useTimelineFilters } from "@/hooks/use-timeline-filters";
import { useTimelineFilterZoom } from "@/hooks/use-timeline-filter-zoom";
import { useTimelinePlot } from "@/hooks/use-timeline-plot";
import { useTimelineViewActions } from "@/hooks/use-timeline-view-actions";
import { useTimelineZoom } from "@/hooks/use-timeline-zoom";
import {
  TIMELINE_EVENT_DETAIL_OFFSET,
  TIMELINE_INK,
} from "@/lib/timeline/constants";
import { buildAxisPath } from "@/lib/timeline/axis-path";
import { eventPath } from "@/lib/timeline/format";
import type { PlottedEvent } from "@/lib/timeline/plot-data";
import type { TimelineEvent } from "@/lib/timeline/schema";

import { TimelinePanArrows } from "./timeline-pan-arrows";
import { TimelineAxisGrid } from "./timeline-axis-grid";
import { TimelineEventDetail } from "./timeline-event-detail";
import { TimelineFilters } from "./timeline-filters";
import { TimelineNodeDot } from "./timeline-node-dot";
import { TimelineNodeLabel } from "./timeline-node-label";
import { TimelineNodeStem } from "./timeline-node-stem";

type ModernTimelineProps = {
  events: TimelineEvent[];
  /** URL filter segment, e.g. `javascript,web` — empty on `/`. */
  filterPathKey?: string;
};

export function ModernTimeline({ events, filterPathKey = "" }: ModernTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const { width, height } = useContainerSize(containerRef);
  const router = useRouter();

  const { activeFilterIds, updateFilters, setDeferUrlSync } = useTimelineFilters(filterPathKey);
  const [hovered, setHovered] = useState<PlottedEvent | null>(null);
  const [fulltextQuery, setFulltextQuery] = useState("");
  const [filterResetNonce, setFilterResetNonce] = useState(0);

  const clearLocalFilters = useCallback(() => {
    setFulltextQuery("");
    setFilterResetNonce((nonce) => nonce + 1);
  }, []);

  const { transform, animateTo } = useTimelineZoom({
    width,
    height,
    svgRef,
  });

  const plot = useTimelinePlot({
    events,
    activeFilterIds,
    fulltextQuery,
    transform,
    width,
    height,
    hovered,
  });

  const { filteredEvents, plotted, axisY, getAxisY, xScale, labelLayout, stemStartY, labelNodes } =
    plot;

  useTimelineFilterZoom({
    width,
    plotted,
    activeFilterIds,
    fulltextQuery,
    animateTo,
  });

  const { resetView, zoomToYear, panEarlier, panLater, showPanEarlier, showPanLater } =
    useTimelineViewActions({
      width,
      transform,
      plottedCount: plotted.length,
      animateTo,
      updateFilters,
      onResetFilters: clearLocalFilters,
    });

  const axisPath = useMemo(() => buildAxisPath(width, axisY), [axisY, width]);
  const detailTop = axisY + TIMELINE_EVENT_DETAIL_OFFSET;

  useEffect(() => {
    if (hovered && !filteredEvents.some((event) => event.id === hovered.id)) {
      setHovered(null);
    }
  }, [filteredEvents, hovered]);

  const openEvent = (event: PlottedEvent) => {
    router.push(eventPath(event.slug, { filterPathKey }));
  };

  return (
    <section aria-label="Interactive timeline" className="modern-timeline relative h-full w-full bg-white">
      <div ref={containerRef} className="relative h-full w-full">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 px-6 py-5 sm:px-8">
          <div className="pointer-events-auto flex items-start justify-between gap-6">
            <Link
              href="/"
              className="timeline-brand shrink-0 text-sm tracking-[0.2em] text-black uppercase"
            >
              Techline
            </Link>
            <TimelineFilters
              events={events}
              activeFilterIds={activeFilterIds}
              onChange={updateFilters}
              onReset={resetView}
              onFulltextChange={setFulltextQuery}
              fulltextQuery={fulltextQuery}
              resetNonce={filterResetNonce}
              onThemeMenuOpenChange={setDeferUrlSync}
            />
          </div>
        </div>

        {plotted.length === 0 && (
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6">
            <p className="timeline-empty-filter rounded-full border border-black bg-white px-5 py-2.5 text-sm text-black">
              No events match the selected filters.
            </p>
          </div>
        )}

        {width > 0 && height > 0 && (
          <svg
            ref={svgRef}
            width={width}
            height={height}
            className="block touch-none select-none bg-white"
            onPointerLeave={() => setHovered(null)}
          >
            <g>
              <TimelineAxisGrid
                xScale={xScale}
                width={width}
                getAxisY={getAxisY}
                onYearClick={zoomToYear}
              />

              <path d={axisPath} fill="none" stroke={TIMELINE_INK} strokeWidth={1.5} />

              <g className="timeline-stems" pointerEvents="none">
                {labelNodes.map((event) => {
                  const layout = labelLayout.get(event.id)!;

                  return (
                    <TimelineNodeStem
                      key={`stem-${event.id}`}
                      event={event}
                      xScale={xScale}
                      getAxisY={getAxisY}
                      layout={layout}
                      stemStartY={stemStartY.get(event.id) ?? 0}
                    />
                  );
                })}
              </g>

              <g className="timeline-dots">
                {plotted.map((event) => (
                  <TimelineNodeDot
                    key={`dot-${event.id}`}
                    event={event}
                    xScale={xScale}
                    getAxisY={getAxisY}
                    showLabel={labelLayout.get(event.id)?.showLabel ?? false}
                    isHovered={hovered?.id === event.id}
                    onHover={setHovered}
                    onClick={() => openEvent(event)}
                  />
                ))}
              </g>

              <g className="timeline-labels">
                {labelNodes.map((event) => (
                  <TimelineNodeLabel
                    key={`label-${event.id}`}
                    event={event}
                    xScale={xScale}
                    getAxisY={getAxisY}
                    layout={labelLayout.get(event.id)!}
                    viewportWidth={width}
                    isHovered={hovered?.id === event.id}
                    onHover={setHovered}
                    onClick={() => openEvent(event)}
                  />
                ))}
              </g>
            </g>
          </svg>
        )}

        {hovered && width > 0 && (
          <TimelineEventDetail event={hovered} top={detailTop} />
        )}

        <TimelinePanArrows
          canPanEarlier={showPanEarlier}
          canPanLater={showPanLater}
          onPanEarlier={panEarlier}
          onPanLater={panLater}
        />
      </div>
    </section>
  );
}
