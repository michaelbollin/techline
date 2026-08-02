import { labelBottomLocalY, type LabelLayout } from "@/lib/timeline/label-layout";
import { desktopHitRadius } from "@/lib/timeline/dot-metrics";
import type { PlottedEvent } from "@/lib/timeline/plot-data";

/** Max expanded bubble height used to extend the stem hit zone upward. */
const STEM_HIT_BUBBLE_EXTENSION = 360;
const STEM_HIT_STROKE_WIDTH = 28;

type TimelineNodeStemHitProps = {
  event: PlottedEvent;
  xScale: (timestamp: number) => number;
  axisOffset?: number;
  getAxisY: (x: number) => number;
  layout: LabelLayout;
  stemStartY: number;
  onHover: (event: PlottedEvent | null) => void;
};

/** Invisible wide stem column so pointer can travel from dot to expanded bubble. */
export function TimelineNodeStemHit({
  event,
  xScale,
  axisOffset = 0,
  getAxisY,
  layout,
  stemStartY,
  onHover,
}: TimelineNodeStemHitProps) {
  const x = xScale(event.timestamp) + axisOffset;
  const axisY = getAxisY(x);
  const dotReach = desktopHitRadius(event.importance);
  const yBottom = axisY + Math.max(stemStartY, dotReach);
  const yTop = axisY + labelBottomLocalY(layout.lane) - STEM_HIT_BUBBLE_EXTENSION;

  return (
    <line
      x1={x}
      x2={x}
      y1={yTop}
      y2={yBottom}
      stroke="transparent"
      strokeWidth={STEM_HIT_STROKE_WIDTH}
      style={{ pointerEvents: "stroke" }}
      onPointerEnter={() => onHover(event)}
      onPointerLeave={() => onHover(null)}
      aria-hidden
    />
  );
}
