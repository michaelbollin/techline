import {
  LABEL_BOX_HEIGHT,
  LABEL_RADIUS,
  labelTopLocalY,
  type LabelLayout,
} from "@/lib/timeline/label-layout";
import { TIMELINE_LABEL_EDGE_INSET } from "@/lib/timeline/constants";
import type { PlottedEvent } from "@/lib/timeline/plot-data";

type TimelineNodeLabelProps = {
  event: PlottedEvent;
  xScale: (timestamp: number) => number;
  axisY: number;
  layout: LabelLayout;
  viewportWidth: number;
  isHovered: boolean;
  onHover: (event: PlottedEvent | null) => void;
  onClick: () => void;
};

export function TimelineNodeLabel({
  event,
  xScale,
  axisY,
  layout,
  viewportWidth,
  isHovered,
  onHover,
  onClick,
}: TimelineNodeLabelProps) {
  const x = xScale(event.timestamp);
  const labelWidth = layout.width;
  const labelY = axisY + labelTopLocalY(layout.lane);
  const labelLeft = Math.min(
    Math.max(x - labelWidth / 2, TIMELINE_LABEL_EDGE_INSET),
    Math.max(viewportWidth - labelWidth - TIMELINE_LABEL_EDGE_INSET, TIMELINE_LABEL_EDGE_INSET),
  );

  return (
    <g
      className="timeline-node-label"
      transform={`translate(${labelLeft}, ${labelY})`}
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
          y={LABEL_BOX_HEIGHT / 2 + 5}
          textAnchor="middle"
          className="timeline-node-label-text"
        >
          {event.title}
        </text>
      </g>
    </g>
  );
}
