import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import { TextWithAbbreviationTooltips } from "@/components/ui/text-with-abbreviation-tooltips";
import {
  LABEL_BOX_HEIGHT,
  LABEL_RADIUS,
  labelTopLocalY,
  type LabelLayout,
} from "@/lib/timeline/label-layout";
import { TIMELINE_LABEL_EDGE_INSET } from "@/lib/timeline/constants";
import { LABEL_PADDING_X } from "@/lib/timeline/measure-label";
import { clampExpandedBubbleHeight } from "@/lib/timeline/label-expand";
import type { PlottedEvent } from "@/lib/timeline/plot-data";
import { TimelineLabelContent } from "@/components/timeline/timeline-label-content";

type TimelineNodeLabelProps = {
  event: PlottedEvent;
  xScale: (timestamp: number) => number;
  axisOffset?: number;
  getAxisY: (x: number) => number;
  layout: LabelLayout;
  viewportWidth: number;
  isHovered: boolean;
  /** Grow the pill in place and show summary when the header detail panel is hidden. */
  expanded?: boolean;
  onHover: (event: PlottedEvent | null) => void;
  onClick: () => void;
};

const labelTransition =
  "transition-[transform,fill] duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)]";

const EXPANDED_MAX_WIDTH = 480;
const EXPANDED_MIN_WIDTH = 320;
const EXPAND_ANIMATION_MS = 320;
const BUBBLE_PADDING_TOP = 16;
const BUBBLE_PADDING_X = LABEL_PADDING_X;
const BUBBLE_PADDING_BOTTOM = 24;

function expandedBoxWidth(layoutWidth: number, viewportWidth: number): number {
  return Math.min(
    EXPANDED_MAX_WIDTH,
    Math.max(layoutWidth * 3, EXPANDED_MIN_WIDTH),
    viewportWidth - TIMELINE_LABEL_EDGE_INSET * 2,
  );
}

function clampCenterX(centerX: number, visualWidth: number, viewportWidth: number): number {
  const half = visualWidth / 2;

  return Math.min(
    Math.max(centerX, TIMELINE_LABEL_EDGE_INSET + half),
    viewportWidth - TIMELINE_LABEL_EDGE_INSET - half,
  );
}

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

