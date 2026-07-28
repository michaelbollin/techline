import { TIMELINE_INK } from "@/lib/timeline/constants";
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
  if (importance === 0) {
    return 7.5;
  }

  if (importance === 1) {
    return 6;
  }

  return 4.5;
}

function dotRadius(importance: PlottedEvent["importance"], filled: boolean): number {
  if (filled) {
    if (importance === 0) {
      return 7.5;
    }

    if (importance === 1) {
      return 6;
    }

    return 4.5;
  }

  if (importance === 0) {
    return 3.75;
  }

  if (importance === 1) {
    return 3;
  }

  return 2.25;
}

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
  const dotR = dotRadius(event.importance, filled);
  const hitR = hitRadius(event.importance);

  return (
    <g transform={`translate(${x}, ${getAxisY(x)})`}>
      <circle
        className="timeline-node-dot-hit"
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
        className={`timeline-node-dot ${isHovered ? "is-hovered" : ""} ${event.importance === 0 ? "is-pillar" : ""} ${showLabel ? "has-label" : ""}`}
        cx={0}
        cy={0}
        r={dotR}
        fill={TIMELINE_INK}
        stroke={TIMELINE_INK}
        strokeWidth={filled ? (event.importance === 0 ? 2 : 1.5) : event.importance === 0 ? 1 : 0.75}
        pointerEvents="none"
      />
    </g>
  );
}
