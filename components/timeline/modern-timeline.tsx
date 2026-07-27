"use client";

import * as d3 from "d3";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { eventPath } from "@/lib/timeline/format";
import { measureLabelWidth } from "@/lib/timeline/measure-label";
import {
  getTimeExtent,
  LABEL_BOX_HEIGHT,
  LABEL_OFFSET,
  labelBottomLocalY,
  labelTopLocalY,
  maxImportanceForZoom,
  maxLanesForZoom,
  resolveLabelLayout,
  toPlottedEvents,
  type LabelLayout,
  type PlottedEvent,
  type TimelineNode,
} from "@/lib/timeline/plot";
import type { TimelineEvent } from "@/lib/timeline/schema";

type ModernTimelineProps = {
  events: TimelineEvent[];
};

const INK = "#000000";
const PAPER = "#ffffff";
const LABEL_RADIUS = LABEL_BOX_HEIGHT / 2;

const AXIS_Y_RATIO = 0.5;
const TRANSITION_MS = 400;

function computeFitTransform(
  width: number,
  extent: [number, number],
): d3.ZoomTransform {
  const base = d3.scaleTime().domain(extent).range([0, width]);
  const x0 = base(extent[0]);
  const x1 = base(extent[1]);
  const scale = width / Math.max(x1 - x0, 1);
  return d3.zoomIdentity.translate(-scale * x0, 0).scale(scale);
}

function computeZoomToEvents(
  width: number,
  extent: [number, number],
  targets: PlottedEvent[],
): d3.ZoomTransform {
  const base = d3.scaleTime().domain(extent).range([0, width]);
  const times = targets.map((event) => event.timestamp);
  const t0 = Math.min(...times);
  const t1 = Math.max(...times);
  const margin = Math.max((t1 - t0) * 0.2, (extent[1] - extent[0]) * 0.005);
  const x0 = base(t0 - margin);
  const x1 = base(t1 + margin);
  const scale = (width * 0.9) / Math.max(x1 - x0, 1);
  const mid = (x0 + x1) / 2;
  return d3.zoomIdentity.translate(width / 2 - scale * mid, 0).scale(scale);
}

function useContainerSize(ref: React.RefObject<HTMLDivElement | null>) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const update = () => {
      const rect = element.getBoundingClientRect();
      setSize({ width: rect.width, height: rect.height });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  return size;
}

