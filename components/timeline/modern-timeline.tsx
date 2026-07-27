"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { useContainerSize } from "@/hooks/use-container-size";
import { useTimelineFilters } from "@/hooks/use-timeline-filters";
import { useTimelinePlot } from "@/hooks/use-timeline-plot";
import { useTimelineZoom } from "@/hooks/use-timeline-zoom";
import {
  TIMELINE_EVENT_DETAIL_OFFSET,
  TIMELINE_EXTENT,
  TIMELINE_INK,
} from "@/lib/timeline/constants";
import { eventPath } from "@/lib/timeline/format";
import type { PlottedEvent } from "@/lib/timeline/plot-data";
import type { TimelineEvent } from "@/lib/timeline/schema";
import { computeFitTransform, computeZoomToYear } from "@/lib/timeline/zoom";

import { TimelineControls, zoomInTransform, zoomOutTransform } from "./timeline-controls";
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
  const hasInitialized = useRef(false);
  const { width, height } = useContainerSize(containerRef);
  const router = useRouter();

  const { activeFilterIds, updateFilters } = useTimelineFilters(filterPathKey);
  const [hovered, setHovered] = useState<PlottedEvent | null>(null);

  const { transform, animateTo } = useTimelineZoom({
    width,
    height,
    svgRef,
  });

  const { filteredEvents, plotted, axisY, xScale, labelLayout, stemStartY, labelNodes } =
    useTimelinePlot({
      events,
      activeFilterIds,
      transform,
      width,
      height,
      hovered,
    });

  const detailTop = axisY + TIMELINE_EVENT_DETAIL_OFFSET;

  useEffect(() => {
    if (hovered && !filteredEvents.some((event) => event.id === hovered.id)) {
      setHovered(null);
    }
  }, [filteredEvents, hovered]);

  const fitAll = useCallback(() => {
    if (width <= 0 || plotted.length === 0) {
      return;
    }
    animateTo(computeFitTransform(width, TIMELINE_EXTENT));
  }, [animateTo, plotted.length, width]);

  useEffect(() => {
    if (!hasInitialized.current) {
      if (width > 0 && plotted.length > 0) {
        hasInitialized.current = true;
      }
      return;
    }

    if (width <= 0 || plotted.length === 0) {
      return;
    }

    animateTo(computeFitTransform(width, TIMELINE_EXTENT));
  }, [animateTo, filterPathKey, plotted.length, width]);

  const openEvent = (event: PlottedEvent) => {
    router.push(eventPath(event.slug, { filterPathKey }));
  };

  const zoomToYear = useCallback(
    (year: number) => {
      if (width <= 0) {
        return;
      }
      animateTo(computeZoomToYear(width, TIMELINE_EXTENT, year));
    },
    [animateTo, width],
  );

  return (
    <section aria-label="Interactive timeline" className="modern-timeline relative h-full w-full bg-white">
      <div ref={containerRef} className="relative h-full w-full">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 px-6 py-5 sm:px-8">
          <div className="pointer-events-auto flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="/"
              className="timeline-brand text-sm tracking-[0.2em] text-black uppercase"
            >
              Techline
            </Link>
            <TimelineFilters
              events={events}
              activeFilterIds={activeFilterIds}
              onChange={updateFilters}
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
                axisY={axisY}
                onYearClick={zoomToYear}
              />

              <line x1={0} x2={width} y1={axisY} y2={axisY} stroke={TIMELINE_INK} strokeWidth={1.5} />

              <g className="timeline-stems" pointerEvents="none">
                {labelNodes.map((event) => {
                  const layout = labelLayout.get(event.id)!;

                  return (
                    <TimelineNodeStem
                      key={`stem-${event.id}`}
                      event={event}
                      xScale={xScale}
                      axisY={axisY}
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
                    axisY={axisY}
                    isHovered={hovered?.id === event.id}
                    isLandmark={event.importance === 1}
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
                    axisY={axisY}
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

        <TimelineControls
          onZoomIn={() => animateTo(zoomInTransform(transform))}
          onZoomOut={() => animateTo(zoomOutTransform(transform))}
          onFit={fitAll}
        />
      </div>
    </section>
  );
}
