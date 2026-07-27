import { labelBottomLocalY, type LabelLayout } from "./label-layout";
import type { PlottedEvent } from "./plot-data";

export function computeStemStarts(
  events: PlottedEvent[],
  labelLayout: Map<string, LabelLayout>,
  xScale: (timestamp: number) => number,
): Map<string, number> {
  const starts = new Map<string, number>();
  const buckets = new Map<number, Array<{ id: string; lane: number }>>();

  for (const event of events) {
    const layout = labelLayout.get(event.id);
    if (!layout?.showLabel) {
      continue;
    }

    const bucketX = Math.round(xScale(event.timestamp));
    const bucket = buckets.get(bucketX) ?? [];
    bucket.push({ id: event.id, lane: layout.lane });
    buckets.set(bucketX, bucket);
  }

  for (const bucket of buckets.values()) {
    const lanes = bucket.map((item) => item.lane);

    for (const item of bucket) {
      const lowerLanes = lanes.filter((lane) => lane < item.lane);
      starts.set(
        item.id,
        lowerLanes.length > 0 ? labelBottomLocalY(Math.max(...lowerLanes)) : 0,
      );
    }
  }

  return starts;
}
