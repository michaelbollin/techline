import { TIMELINE_INK } from "@/lib/timeline/constants";
import { labelLeftLocalX, type VerticalLabelLayout } from "@/lib/timeline/vertical/label-layout";
import type { PlottedEvent } from "@/lib/timeline/plot-data";

type MobileTimelineNodeStemProps = {
  event: PlottedEvent;
  yScale: (timestamp: number) => number;
  getAxisX: (y: number) => number;
  layout: VerticalLabelLayout;
  stemStartX: number;
};

export function MobileTimelineNodeStem({
  event,
  yScale,
  getAxisX,
  layout,
  stemStartX,
}: MobileTimelineNodeStemProps) {
  const y = yScale(event.timestamp);
  const axisX = getAxisX(y);
  const stemEndX = labelLeftLocalX(layout.lane);

  return (
    <line
      x1={axisX + stemStartX}
      x2={axisX + stemEndX}
      y1={y}
      y2={y}
      stroke={TIMELINE_INK}
      strokeWidth={1}
    />
  );
}
