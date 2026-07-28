import { LABEL_BOX_HEIGHT, LABEL_COLLISION_GAP } from "@/lib/timeline/label-layout";
import type { Importance } from "@/lib/timeline/importance";
import type { PlottedEvent } from "@/lib/timeline/plot-data";

import { MOBILE_LABEL_LANE_STEP, MOBILE_LABEL_OFFSET, MOBILE_TIMELINE_EDGE_MARGIN } from "./constants";

export type VerticalLabelLayout = {
  showLabel: boolean;
  lane: number;
  width: number;
};

export function labelLeftLocalX(lane: number): number {
  return MOBILE_LABEL_OFFSET + lane * MOBILE_LABEL_LANE_STEP;
}

type PlacedLabel = {
  lane: number;
  top: number;
  bottom: number;
};

function overlapsVerticallyInLane(
  placed: PlacedLabel[],
  lane: number,
  top: number,
  bottom: number,
  gap: number,
): boolean {
  return placed.some(
    (rect) =>
      rect.lane === lane &&
      !(rect.bottom + gap <= top || bottom + gap <= rect.top),
  );
}

export function resolveVerticalLabelLayout(
  events: PlottedEvent[],
  y: (timestamp: number) => number,
  axisX: number,
  maxImportance: Importance,
  viewportWidth: number,
  maxLanes: number,
  labelWidthFor: (event: PlottedEvent) => number,
  visibleSpanMs?: number,
): Map<string, VerticalLabelLayout> {
  const placements = new Map<string, VerticalLabelLayout>();
  const placed: PlacedLabel[] = [];
  const msPerYear = 365.25 * 86_400_000;
  const minGapPx =
    visibleSpanMs !== undefined && visibleSpanMs <= msPerYear * 0.25 ? 4 : LABEL_COLLISION_GAP;

  const sorted = [...events].sort((a, b) => {
    if (a.importance !== b.importance) {
      return a.importance - b.importance;
    }

    return a.timestamp - b.timestamp;
  });

  for (const event of sorted) {
    const centerY = y(event.timestamp);
    const labelWidth = labelWidthFor(event);
    const top = centerY - LABEL_BOX_HEIGHT / 2;
    const bottom = centerY + LABEL_BOX_HEIGHT / 2;

    if (event.importance > maxImportance) {
      placements.set(event.id, { showLabel: false, lane: 0, width: labelWidth });
      continue;
    }

    let placedLabel = false;

    for (let lane = 0; lane < maxLanes; lane++) {
      const left = axisX + labelLeftLocalX(lane);
      const right = left + labelWidth;

      if (right > viewportWidth - MOBILE_TIMELINE_EDGE_MARGIN) {
        continue;
      }

      if (overlapsVerticallyInLane(placed, lane, top, bottom, minGapPx)) {
        continue;
      }

      placed.push({ lane, top, bottom });
      placements.set(event.id, { showLabel: true, lane, width: labelWidth });
      placedLabel = true;
      break;
    }

    if (!placedLabel) {
      placements.set(event.id, { showLabel: false, lane: 0, width: labelWidth });
    }
  }

  return placements;
}
