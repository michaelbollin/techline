import { cn } from "@/lib/cn";
import { TIMELINE_INK } from "@/lib/timeline/constants";
import { desktopDotRadius, desktopHitRadius } from "@/lib/timeline/dot-metrics";
import { visualImportanceTier } from "@/lib/timeline/importance";
import type { PlottedEvent } from "@/lib/timeline/plot-data";

type TimelineNodeDotProps = {
  event: PlottedEvent;
  xScale: (timestamp: number) => number;
  axisOffset?: number;
  getAxisY: (x: number) => number;
  showLabel: boolean;
  isHovered: boolean;
  onHover: (event: PlottedEvent | null) => void;
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
  onHover,
  onClick,
}: TimelineNodeDotProps) {
  const x = xScale(event.timestamp) + axisOffset;
  const filled = showLabel || isHovered;
  const tier = visualImportanceTier(event.importance);
  const dotR = desktopDotRadius(event.importance, filled);
  const hitR = desktopHitRadius(event.importance);

  return (
    <g transform={`translate(${x}, ${getAxisY(x)})`}>
      <circle
        className="cursor-pointer outline-none"
        cx={0}
        cy={0}
        r={hitR}
        fill="transparent"
        onClick={onClick}
        onMouseEnter={() => onHover(event)}
        onFocus={() => onHover(event)}
        tabIndex={0}
        role="button"
        aria-label={`${event.title}, ${event.dateLabel}`}
      />
      <circle
        className={cn(dotTransition, isHovered && "scale-[1.2]")}
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
