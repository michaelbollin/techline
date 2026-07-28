import { labelLeftLocalX, type VerticalLabelLayout } from "./label-layout";
import type { PlottedEvent } from "@/lib/timeline/plot-data";

export function computeVerticalStemStarts(
  events: PlottedEvent[],
  labelLayout: Map<string, VerticalLabelLayout>,
  yScale: (timestamp: number) => number,
): Map<string, number> {
  const starts = new Map<string, number>();
  const buckets = new Map<number, Array<{ id: string; lane: number; width: number }>>();

  for (const event of events) {
    const layout = labelLayout.get(event.id);
    if (!layout?.showLabel) {
      continue;
    }

    const bucketY = Math.round(yScale(event.timestamp));
    const bucket = buckets.get(bucketY) ?? [];
    bucket.push({ id: event.id, lane: layout.lane, width: layout.width });
    buckets.set(bucketY, bucket);
  }

  for (const bucket of buckets.values()) {
    for (const item of bucket) {
      const innerLanes = bucket.filter((entry) => entry.lane < item.lane);
      if (innerLanes.length === 0) {
        starts.set(item.id, 0);
        continue;
      }

      const maxRight = Math.max(
        ...innerLanes.map((entry) => labelLeftLocalX(entry.lane) + entry.width),
      );
      starts.set(item.id, maxRight);
    }
  }

  return starts;
}
