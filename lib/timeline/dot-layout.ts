import type { Importance } from "./importance";
import type { PlottedEvent } from "./plot-data";
import { DOT_COLLISION_GAP } from "./dot-metrics";

export type DotLayout = {
  showDot: boolean;
};

type PlacedDot = {
  center: number;
  radius: number;
};

function overlapsOnAxis(
  placed: PlacedDot[],
  center: number,
  radius: number,
  gap: number,
): boolean {
  return placed.some((dot) => Math.abs(center - dot.center) < dot.radius + radius + gap);
}

function sortByImportance(events: PlottedEvent[]): PlottedEvent[] {
  return [...events].sort((a, b) => {
    if (a.importance !== b.importance) {
      return a.importance - b.importance;
    }

    return a.timestamp - b.timestamp;
  });
}

/**
 * Place dots by importance first, then fill remaining axis space with lower-importance
 * events when they fit without overlapping.
 */
export function resolveDotLayout(
  events: PlottedEvent[],
  position: (timestamp: number) => number,
  maxImportance: Importance,
  viewportMin: number,
  viewportMax: number,
  radiusFor: (event: PlottedEvent) => number,
  options?: {
    gap?: number;
    forceVisibleIds?: ReadonlySet<string>;
  },
): Map<string, DotLayout> {
  const placements = new Map<string, DotLayout>();
  const placed: PlacedDot[] = [];
  const gap = options?.gap ?? DOT_COLLISION_GAP;
  const forceVisibleIds = options?.forceVisibleIds;
  const sorted = sortByImportance(events);

  const tryPlace = (event: PlottedEvent, forced: boolean): void => {
    const center = position(event.timestamp);
    const radius = radiusFor(event);

    if (center - radius < viewportMin || center + radius > viewportMax) {
      placements.set(event.id, { showDot: forced });
      if (forced) {
        placed.push({ center, radius });
      }
      return;
    }

    if (!forced && overlapsOnAxis(placed, center, radius, gap)) {
      placements.set(event.id, { showDot: false });
      return;
    }

    placed.push({ center, radius });
    placements.set(event.id, { showDot: true });
  };

  for (const event of sorted) {
    if (forceVisibleIds?.has(event.id)) {
      tryPlace(event, true);
    }
  }

  for (const event of sorted) {
    if (forceVisibleIds?.has(event.id)) {
      continue;
    }

    if (event.importance > maxImportance) {
      continue;
    }

    tryPlace(event, false);
  }

  for (const event of sorted) {
    if (forceVisibleIds?.has(event.id) || event.importance <= maxImportance) {
      continue;
    }

    if (placements.get(event.id)?.showDot) {
      continue;
    }

    tryPlace(event, false);
  }

  for (const event of sorted) {
    if (!placements.has(event.id)) {
      placements.set(event.id, { showDot: false });
    }
  }

  return placements;
}
