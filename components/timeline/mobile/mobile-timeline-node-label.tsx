import {
  MOBILE_LABEL_BOX_HEIGHT,
  MOBILE_LABEL_ICON_GAP,
  MOBILE_LABEL_ICON_SIZE,
  MOBILE_LABEL_PADDING_X,
  MOBILE_LABEL_RADIUS,
} from "@/lib/timeline/vertical/label-metrics";
import { labelLeftLocalX, type VerticalLabelLayout } from "@/lib/timeline/vertical/label-layout";
import { MOBILE_TIMELINE_EDGE_MARGIN } from "@/lib/timeline/vertical/constants";
import type { PlottedEvent } from "@/lib/timeline/plot-data";
import { TimelineLabelContent } from "@/components/timeline/timeline-label-content";

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
  const labelTop = y - MOBILE_LABEL_BOX_HEIGHT / 2;

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
        height={MOBILE_LABEL_BOX_HEIGHT}
        rx={MOBILE_LABEL_RADIUS}
        ry={MOBILE_LABEL_RADIUS}
        className="fill-black stroke-black stroke-1"
      />
      <TimelineLabelContent
        title={event.title}
        themeId={event.themeId}
        width={labelWidth}
        height={MOBILE_LABEL_BOX_HEIGHT}
        paddingX={MOBILE_LABEL_PADDING_X}
        iconSize={MOBILE_LABEL_ICON_SIZE}
        iconGap={MOBILE_LABEL_ICON_GAP}
        textClassName="pointer-events-none text-xs font-medium tracking-wide fill-white"
        iconClassName="text-white"
      />
    </g>
  );
}
