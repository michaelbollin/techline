import { TIMELINE_EDGE_MARGIN } from "./constants";
import type { Importance } from "./importance";
import type { PlottedEvent } from "./plot-data";

/** Vertical label box height in px. */
export const LABEL_BOX_HEIGHT = 36;

/** Distance from axis to first label row. */
export const LABEL_OFFSET = 64;

/** Horizontal gap between adjacent labels. */
export const LABEL_COLLISION_GAP = 8;

/** Vertical step between label rows. */
export const LABEL_LANE_STEP = LABEL_BOX_HEIGHT + LABEL_COLLISION_GAP;

export const LABEL_RADIUS = LABEL_BOX_HEIGHT / 2;

/** Label top edge in local coords (axis at y=0, positive y is below axis). */
export function labelTopLocalY(lane: number): number {
  return -(LABEL_OFFSET + lane * LABEL_LANE_STEP);
}

/** Label bottom edge in local coords. */
export function labelBottomLocalY(lane: number): number {
  return labelTopLocalY(lane) + LABEL_BOX_HEIGHT;
}

type PlacedLabel = {
  lane: number;
  left: number;
  right: number;
};

function overlapsHorizontallyInLane(
  placed: PlacedLabel[],
  lane: number,
  left: number,
  right: number,
  gap: number,
): boolean {
  return placed.some(
    (rect) =>
      rect.lane === lane &&
      !(rect.right + gap <= left || right + gap <= rect.left),
  );
}

export type LabelLayout = {
  showLabel: boolean;
  lane: number;
  width: number;
};

/** Place labels by importance; skip any that would overlap an existing label box. */
export function resolveLabelLayout(
  events: PlottedEvent[],
  x: (timestamp: number) => number,
  maxImportance: Importance,
  viewportWidth: number,
  maxLanes: number,
  labelWidthFor: (event: PlottedEvent) => number,
  visibleSpanMs?: number,
): Map<string, LabelLayout> {
  const placements = new Map<string, LabelLayout>();
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

  const tryPlace = (event: PlottedEvent): boolean => {
    const centerX = x(event.timestamp);
    const labelWidth = labelWidthFor(event);
    const left = centerX - labelWidth / 2;
    const right = centerX + labelWidth / 2;

    if (left < TIMELINE_EDGE_MARGIN || right > viewportWidth - TIMELINE_EDGE_MARGIN) {
      placements.set(event.id, { showLabel: false, lane: 0, width: labelWidth });
      return false;
    }

    for (let lane = 0; lane < maxLanes; lane++) {
      if (overlapsHorizontallyInLane(placed, lane, left, right, minGapPx)) {
        continue;
      }

      placed.push({ lane, left, right });
      placements.set(event.id, { showLabel: true, lane, width: labelWidth });
      return true;
    }

    placements.set(event.id, { showLabel: false, lane: 0, width: labelWidth });
    return false;
  };

  for (const event of sorted) {
    if (event.importance > maxImportance) {
      continue;
    }

    tryPlace(event);
  }

  for (const event of sorted) {
    if (event.importance <= maxImportance || placements.get(event.id)?.showLabel) {
      continue;
    }

    tryPlace(event);
  }

  for (const event of sorted) {
    if (!placements.has(event.id)) {
      placements.set(event.id, { showLabel: false, lane: 0, width: 0 });
    }
  }

  return placements;
}
