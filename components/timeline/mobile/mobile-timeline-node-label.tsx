import {
  LABEL_BOX_HEIGHT,
  LABEL_RADIUS,
} from "@/lib/timeline/label-layout";
import { labelLeftLocalX, type VerticalLabelLayout } from "@/lib/timeline/vertical/label-layout";
import { MOBILE_TIMELINE_EDGE_MARGIN } from "@/lib/timeline/vertical/constants";
import type { PlottedEvent } from "@/lib/timeline/plot-data";

type MobileTimelineNodeLabelProps = {
  event: PlottedEvent;
  yScale: (timestamp: number) => number;
  getAxisX: (y: number) => number;
  layout: VerticalLabelLayout;
  viewportWidth: number;
  onClick: () => void;
};

export function MobileTimelineNodeLabel({
  event,
  yScale,
  getAxisX,
  layout,
  viewportWidth,
  onClick,
}: MobileTimelineNodeLabelProps) {
  const y = yScale(event.timestamp);
  const axisX = getAxisX(y);
  const labelWidth = layout.width;
  const labelLeft = Math.min(
    Math.max(axisX + labelLeftLocalX(layout.lane), MOBILE_TIMELINE_EDGE_MARGIN),
    Math.max(viewportWidth - labelWidth - MOBILE_TIMELINE_EDGE_MARGIN, MOBILE_TIMELINE_EDGE_MARGIN),
  );
  const labelTop = y - LABEL_BOX_HEIGHT / 2;

  return (
    <g
      className="cursor-pointer outline-none"
      transform={`translate(${labelLeft}, ${labelTop})`}
      onClick={(pointerEvent) => {
        pointerEvent.stopPropagation();
        onClick();
      }}
      tabIndex={0}
      role="button"
      aria-label={`${event.title}, ${event.dateLabel}`}
    >
      <rect
        width={labelWidth}
        height={LABEL_BOX_HEIGHT}
        rx={LABEL_RADIUS}
        ry={LABEL_RADIUS}
        className="fill-black stroke-black stroke-1"
      />
      <text
        x={labelWidth / 2}
        y={LABEL_BOX_HEIGHT / 2}
        textAnchor="middle"
        dominantBaseline="central"
        className="pointer-events-none text-sm font-medium tracking-wide fill-white"
      >
        {event.title}
      </text>
    </g>
  );
}
