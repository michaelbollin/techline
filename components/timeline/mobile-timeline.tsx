"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent } from "react";

import { useContainerSize } from "@/hooks/use-container-size";
import { useMobileTimelinePlot } from "@/hooks/use-mobile-timeline-plot";
import { useTimelineFilterZoomVertical } from "@/hooks/use-timeline-filter-zoom-vertical";
import { useTimelineFilters } from "@/hooks/use-timeline-filters";
import { useTimelineViewActionsVertical } from "@/hooks/use-timeline-view-actions-vertical";
import { useTimelineZoomVertical } from "@/hooks/use-timeline-zoom-vertical";
import { TIMELINE_AXIS_STROKE_WIDTH, TIMELINE_INK } from "@/lib/timeline/constants";
import { eventPath } from "@/lib/timeline/format";
import { buildVerticalAxisPath } from "@/lib/timeline/vertical/axis-path";
import type { PlottedEvent } from "@/lib/timeline/plot-data";
import type { TimelineEvent } from "@/lib/timeline/schema";

import { MobileTimelineAxisGrid } from "./mobile/mobile-timeline-axis-grid";
import { MobileTimelineNodeDot } from "./mobile/mobile-timeline-node-dot";
import { MobileTimelineNodeLabel } from "./mobile/mobile-timeline-node-label";
import { MobileTimelineNodeStem } from "./mobile/mobile-timeline-node-stem";
import { MobileTimelinePinchHint } from "./mobile/mobile-timeline-pinch-hint";
import { TimelineFilterSidebar } from "./timeline-filters";
import { TimelineHeader } from "./timeline-header";

type MobileTimelineProps = {
  events: TimelineEvent[];
  filterPathKey?: string;
};

export function MobileTimeline({ events, filterPathKey = "" }: MobileTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const { width, height } = useContainerSize(containerRef);
  const router = useRouter();
  const pathname = usePathname();

  const { activeFilterIds, updateFilters, setDeferUrlSync } = useTimelineFilters(filterPathKey);
  const [fulltextQuery, setFulltextQuery] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [chartReady, setChartReady] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setChartReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const activeFilterCount = activeFilterIds.size + (fulltextQuery ? 1 : 0);

  const clearLocalFilters = useCallback(() => {
    setFulltextQuery("");
  }, []);

  const { transform, animateTo } = useTimelineZoomVertical({
    width,
    height,
    svgRef,
    svgReady: chartReady,
  });

  const plot = useMobileTimelinePlot({
    events,
    activeFilterIds,
    fulltextQuery,
    transform,
    width,
    height,
    hovered: null,
  });

  const { plotted, axisX, getAxisX, yScale, labelLayout, dotLayout, stemStartX, labelNodes } = plot;

  const yPosition = useCallback((timestamp: number) => yScale(new Date(timestamp)), [yScale]);

  useTimelineFilterZoomVertical({
    height,
    plotted,
    activeFilterIds,
    fulltextQuery,
    animateTo,
  });

  const { resetView, zoomToYear } = useTimelineViewActionsVertical({
    height,
    transform,
    plottedCount: plotted.length,
    animateTo,
    updateFilters,
    onResetFilters: clearLocalFilters,
  });

  const axisPath = useMemo(() => buildVerticalAxisPath(height, axisX), [axisX, height]);

  const openEvent = (event: PlottedEvent) => {
    router.push(eventPath(event.slug, { filterPathKey }), { scroll: false });
  };

  const handleLogoClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      resetView();
      if (pathname !== "/") {
        router.push("/", { scroll: false });
      }
    },
    [pathname, resetView, router],
  );

  return (
    <section aria-label="Interactive timeline" className="relative flex h-full w-full flex-col bg-white">
      <TimelineHeader
        isOpen={filtersOpen}
        activeCount={activeFilterCount}
        onToggle={() => setFiltersOpen((open) => !open)}
        onLogoClick={handleLogoClick}
      />

      <MobileTimelinePinchHint chartReady={chartReady} zoomScale={transform.k} />

      <div ref={containerRef} className="relative min-h-0 flex-1">
        {plotted.length === 0 && (
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6">
            <p className="rounded-full border border-black bg-white px-5 py-2.5 text-sm text-black">
              No events match the selected filters.
            </p>
          </div>
        )}

        {chartReady && width > 0 && height > 0 && (
          <svg
            ref={svgRef}
            width={width}
            height={height}
            className="block touch-none select-none bg-white"
          >
            <g>
              <MobileTimelineAxisGrid
                yScale={yScale}
                height={height}
                getAxisX={getAxisX}
                onYearClick={zoomToYear}
              />

              <path
                d={axisPath}
                fill="none"
                stroke={TIMELINE_INK}
                strokeWidth={TIMELINE_AXIS_STROKE_WIDTH}
              />

              <g className="timeline-stems" pointerEvents="none">
                {labelNodes.map((event) => {
                  const layout = labelLayout.get(event.id)!;

                  return (
                    <MobileTimelineNodeStem
                      key={`stem-${event.id}`}
                      event={event}
                      yScale={yPosition}
                      axisOffset={dotLayout.get(event.id)?.axisOffset ?? 0}
                      getAxisX={getAxisX}
                      layout={layout}
                      stemStartX={stemStartX.get(event.id) ?? 0}
                    />
                  );
                })}
              </g>

              <g className="timeline-dots">
                {plotted.map((event) => {
                  if (!dotLayout.get(event.id)?.showDot) {
                    return null;
                  }

                  return (
                    <MobileTimelineNodeDot
                      key={`dot-${event.id}`}
                      event={event}
                      yScale={yPosition}
                      axisOffset={dotLayout.get(event.id)?.axisOffset ?? 0}
                      getAxisX={getAxisX}
                      showLabel={labelLayout.get(event.id)?.showLabel ?? false}
                      onClick={() => openEvent(event)}
                    />
                  );
                })}
              </g>

              <g className="timeline-labels">
                {labelNodes.map((event) => (
                  <MobileTimelineNodeLabel
                    key={`label-${event.id}`}
                    event={event}
                    yScale={yPosition}
                    axisOffset={dotLayout.get(event.id)?.axisOffset ?? 0}
                    getAxisX={getAxisX}
                    layout={labelLayout.get(event.id)!}
                    viewportWidth={width}
                    onClick={() => openEvent(event)}
                  />
                ))}
              </g>
            </g>
          </svg>
        )}

      </div>

      <TimelineFilterSidebar
        variant="overlay"
        isOpen={filtersOpen}
        events={events}
        activeFilterIds={activeFilterIds}
        onChange={updateFilters}
        onReset={resetView}
        onFulltextChange={setFulltextQuery}
        fulltextQuery={fulltextQuery}
        onClose={() => setFiltersOpen(false)}
        onOpenChange={setDeferUrlSync}
      />
    </section>
  );
}
