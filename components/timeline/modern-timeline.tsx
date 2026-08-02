"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent } from "react";

import { useContainerSize } from "@/hooks/use-container-size";
import { useTimelineFulltext } from "@/hooks/use-timeline-fulltext";
import { useTimelineKeyboardNavigation } from "@/hooks/use-timeline-keyboard-navigation";
import { useTimelineFilters } from "@/hooks/use-timeline-filters";
import { useTimelineFilterZoom } from "@/hooks/use-timeline-filter-zoom";
import { useTimelinePlot } from "@/hooks/use-timeline-plot";
import { useTimelineViewActions } from "@/hooks/use-timeline-view-actions";
import { useTimelineZoom } from "@/hooks/use-timeline-zoom";
import { TIMELINE_AXIS_STROKE_WIDTH, TIMELINE_INK } from "@/lib/timeline/constants";
import {
  TIMELINE_USE_HOVER_DETAIL_PANEL,
  timelineEventDetailLayout,
} from "@/lib/timeline/event-detail-layout";
import { buildAxisPath } from "@/lib/timeline/axis-path";
import { eventPath } from "@/lib/timeline/format";
import { measureTimelineLabelWidth } from "@/lib/timeline/measure-label";
import { useTimelineNodeHover } from "@/lib/timeline/timeline-node-hover";
import type { PlottedEvent } from "@/lib/timeline/plot-data";
import type { TimelineEvent } from "@/lib/timeline/schema";

import { SiteBrand } from "@/components/layout/site-brand";
import { SITE_FOOTER_RESERVED_HEIGHT } from "@/lib/site";

import { useTimelineHoverEvent } from "./hover-effects/timeline-hover-effect-context";
import { useTimelineChrome } from "./timeline-chrome-context";
import { TimelineFilterSidebar, TimelineFilterTrigger } from "./timeline-filters";
import { TimelineHelpTrigger } from "./timeline-help-trigger";
import { TimelineAxisGrid } from "./timeline-axis-grid";
import { TimelineEventDetail } from "./timeline-event-detail";
import { TimelinePanArrows } from "./timeline-pan-arrows";
import { TimelineNodeDot } from "./timeline-node-dot";
import { TimelineNodeLabel } from "./timeline-node-label";
import { TimelineNodeStemHit } from "./timeline-node-stem-hit";
import { TimelineNodeStem } from "./timeline-node-stem";

type ModernTimelineProps = {
  events: TimelineEvent[];
  /** URL filter segment, e.g. `javascript,web` — empty on `/`. */
  filterPathKey?: string;
  keyboardNavEnabled?: boolean;
};