export function ModernTimeline({ events }: ModernTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const hasInitialized = useRef(false);
  const { width, height } = useContainerSize(containerRef);
  const router = useRouter();

  const plotted = useMemo(() => toPlottedEvents(events), [events]);
  const extent = useMemo(() => getTimeExtent(plotted), [plotted]);

  const [transform, setTransform] = useState<d3.ZoomTransform>(() =>
    computeFitTransform(1200, extent),
  );
  const [hovered, setHovered] = useState<PlottedEvent | null>(null);

  const axisY = height * AXIS_Y_RATIO;

  const baseScale = useMemo(
    () => d3.scaleTime().domain(extent).range([0, Math.max(width, 1)]),
    [extent, width],
  );

  const xScale = useMemo(() => transform.rescaleX(baseScale), [transform, baseScale]);

  const nodes = useMemo(
    (): TimelineNode[] => plotted.map((event) => ({ kind: "event", event })),
    [plotted],
  );

  const msPerPixel = useMemo(() => {
    const t0 = xScale.invert(0).getTime();
    const t1 = xScale.invert(width).getTime();
    return Math.abs(t1 - t0) / Math.max(width, 1);
  }, [xScale, width]);

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
    [plotted, xScale, maxImportance, maxLanes, width, labelWidths],
  );

  const stemStartY = useMemo(() => {
    const starts = new Map<string, number>();
    const buckets = new Map<number, Array<{ id: string; lane: number }>>();

    for (const event of plotted) {
      const layout = labelLayout.get(event.id);
      if (!layout?.showLabel) {
        continue;
      }

      const bucketX = Math.round(xScale(event.timestamp));
      const bucket = buckets.get(bucketX) ?? [];
      bucket.push({ id: event.id, lane: layout.lane });
      buckets.set(bucketX, bucket);
    }

    for (const bucket of buckets.values()) {
      const lanes = bucket.map((item) => item.lane);

      for (const item of bucket) {
        const lowerLanes = lanes.filter((lane) => lane < item.lane);
        starts.set(
          item.id,
          lowerLanes.length > 0 ? labelBottomLocalY(Math.max(...lowerLanes)) : 0,
        );
      }
    }

    return starts;
  }, [plotted, labelLayout, xScale]);

  const eventNodes = useMemo(
    () => nodes.filter((node): node is Extract<TimelineNode, { kind: "event" }> => node.kind === "event"),
    [nodes],
  );

  const labelNodes = useMemo(() => {
    const visible = eventNodes.filter((node) => labelLayout.get(node.event.id)?.showLabel);
    return [...visible].sort((a, b) => {
      const laneA = labelLayout.get(a.event.id)?.lane ?? 0;
      const laneB = labelLayout.get(b.event.id)?.lane ?? 0;
      if (laneA !== laneB) {
        return laneA - laneB;
      }

      return xScale(a.event.timestamp) - xScale(b.event.timestamp);
    });
  }, [eventNodes, labelLayout, xScale]);

  const tooltipAnchor = useMemo(() => {
    if (!hovered || width <= 0) {
      return null;
    }

    const x = xScale(hovered.timestamp);
    const lane = labelLayout.get(hovered.id)?.lane ?? 0;
    const labelVisible = labelLayout.get(hovered.id)?.showLabel ?? false;
    const labelTop = axisY + labelTopLocalY(lane);

    return {
      x: Math.min(Math.max(x, 160), width - 160),
      y: labelVisible ? labelTop - 12 : axisY - 72,
    };
  }, [hovered, xScale, width, axisY, labelLayout]);

  const animateTo = useCallback((next: d3.ZoomTransform) => {
    const svg = svgRef.current;
    const zoom = zoomRef.current;
    if (!svg || !zoom) {
      setTransform(next);
      return;
    }

    d3.select(svg)
      .transition()
      .duration(TRANSITION_MS)
      .ease(d3.easeCubicOut)
      .call(zoom.transform, next);
  }, []);

  const fitAll = useCallback(() => {
    if (width <= 0) {
      return;
    }
    animateTo(computeFitTransform(width, extent));
  }, [animateTo, extent, width]);

  useEffect(() => {
    if (width <= 0 || !svgRef.current) {
      return;
    }

    const svg = d3.select(svgRef.current);
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.35, 180])
      .translateExtent([
        [-width * 3, 0],
        [width * 4, height],
      ])
      .wheelDelta((event) => -event.deltaY * (event.deltaMode === 1 ? 0.05 : 0.002))
      .on("zoom", (event) => {
        setTransform(event.transform);
      });

    zoomRef.current = zoom;
    svg.call(zoom);

    if (!hasInitialized.current) {
      animateTo(computeFitTransform(width, extent));
      hasInitialized.current = true;
    }

    return () => {
      svg.on(".zoom", null);
      zoomRef.current = null;
    };
  }, [width, height, extent, animateTo]);

  const handleNodeClick = (node: TimelineNode) => {
    if (node.kind === "cluster") {
      animateTo(computeZoomToEvents(width, extent, node.events));
      return;
    }

    router.push(eventPath(node.event.slug));
  };

  return (
    <section aria-label="Interactive timeline" className="modern-timeline relative h-full w-full bg-white">
      <div ref={containerRef} className="relative h-full w-full">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 px-6 py-5 sm:px-8">
          <Link
            href="/"
            className="timeline-brand pointer-events-auto text-sm tracking-[0.2em] text-black uppercase"
          >
            Techline
          </Link>
        </div>

        {width > 0 && height > 0 && (
          <svg
            ref={svgRef}
            width={width}
            height={height}
            className="block touch-none select-none bg-white"
            onPointerLeave={() => setHovered(null)}
          >
            <g>
              <AxisGrid xScale={xScale} width={width} height={height} axisY={axisY} />

              <line x1={0} x2={width} y1={axisY} y2={axisY} stroke={INK} strokeWidth={1.5} />

              <g className="timeline-stems" pointerEvents="none">
                {eventNodes.map((node) => {
                  const layout = labelLayout.get(node.event.id) ?? {
                    showLabel: false,
                    lane: 0,
                    width: labelWidths.get(node.event.id) ?? measureLabelWidth(node.event.title),
                  };

                  if (!layout.showLabel) {
                    return null;
                  }

                  return (
                    <TimelineNodeStem
                      key={`stem-${node.event.id}`}
                      event={node.event}
                      xScale={xScale}
                      axisY={axisY}
                      layout={layout}
                      stemStartY={stemStartY.get(node.event.id) ?? 0}
                    />
                  );
                })}
              </g>

              <g className="timeline-dots">
                {eventNodes.map((node) => (
                    <TimelineNodeDot
                      key={`dot-${node.event.id}`}
                      event={node.event}
                      xScale={xScale}
                      axisY={axisY}
                      isHovered={hovered?.id === node.event.id}
                      isLandmark={node.event.importance === 1}
                      onHover={setHovered}
                      onClick={() => handleNodeClick(node)}
                    />
                ))}
              </g>

              <g className="timeline-labels">
                {labelNodes
                  .filter((node) => node.event.id !== hovered?.id)
                  .map((node) => {
                    const layout = labelLayout.get(node.event.id)!;

                    return (
                      <TimelineNodeLabel
                        key={`label-${node.event.id}`}
                        event={node.event}
                        xScale={xScale}
                        axisY={axisY}
                        layout={layout}
                        isHovered={false}
                        onHover={setHovered}
                        onClick={() => handleNodeClick(node)}
                      />
                    );
                  })}
                {hovered && labelLayout.get(hovered.id)?.showLabel && (
                  <TimelineNodeLabel
                    key={`label-hover-${hovered.id}`}
                    event={hovered}
                    xScale={xScale}
                    axisY={axisY}
                    layout={labelLayout.get(hovered.id)!}
                    isHovered
                    onHover={setHovered}
                    onClick={() => router.push(eventPath(hovered.slug))}
                  />
                )}
              </g>
            </g>
          </svg>
        )}

        {hovered && tooltipAnchor && (
          <div
            className="timeline-tooltip pointer-events-none absolute z-20 max-w-sm -translate-x-1/2 -translate-y-full px-4 py-3"
            style={{
              left: tooltipAnchor.x,
              top: tooltipAnchor.y,
            }}
          >
            <p className="timeline-tooltip-date">{hovered.dateLabel}</p>
            <p className="timeline-tooltip-title">{hovered.title}</p>
            <p className="timeline-tooltip-summary">{hovered.summary}</p>
          </div>
        )}

        <div className="absolute right-4 bottom-4 flex items-center gap-1.5">
          <button
            type="button"
            onClick={() =>
              animateTo(d3.zoomIdentity.translate(transform.x, 0).scale(transform.k * 1.35))
            }
            className="modern-timeline-control modern-timeline-control-square rounded-full"
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            type="button"
            onClick={() =>
              animateTo(d3.zoomIdentity.translate(transform.x, 0).scale(transform.k / 1.35))
            }
            className="modern-timeline-control modern-timeline-control-square rounded-full"
            aria-label="Zoom out"
          >
            −
          </button>
          <button type="button" onClick={fitAll} className="modern-timeline-control rounded-full px-4">
            Fit
          </button>
        </div>
      </div>
    </section>
  );
}

