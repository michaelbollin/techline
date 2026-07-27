import { TIMELINE_INK, TIMELINE_PAPER } from "@/lib/timeline/constants";
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

function dotRadius(importance: PlottedEvent["importance"]): number {
  if (importance === 0) {
    return 7.5;
  }

  if (importance === 1) {
    return 6;
  }

  return 4.5;
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
  const dotR = dotRadius(event.importance);
  const filled = showLabel || isHovered;

  return (
    <g transform={`translate(${x}, ${getAxisY(x)})`}>
      <circle
        className={`timeline-node-dot ${isHovered ? "is-hovered" : ""} ${event.importance === 0 ? "is-pillar" : ""} ${showLabel ? "has-label" : ""}`}
        cx={0}
        cy={0}
        r={dotR}
        fill={filled ? TIMELINE_INK : TIMELINE_PAPER}
        stroke={TIMELINE_INK}
        strokeWidth={event.importance === 0 ? 2 : 1.5}
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
