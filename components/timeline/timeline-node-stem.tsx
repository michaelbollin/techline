import { TIMELINE_INK } from "@/lib/timeline/constants";
import { labelBottomLocalY, type LabelLayout } from "@/lib/timeline/label-layout";
import type { PlottedEvent } from "@/lib/timeline/plot-data";

type TimelineNodeStemProps = {
  event: PlottedEvent;
  xScale: (timestamp: number) => number;
  getAxisY: (x: number) => number;
  layout: LabelLayout;
  stemStartY: number;
};

export function TimelineNodeStem({
  event,
  xScale,
  getAxisY,
  layout,
  stemStartY,
}: TimelineNodeStemProps) {
  const x = xScale(event.timestamp);
  const axisY = getAxisY(x);
  const stemEndY = labelBottomLocalY(layout.lane);

  return (
    <line
      x1={x}
      x2={x}
      y1={axisY + stemStartY}
      y2={axisY + stemEndY}
      stroke={TIMELINE_INK}
      strokeWidth={1}
    />
  );
}