function AxisGrid({
  xScale,
  width,
  height,
  axisY,
}: {
  xScale: d3.ScaleTime<number, number>;
  width: number;
  height: number;
  axisY: number;
}) {
  const ticks = xScale.ticks(Math.max(4, Math.floor(width / 100)));

  return (
    <g aria-hidden>
      {ticks.map((tick) => {
        const x = xScale(tick);
        if (x < 0 || x > width) {
          return null;
        }

        return (
          <g key={tick.getTime()}>
            <line
              x1={x}
              x2={x}
              y1={axisY}
              y2={axisY + height * 0.28}
              stroke={INK}
              strokeOpacity={0.1}
              strokeWidth={1}
            />
            <text
              x={x}
              y={axisY + height * 0.32}
              textAnchor="middle"
              fill={INK}
              className="timeline-axis-year"
            >
              {d3.timeFormat("%Y")(tick)}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function TimelineNodeStem({
  event,
  xScale,
  axisY,
  layout,
  stemStartY,
}: {
  event: PlottedEvent;
  xScale: d3.ScaleTime<number, number>;
  axisY: number;
  layout: LabelLayout;
  stemStartY: number;
}) {
  const x = xScale(event.timestamp);
  const stemEndY = labelBottomLocalY(layout.lane);

  return (
    <line
      className="timeline-node-stem"
      x1={x}
      x2={x}
      y1={axisY + stemStartY}
      y2={axisY + stemEndY}
      stroke={INK}
      strokeWidth={1}
    />
  );
}

function TimelineNodeDot({
  event,
  xScale,
  axisY,
  isHovered,
  isLandmark,
  onHover,
  onClick,
}: {
  event: PlottedEvent;
  xScale: d3.ScaleTime<number, number>;
  axisY: number;
  isHovered: boolean;
  isLandmark: boolean;
  onHover: (event: PlottedEvent | null) => void;
  onClick: () => void;
}) {
  const x = xScale(event.timestamp);
  const dotR = isLandmark ? 6 : 4.5;

  return (
    <g transform={`translate(${x}, ${axisY})`}>
      <circle
        className={`timeline-node-dot ${isHovered ? "is-hovered" : ""}`}
        cx={0}
        cy={0}
        r={dotR}
        fill={isHovered || isLandmark ? INK : PAPER}
        stroke={INK}
        strokeWidth={1.5}
        onClick={onClick}
        onMouseEnter={() => onHover(event)}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover(event)}
        onBlur={() => onHover(null)}
        tabIndex={0}
        role="button"
        aria-label={`${event.title}, ${event.dateLabel}`}
      />
    </g>
  );
}

function TimelineNodeLabel({
  event,
  xScale,
  axisY,
  layout,
  isHovered,
  onHover,
  onClick,
}: {
  event: PlottedEvent;
  xScale: d3.ScaleTime<number, number>;
  axisY: number;
  layout: LabelLayout;
  isHovered: boolean;
  onHover: (event: PlottedEvent | null) => void;
  onClick: () => void;
}) {
  const x = xScale(event.timestamp);
  const labelWidth = layout.width;
  const labelY = axisY + labelTopLocalY(layout.lane);

  return (
    <g
      className="timeline-node-label"
      transform={`translate(${x - labelWidth / 2}, ${labelY})`}
      onClick={onClick}
      onMouseEnter={() => onHover(event)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(event)}
      onBlur={() => onHover(null)}
      tabIndex={0}
      role="button"
      aria-label={`${event.title}, ${event.dateLabel}`}
    >
      <g className={`timeline-node-label-inner ${isHovered ? "is-hovered" : ""}`}>
        <rect
          width={labelWidth}
          height={LABEL_BOX_HEIGHT}
          rx={LABEL_RADIUS}
          ry={LABEL_RADIUS}
          className="timeline-node-label-bg"
        />
        <text
          x={labelWidth / 2}
          y={LABEL_BOX_HEIGHT / 2 + 4}
          textAnchor="middle"
          className="timeline-node-label-text"
        >
          {event.title}
        </text>
      </g>
    </g>
  );
}
