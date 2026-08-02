import { cn } from "@/lib/cn";
import { TIMELINE_INK } from "@/lib/timeline/constants";
import { desktopDotRadius, desktopHitRadius } from "@/lib/timeline/dot-metrics";
import { visualImportanceTier } from "@/lib/timeline/importance";
import type { PlottedEvent } from "@/lib/timeline/plot-data";

export type TimelineNodeHoverHandlers = {
  onHoverEnter: (event: PlottedEvent) => void;
  onHoverLeave: (event: PlottedEvent) => void;
};

type TimelineNodeDotProps = {
  event: PlottedEvent;
  xScale: (timestamp: number) => number;
  axisOffset?: number;
  getAxisY: (x: number) => number;
  showLabel: boolean;
  isHovered: boolean;
  isOpening?: boolean;
  onHoverEnter: (event: PlottedEvent) => void;
  onHoverLeave: (event: PlottedEvent) => void;
  onClick: () => void;
};

const dotTransition =
  "transition-[transform,fill] duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)]";

export function TimelineNodeDot({
  event,
  xScale,
  axisOffset = 0,
  getAxisY,
  showLabel,
  isHovered,
  isOpening = false,
  onHoverEnter,
  onHoverLeave,
  onClick,
}: TimelineNodeDotProps) {
  const x = xScale(event.timestamp) + axisOffset;
  const filled = showLabel || isHovered;
  const tier = visualImportanceTier(event.importance);
  const dotR = desktopDotRadius(event.importance, filled);
  const hitR = desktopHitRadius(event.importance);
  const spinR = dotR * 1.45;
  const spinCircumference = 2 * Math.PI * spinR;
  const spinStrokeWidth = tier === 0 ? 1.5 : 1.25;

  return (
    <g transform={`translate(${x}, ${getAxisY(x)})`}>
      <circle
        className="cursor-pointer outline-none"
        cx={0}
        cy={0}
        r={hitR}
        fill="transparent"
        onClick={onClick}
        onPointerEnter={() => onHoverEnter(event)}
        onPointerLeave={() => onHoverLeave(event)}
        onFocus={() => onHoverEnter(event)}
        tabIndex={0}
        role="button"
        aria-label={`${event.title}, ${event.dateLabel}`}
      />
      {isOpening && (
        <circle
          className="animate-timeline-dot-spin"
          cx={0}
          cy={0}
          r={spinR}
          fill="none"
          stroke={TIMELINE_INK}
          strokeWidth={spinStrokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${spinCircumference * 0.22} ${spinCircumference * 0.78}`}
          pointerEvents="none"
        />
      )}
      {isHovered && !isOpening && (
        <circle
          className="animate-timeline-dot-pulse"
          cx={0}
          cy={0}
          r={dotR}
          fill="none"
          stroke={TIMELINE_INK}
          strokeWidth={spinStrokeWidth}
          pointerEvents="none"
        />
      )}
      <circle
        className={cn(dotTransition, isHovered && "origin-center scale-[1.2] [transform-box:fill-box]")}
        cx={0}
        cy={0}
        r={dotR}
        fill={TIMELINE_INK}
        stroke={TIMELINE_INK}
        strokeWidth={filled ? (tier === 0 ? 2 : 1.5) : tier === 0 ? 1 : 0.75}
        pointerEvents="none"
      />
    </g>
  );
}
