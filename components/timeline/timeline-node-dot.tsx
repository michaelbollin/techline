import { cn } from "@/lib/cn";
import { TIMELINE_INK } from "@/lib/timeline/constants";
import { visualImportanceTier } from "@/lib/timeline/importance";
import type { PlottedEvent } from "@/lib/timeline/plot-data";

type TimelineNodeDotProps = {
  event: PlottedEvent;
  xScale: (timestamp: number) => number;
  getAxisY: (x: number) => number;
  showLabel: boolean;
  isHovered: boolean;
  onHover: (event: PlottedEvent | null) => void;
  onClick: () => void;
};

function hitRadius(importance: PlottedEvent["importance"]): number {
  const tier = visualImportanceTier(importance);

  if (tier === 0) {
    return 7.5;
  }

  if (tier === 1) {
    return 6;
  }

  return 4.5;
}

function dotRadius(importance: PlottedEvent["importance"], filled: boolean): number {
  const tier = visualImportanceTier(importance);

  if (filled) {
    if (tier === 0) {
      return 7.5;
    }

    if (tier === 1) {
      return 6;
    }

    return 4.5;
  }

  if (tier === 0) {
    return 3.75;
  }

  if (tier === 1) {
    return 3;
  }

  return 2.25;
}

const dotTransition =
  "transition-[transform,fill] duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)]";

export function TimelineNodeDot({
  event,
  xScale,
  getAxisY,
  showLabel,
  isHovered,
  onHover,
  onClick,
}: TimelineNodeDotProps) {
  const x = xScale(event.timestamp);
  const filled = showLabel || isHovered;
  const tier = visualImportanceTier(event.importance);
  const dotR = dotRadius(event.importance, filled);
  const hitR = hitRadius(event.importance);

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
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover(event)}
        onBlur={() => onHover(null)}
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