export function ModernTimeline({
  events,
  filterPathKey = "",
  keyboardNavEnabled = true,
}: ModernTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const { width, height } = useContainerSize(containerRef);
  const router = useRouter();
  const pathname = usePathname();
  const { setHoveredEventId } = useTimelineHoverEvent();

  const { activeFilterIds, updateFilters, setDeferUrlSync } = useTimelineFilters(filterPathKey);
  const { fulltextQuery, setFulltextQuery, clearFulltext } = useTimelineFulltext();
  const { filtersOpen, setFiltersOpen } = useTimelineChrome();
  const [detailFits, setDetailFits] = useState<boolean | null>(null);
  const [chartReady, setChartReady] = useState(false);

  const handleHoverIdChange = useCallback(() => {
    if (TIMELINE_USE_HOVER_DETAIL_PANEL) {
      setDetailFits(null);
    }
  }, []);

  const {
    hovered,
    handleHoverEnter,
    handleHoverLeave,
    clearHoverImmediate,
    cancelScheduledHoverClear,
  } = useTimelineNodeHover({ onHoverIdChange: handleHoverIdChange });

  useEffect(() => {
    const frame = requestAnimationFrame(() => setChartReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const activeFilterCount = activeFilterIds.size + (fulltextQuery ? 1 : 0);

  const clearLocalFilters = useCallback(() => {
    clearFulltext();
  }, [clearFulltext]);

  const { transform, animateTo } = useTimelineZoom({
    width,
    height,
    svgRef,
    svgReady: chartReady,
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

  const {
    filteredEvents,
    plotted,
    axisY,
    getAxisY,
    xScale,
    labelLayout,
    dotLayout,
    stemStartY,
    labelNodes,
  } = plot;

  useTimelineFilterZoom({
    width,
    plotted,
    activeFilterIds,
    fulltextQuery,
    animateTo,
  });

  const {
    resetView,
    zoomToYear,
    zoomToDecade,
    panEarlier,
    panLater,
    zoomIn,
    zoomOut,
    showPanEarlier,
    showPanLater,
  } = useTimelineViewActions({
      width,
      transform,
      plottedCount: plotted.length,
      animateTo,
      updateFilters,
      onResetFilters: clearLocalFilters,
    });

  useTimelineKeyboardNavigation({
    enabled: keyboardNavEnabled && plotted.length > 0,
    zoomIn,
    zoomOut,
    panEarlier,
    panLater,
    canPanEarlier: showPanEarlier,
    canPanLater: showPanLater,
  });

  const axisPath = useMemo(() => buildAxisPath(width, axisY), [axisY, width]);
  const detailLayout = useMemo(
    () => timelineEventDetailLayout(axisY, height, SITE_FOOTER_RESERVED_HEIGHT),
    [axisY, height],
  );

  const displayedHovered = useMemo(() => {
    if (!hovered) {
      return null;
    }

    return filteredEvents.some((item) => item.id === hovered.id) ? hovered : null;
  }, [filteredEvents, hovered]);

  const shouldMeasureDetail = Boolean(displayedHovered && detailLayout.show);
  const showDetailPanel =
    TIMELINE_USE_HOVER_DETAIL_PANEL && shouldMeasureDetail && detailFits !== false;
  const useExpandedLabel = Boolean(displayedHovered && !showDetailPanel);

  useEffect(() => {
    return () => cancelScheduledHoverClear();
  }, [cancelScheduledHoverClear]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setDetailFits(null));
    return () => cancelAnimationFrame(frame);
  }, [detailLayout.maxHeight]);

  const hoverOnlyLabel = useMemo(() => {
    if (!displayedHovered || !useExpandedLabel) {
      return null;
    }

    if (labelLayout.get(displayedHovered.id)?.showLabel) {
      return null;
    }

    if (!dotLayout.get(displayedHovered.id)?.showDot) {
      return null;
    }

    return displayedHovered;
  }, [displayedHovered, dotLayout, labelLayout, useExpandedLabel]);

  const hoveredStemLayout = useMemo(() => {
    if (!displayedHovered || !useExpandedLabel) {
      return null;
    }

    const layout = labelLayout.get(displayedHovered.id);
    if (layout) {
      return layout;
    }

    return {
      showLabel: true,
      lane: 0,
      width: measureTimelineLabelWidth(displayedHovered.bubbleTitle),
    };
  }, [displayedHovered, labelLayout, useExpandedLabel]);

  const showExpandedLayer = Boolean(useExpandedLabel && displayedHovered);
  const activeHoveredId = displayedHovered?.id ?? null;

  useEffect(() => {
    setHoveredEventId(displayedHovered?.id ?? null);
  }, [displayedHovered?.id, setHoveredEventId]);

  useEffect(() => {
    return () => {
      setHoveredEventId(null);
    };
  }, [setHoveredEventId]);

  const openEvent = (event: PlottedEvent) => {
    router.push(eventPath(event.slug, { filterPathKey }), { scroll: false });
  };

  const handleLogoClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      resetView();
      clearHoverImmediate();
      if (pathname !== "/") {
        router.push("/", { scroll: false });
      }
    },
    [pathname, resetView, router, clearHoverImmediate],
  );

  return (
    <section aria-label="Interactive timeline" className="relative flex h-full w-full flex-col">
      <div className="flex min-h-0 flex-1">
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <header className="relative z-20 flex min-h-10 shrink-0 items-center py-5 pr-[3.75rem] pb-4 pl-6 sm:pl-8 sm:pr-[4.25rem]">
            <SiteBrand className="shrink-0" onClick={handleLogoClick} />
          </header>

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
                className="block touch-none select-none"
                onPointerLeave={() => clearHoverImmediate()}
              >
                <g>
                  <TimelineAxisGrid
                    xScale={xScale}
                    width={width}
                    getAxisY={getAxisY}
                    onYearClick={zoomToYear}
                    onDecadeClick={zoomToDecade}
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
                        <TimelineNodeStem
                          key={`stem-${event.id}`}
                          event={event}
                          xScale={xScale}
                          axisOffset={dotLayout.get(event.id)?.axisOffset ?? 0}
                          getAxisY={getAxisY}
                          layout={layout}
                          stemStartY={stemStartY.get(event.id) ?? 0}
                          isHovered={hovered?.id === event.id}
                        />
                      );
                    })}
                  </g>

                  <g className="timeline-dots">
                    {plotted.map((event) => {
                      if (!dotLayout.get(event.id)?.showDot) {
                        return null;
                      }

                      if (showExpandedLayer && event.id === activeHoveredId) {
                        return null;
                      }

                      return (
                        <TimelineNodeDot
                          key={`dot-${event.id}`}
                          event={event}
                          xScale={xScale}
                          axisOffset={dotLayout.get(event.id)?.axisOffset ?? 0}
                          getAxisY={getAxisY}
                          showLabel={labelLayout.get(event.id)?.showLabel ?? false}
                          isHovered={hovered?.id === event.id}
                          onHoverEnter={handleHoverEnter}
                          onHoverLeave={handleHoverLeave}
                          onClick={() => openEvent(event)}
                        />
                      );
                    })}
                  </g>

                  <g className="timeline-labels">
                    {labelNodes.map((event) => {
                      if (showExpandedLayer && event.id === activeHoveredId) {
                        return null;
                      }

                      return (
                        <TimelineNodeLabel
                          key={`label-${event.id}`}
                          event={event}
                          xScale={xScale}
                          axisOffset={dotLayout.get(event.id)?.axisOffset ?? 0}
                          getAxisY={getAxisY}
                          layout={labelLayout.get(event.id)!}
                          viewportWidth={width}
                          isHovered={hovered?.id === event.id}
                          expanded={useExpandedLabel && hovered?.id === event.id}
                          onHoverEnter={handleHoverEnter}
                          onHoverLeave={handleHoverLeave}
                          onClick={() => openEvent(event)}
                        />
                      );
                    })}
                  </g>

                  {showExpandedLayer && displayedHovered && hoveredStemLayout && (
                    <TimelineNodeStemHit
                      event={displayedHovered}
                      xScale={xScale}
                      axisOffset={dotLayout.get(displayedHovered.id)?.axisOffset ?? 0}
                      getAxisY={getAxisY}
                      layout={hoveredStemLayout}
                      stemStartY={stemStartY.get(displayedHovered.id) ?? 0}
                      onHoverEnter={handleHoverEnter}
                      onHoverLeave={handleHoverLeave}
                    />
                  )}

                  {showExpandedLayer && displayedHovered && dotLayout.get(displayedHovered.id)?.showDot && (
                    <g className="timeline-dots-active">
                      <TimelineNodeDot
                        key={`dot-active-${displayedHovered.id}`}
                        event={displayedHovered}
                        xScale={xScale}
                        axisOffset={dotLayout.get(displayedHovered.id)?.axisOffset ?? 0}
                        getAxisY={getAxisY}
                        showLabel={labelLayout.get(displayedHovered.id)?.showLabel ?? false}
                        isHovered
                        onHoverEnter={handleHoverEnter}
                        onHoverLeave={handleHoverLeave}
                        onClick={() => openEvent(displayedHovered)}
                      />
                    </g>
                  )}

                  <g className="timeline-labels-active">
                    {showExpandedLayer &&
                      labelNodes.map((event) => {
                        if (event.id !== activeHoveredId) {
                          return null;
                        }

                        return (
                          <TimelineNodeLabel
                            key={`label-active-${event.id}`}
                            event={event}
                            xScale={xScale}
                            axisOffset={dotLayout.get(event.id)?.axisOffset ?? 0}
                            getAxisY={getAxisY}
                            layout={labelLayout.get(event.id)!}
                            viewportWidth={width}
                            isHovered
                            expanded
                            onHoverEnter={handleHoverEnter}
                            onHoverLeave={handleHoverLeave}
                            onClick={() => openEvent(event)}
                          />
                        );
                      })}
                    {hoverOnlyLabel && (
                      <TimelineNodeLabel
                        key={`label-hover-${hoverOnlyLabel.id}`}
                        event={hoverOnlyLabel}
                        xScale={xScale}
                        axisOffset={dotLayout.get(hoverOnlyLabel.id)?.axisOffset ?? 0}
                        getAxisY={getAxisY}
                        layout={{
                          showLabel: true,
                          lane: 0,
                          width: measureTimelineLabelWidth(hoverOnlyLabel.bubbleTitle),
                        }}
                        viewportWidth={width}
                        isHovered
                        expanded
                        onHoverEnter={handleHoverEnter}
                        onHoverLeave={handleHoverLeave}
                        onClick={() => openEvent(hoverOnlyLabel)}
                      />
                    )}
                  </g>
                </g>
              </svg>
            )}

            {TIMELINE_USE_HOVER_DETAIL_PANEL && shouldMeasureDetail && displayedHovered && (
              <TimelineEventDetail
                key={`${displayedHovered.id}:${detailLayout.maxHeight}`}
                event={displayedHovered}
                top={detailLayout.top}
                maxHeight={detailLayout.maxHeight}
                fits={detailFits}
                onFitsChange={setDetailFits}
              />
            )}

            <TimelinePanArrows
              canPanEarlier={showPanEarlier}
              canPanLater={showPanLater}
              onPanEarlier={panEarlier}
              onPanLater={panLater}
            />
          </div>
        </div>

        <TimelineFilterSidebar
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
      </div>

      <div className="absolute top-5 right-6 flex h-10 items-center gap-0.5 overflow-visible sm:right-8">
        <div className={filtersOpen ? "relative z-30" : "relative z-40"}>
          <TimelineHelpTrigger suppressed={filtersOpen} />
        </div>
        <div className="relative z-50">
          <TimelineFilterTrigger
            isOpen={filtersOpen}
            activeCount={activeFilterCount}
            onToggle={() => setFiltersOpen(!filtersOpen)}
          />
        </div>
      </div>
    </section>
  );
}
