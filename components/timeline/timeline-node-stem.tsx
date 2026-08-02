import { TIMELINE_INK, TIMELINE_STEM_HOVER_STROKE_WIDTH, TIMELINE_STEM_STROKE_WIDTH } from "@/lib/timeline/constants";
import { labelBottomLocalY, type LabelLayout } from "@/lib/timeline/label-layout";
import type { PlottedEvent } from "@/lib/timeline/plot-data";
import { cn } from "@/lib/cn";

type TimelineNodeStemProps = {
  event: PlottedEvent;
  xScale: (timestamp: number) => number;
  axisOffset?: number;
  getAxisY: (x: number) => number;
  layout: LabelLayout;
  stemStartY: number;
  isHovered?: boolean;
};

export function TimelineNodeStem({
  event,
  xScale,
  axisOffset = 0,
  getAxisY,
  layout,
  stemStartY,
  isHovered = false,
}: TimelineNodeStemProps) {
  const x = xScale(event.timestamp) + axisOffset;
  const axisY = getAxisY(x);
  const stemEndY = labelBottomLocalY(layout.lane);

  return (
    <line
      x1={x}
      x2={x}
      y1={axisY + stemStartY}
      y2={axisY + stemEndY}
      stroke={TIMELINE_INK}
      strokeWidth={isHovered ? TIMELINE_STEM_HOVER_STROKE_WIDTH : TIMELINE_STEM_STROKE_WIDTH}
      className={cn(
        "transition-[stroke-width] duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
      )}
    />
  );
}