function useAnimatedBubbleSize(
  open: boolean,
  collapsedWidth: number,
  collapsedHeight: number,
  expandedWidth: number,
  expandedHeight: number,
): { width: number; height: number; reveal: number } {
  const sizeRef = useRef({
    width: collapsedWidth,
    height: collapsedHeight,
    reveal: 0,
  });
  const [size, setSize] = useState({
    width: collapsedWidth,
    height: collapsedHeight,
    reveal: 0,
  });

  useEffect(() => {
    const from = sizeRef.current;
    const to = open
      ? { width: expandedWidth, height: expandedHeight, reveal: 1 }
      : { width: collapsedWidth, height: collapsedHeight, reveal: 0 };

    let frame = 0;
    const start = performance.now();

    const step = (now: number) => {
      const t = easeOutCubic(Math.min(1, (now - start) / EXPAND_ANIMATION_MS));
      const next = {
        width: from.width + (to.width - from.width) * t,
        height: from.height + (to.height - from.height) * t,
        reveal: from.reveal + (to.reveal - from.reveal) * t,
      };
      sizeRef.current = next;
      setSize(next);

      if (t < 1) {
        frame = requestAnimationFrame(step);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [open, collapsedWidth, collapsedHeight, expandedWidth, expandedHeight]);

  return size;
}

function ExpandedBubbleBody({ event, scrollable = false }: { event: PlottedEvent; scrollable?: boolean }) {
  return (
    <div
      className={cn(
        "box-border flex flex-row items-start gap-4 text-left text-white",
        scrollable && "h-full overflow-y-auto",
      )}
      style={{
        padding: `${BUBBLE_PADDING_TOP}px ${BUBBLE_PADDING_X}px ${BUBBLE_PADDING_BOTTOM}px`,
      }}
    >
      {event.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element -- foreignObject cannot host next/image
        <img
          src={event.imageUrl}
          alt=""
          className="mt-0.5 h-16 w-16 shrink-0 rounded-md object-contain"
        />
      )}

      <div className="min-w-0 flex-1">
        <p className="m-0 text-[10px] font-medium tracking-widest uppercase text-white/70">
          {event.dateLabel}
        </p>
        <p className="mt-1.5 text-sm leading-snug font-semibold tracking-tight">
          <TextWithAbbreviationTooltips text={event.title} interactive />
        </p>
        <p className="mt-2.5 text-sm leading-relaxed text-white/90">
          <TextWithAbbreviationTooltips text={event.summary} interactive />
        </p>
      </div>
    </div>
  );
}

export function TimelineNodeLabel({
  event,
  xScale,
  axisOffset = 0,
  getAxisY,
  layout,
  viewportWidth,
  isHovered,
  expanded = false,
  onHover,
  onClick,
}: TimelineNodeLabelProps) {
  const x = xScale(event.timestamp) + axisOffset;
  const labelWidth = layout.width;
  const showExpanded = isHovered && expanded;
  const collapsedTop = getAxisY(x) + labelTopLocalY(layout.lane);
  const anchorBottom = collapsedTop + LABEL_BOX_HEIGHT;
  const targetWidth = expandedBoxWidth(labelWidth, viewportWidth);
  const measureRef = useRef<HTMLDivElement>(null);
  const [measuredContentHeight, setMeasuredContentHeight] = useState(0);

  useLayoutEffect(() => {
    if (!showExpanded || !measureRef.current) {
      setMeasuredContentHeight(0);
      return;
    }

    setMeasuredContentHeight(measureRef.current.scrollHeight);
  }, [showExpanded, targetWidth, event.id, event.summary, event.title, event.imageUrl]);

  const uncappedTargetHeight = Math.max(
    LABEL_BOX_HEIGHT + 28,
    measuredContentHeight + BUBBLE_PADDING_TOP + BUBBLE_PADDING_BOTTOM,
  );
  const targetHeight = clampExpandedBubbleHeight(anchorBottom, uncappedTargetHeight);
  const isHeightClamped = targetHeight < uncappedTargetHeight - 0.5;
  const animationOpen = showExpanded && measuredContentHeight > 0;
  const { width: boxWidth, height: boxHeight, reveal } = useAnimatedBubbleSize(
    animationOpen,
    labelWidth,
    LABEL_BOX_HEIGHT,
    targetWidth,
    targetHeight,
  );

  if (!expanded) {
    const boxLeft = clampCenterX(x, labelWidth, viewportWidth) - labelWidth / 2;

    return (
      <g
        className="cursor-pointer outline-none"
        transform={`translate(${boxLeft}, ${collapsedTop})`}
        onClick={onClick}
        onMouseEnter={() => onHover(event)}
        onFocus={() => onHover(event)}
        tabIndex={0}
        role="button"
        aria-label={`${event.title}, ${event.dateLabel}`}
      >
        <g
          className={cn(
            labelTransition,
            isHovered && "origin-center scale-[1.04] [transform-box:fill-box]",
          )}
        >
          <rect
            width={labelWidth}
            height={LABEL_BOX_HEIGHT}
            rx={LABEL_RADIUS}
            ry={LABEL_RADIUS}
            className={cn(
              labelTransition,
              "stroke-black stroke-1",
              isHovered ? "fill-white" : "fill-black",
            )}
          />
          <TimelineLabelContent
            title={event.bubbleTitle}
            width={labelWidth}
            height={LABEL_BOX_HEIGHT}
            textClassName={cn(
              labelTransition,
              "pointer-events-none text-sm font-medium tracking-wide",
              isHovered ? "fill-black" : "fill-white",
            )}
          />
          {isHovered && (
            <line
              x1={LABEL_PADDING_X}
              x2={labelWidth - LABEL_PADDING_X}
              y1={LABEL_BOX_HEIGHT / 2 + 9}
              y2={LABEL_BOX_HEIGHT / 2 + 9}
              className={cn(labelTransition, "stroke-black")}
              strokeWidth={1}
              pointerEvents="none"
            />
          )}
        </g>
      </g>
    );
  }

  const anchorX = clampCenterX(x, boxWidth, viewportWidth);
  const showDetail = reveal > 0.2;
  const showCollapsedTitle = reveal < 0.85;

  return (
    <g
      className="cursor-pointer outline-none"
      transform={`translate(${anchorX}, ${anchorBottom})`}
      onClick={onClick}
      onMouseEnter={() => onHover(event)}
      onFocus={() => onHover(event)}
      tabIndex={0}
      role="button"
      aria-label={`${event.title}, ${event.dateLabel}`}
    >
      {showExpanded && (
        <foreignObject
          x={-10_000}
          y={0}
          width={targetWidth}
          height={800}
          className="pointer-events-none opacity-0"
          aria-hidden
        >
          <div ref={measureRef} style={{ width: targetWidth }}>
            <ExpandedBubbleBody event={event} scrollable={isHeightClamped} />
          </div>
        </foreignObject>
      )}

      <g transform={`translate(${-boxWidth / 2}, ${-boxHeight})`}>
        <rect
          width={boxWidth}
          height={boxHeight}
          rx={LABEL_RADIUS}
          ry={LABEL_RADIUS}
          className="fill-black stroke-black stroke-1"
        />

        <foreignObject
          x={0}
          y={0}
          width={boxWidth}
          height={boxHeight}
          className={cn(!showDetail && "pointer-events-none opacity-0")}
          style={{ opacity: reveal }}
        >
          <ExpandedBubbleBody event={event} scrollable={isHeightClamped} />
        </foreignObject>

        {showCollapsedTitle && (
          <TimelineLabelContent
            title={event.bubbleTitle}
            width={boxWidth}
            height={LABEL_BOX_HEIGHT}
            textClassName="pointer-events-none text-sm font-medium tracking-wide fill-white"
          />
        )}
      </g>
    </g>
  );
}
