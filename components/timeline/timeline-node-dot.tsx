import { TIMELINE_INK, TIMELINE_PAPER } from "@/lib/timeline/constants";
import type { PlottedEvent } from "@/lib/timeline/plot-data";

type TimelineNodeDotProps = {
  event: PlottedEvent;
  xScale: (timestamp: number) => number;
  axisY: number;
  isHovered: boolean;
  isLandmark: boolean;
  onHover: (event: PlottedEvent | null) => void;
  onClick: () => void;
};

export function TimelineNodeDot({
  event,
  xScale,
  axisY,
  isHovered,
  isLandmark,
  onHover,
  onClick,
}: TimelineNodeDotProps) {
  const x = xScale(event.timestamp);
  const dotR = isLandmark ? 6 : 4.5;

  return (
    <g transform={`translate(${x}, ${axisY})`}>
      <circle
        className={`timeline-node-dot ${isHovered ? "is-hovered" : ""}`}
        cx={0}
        cy={0}
        r={dotR}
        fill={isHovered || isLandmark ? TIMELINE_INK : TIMELINE_PAPER}
        stroke={TIMELINE_INK}
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
