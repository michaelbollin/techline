import { cn } from "@/lib/cn";
import {
  LABEL_BOX_HEIGHT,
  LABEL_RADIUS,
  labelTopLocalY,
  type LabelLayout,
} from "@/lib/timeline/label-layout";
import { TIMELINE_LABEL_EDGE_INSET } from "@/lib/timeline/constants";
import {
  LABEL_ICON_GAP,
  LABEL_ICON_SIZE,
  LABEL_PADDING_X,
} from "@/lib/timeline/measure-label";
import type { PlottedEvent } from "@/lib/timeline/plot-data";
import { TimelineLabelContent } from "@/components/timeline/timeline-label-content";

type TimelineNodeLabelProps = {
  event: PlottedEvent;
  xScale: (timestamp: number) => number;
  getAxisY: (x: number) => number;
  layout: LabelLayout;
  viewportWidth: number;
  isHovered: boolean;
  onHover: (event: PlottedEvent | null) => void;
  onClick: () => void;
};

const labelTransition =
  "transition-[transform,fill] duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)]";

export function TimelineNodeLabel({
  event,
  xScale,
  getAxisY,
  layout,
  viewportWidth,
  isHovered,
  onHover,
  onClick,
}: TimelineNodeLabelProps) {
  const x = xScale(event.timestamp);
  const labelWidth = layout.width;
  const labelY = getAxisY(x) + labelTopLocalY(layout.lane);
  const labelLeft = Math.min(
    Math.max(x - labelWidth / 2, TIMELINE_LABEL_EDGE_INSET),
    Math.max(viewportWidth - labelWidth - TIMELINE_LABEL_EDGE_INSET, TIMELINE_LABEL_EDGE_INSET),
  );

  return (
    <g
      className="cursor-pointer outline-none"
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
          title={event.title}
          themeId={event.themeId}
          width={labelWidth}
          height={LABEL_BOX_HEIGHT}
          paddingX={LABEL_PADDING_X}
          iconSize={LABEL_ICON_SIZE}
          iconGap={LABEL_ICON_GAP}
          textClassName={cn(
            labelTransition,
            "pointer-events-none text-sm font-medium tracking-wide",
            isHovered ? "fill-black" : "fill-white",
          )}
          iconClassName={cn(
            labelTransition,
            isHovered ? "text-black" : "text-white",
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
