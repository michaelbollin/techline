import { TIMELINE_EDGE_MARGIN } from "./constants";
import type { PlottedEvent } from "./plot-data";

/** Vertical label box height in px. */
export const LABEL_BOX_HEIGHT = 34;

/** Distance from axis to first label row. */
export const LABEL_OFFSET = 72;

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

type LabelRect = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

function laneVerticalBounds(lane: number): { top: number; bottom: number } {
  const top = -(LABEL_OFFSET + lane * LABEL_LANE_STEP);
  return { top, bottom: top + LABEL_BOX_HEIGHT };
}

function rectsOverlap(a: LabelRect, b: LabelRect, gap: number): boolean {
  return !(
    a.right + gap <= b.left ||
    b.right + gap <= a.left ||
    a.bottom + gap <= b.top ||
    b.bottom + gap <= a.top
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
  maxImportance: 1 | 2 | 3,
  viewportWidth: number,
  maxLanes: number,
  labelWidthFor: (event: PlottedEvent) => number,
  visibleSpanMs?: number,
): Map<string, LabelLayout> {
  const placements = new Map<string, LabelLayout>();
  const placed: LabelRect[] = [];
  const msPerYear = 365.25 * 86_400_000;
  const minGapPx =
    visibleSpanMs !== undefined && visibleSpanMs <= msPerYear * 2 ? 4 : LABEL_COLLISION_GAP;

  const sorted = [...events].sort((a, b) => {
    if (a.importance !== b.importance) {
      return a.importance - b.importance;
    }

    return a.timestamp - b.timestamp;
  });

  for (const event of sorted) {
    const centerX = x(event.timestamp);
    const labelWidth = labelWidthFor(event);
    const left = centerX - labelWidth / 2;
    const right = centerX + labelWidth / 2;

    if (left < TIMELINE_EDGE_MARGIN || right > viewportWidth - TIMELINE_EDGE_MARGIN) {
      placements.set(event.id, { showLabel: false, lane: 0, width: labelWidth });
      continue;
    }

    if (event.importance > maxImportance) {
      placements.set(event.id, { showLabel: false, lane: 0, width: labelWidth });
      continue;
    }

    let placedLabel = false;

    for (let lane = 0; lane < maxLanes; lane++) {
      const { top, bottom } = laneVerticalBounds(lane);
      const candidate: LabelRect = { left, right, top, bottom };
      const overlaps = placed.some((rect) =>
        rectsOverlap(rect, candidate, minGapPx),
      );

      if (!overlaps) {
        placed.push(candidate);
        placements.set(event.id, { showLabel: true, lane, width: labelWidth });
        placedLabel = true;
        break;
      }
    }

    if (!placedLabel) {
      placements.set(event.id, { showLabel: false, lane: 0, width: labelWidth });
    }
  }

  return placements;
}
