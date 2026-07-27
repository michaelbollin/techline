import { formatEventDate } from "./format";
import type { TimelineEvent } from "./schema";

export type PlottedEvent = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  importance: 1 | 2 | 3;
  timestamp: number;
  dateLabel: string;
};

function eventToIsoDate(date: string, precision: TimelineEvent["datePrecision"]): string {
  if (precision === "decade") {
    const decade = Number.parseInt(date.replace(/\D/g, ""), 10);
    return `${decade + 5}-01-01`;
  }

  if (precision === "year") {
    return `${date}-07-01`;
  }

  if (precision === "month") {
    const [year, month] = date.split("-");
    return `${year}-${month}-15`;
  }

  return date;
}

export function eventToTimestamp(date: string, precision: TimelineEvent["datePrecision"]): number {
  return Date.parse(`${eventToIsoDate(date, precision)}T12:00:00Z`);
}

export function toPlottedEvents(events: TimelineEvent[]): PlottedEvent[] {
  return events
    .map((event) => ({
      id: event.id,
      slug: event.slug,
      title: event.title,
      summary: event.summary,
      importance: event.importance,
      timestamp: eventToTimestamp(event.date, event.datePrecision),
      dateLabel: formatEventDate(event.date, event.datePrecision),
    }))
    .sort((a, b) => a.timestamp - b.timestamp);
}

export function getTimeExtent(events: PlottedEvent[]): [number, number] {
  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;

  for (const event of events) {
    min = Math.min(min, event.timestamp);
    max = Math.max(max, event.timestamp);
  }

  const pad = (max - min) * 0.06;
  return [min - pad, max + pad];
}

export type TimelineNode =
  | { kind: "event"; event: PlottedEvent }
  | { kind: "cluster"; events: PlottedEvent[]; timestamp: number; count: number };

export function clusterEvents(
  events: PlottedEvent[],
  x: (timestamp: number) => number,
  gapPx: number,
): TimelineNode[] {
  const nodes: TimelineNode[] = [];
  let bucket: PlottedEvent[] = [];

  const flush = () => {
    if (bucket.length === 0) {
      return;
    }

    if (bucket.length === 1) {
      nodes.push({ kind: "event", event: bucket[0]! });
    } else {
      const timestamp =
        bucket.reduce((sum, event) => sum + event.timestamp, 0) / bucket.length;
      nodes.push({ kind: "cluster", events: [...bucket], timestamp, count: bucket.length });
    }

    bucket = [];
  };

  for (const event of events) {
    if (bucket.length === 0) {
      bucket = [event];
      continue;
    }

    const last = bucket[bucket.length - 1]!;
    if (x(event.timestamp) - x(last.timestamp) < gapPx) {
      bucket.push(event);
    } else {
      flush();
      bucket = [event];
    }
  }

  flush();
  return nodes;
}

export function estimateLabelWidth(title: string): number {
  // Kept for tests/fallback — prefer measureLabelWidth in the browser.
  return Math.max(56, Math.ceil(title.length * 5.6) + 20);
}

/** Vertical label box height in px. */
export const LABEL_BOX_HEIGHT = 28;

/** Distance from axis to first label row. */
export const LABEL_OFFSET = 46;

/** Horizontal gap between adjacent labels. */
export const LABEL_COLLISION_GAP = 8;

/** Vertical step between label rows. */
export const LABEL_LANE_STEP = LABEL_BOX_HEIGHT + LABEL_COLLISION_GAP;

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

/**
 * Importance tiers (from content schema):
 * 1 — landmark / milestone (e.g. C, Java, Linux-era shifts)
 * 2 — standard / notable (releases, major standards)
 * 3 — dense / minor (patch-level, secondary milestones)
 */
export function maxImportanceForZoom(msPerPixel: number): 1 | 2 | 3 {
  const msPerDay = 86_400_000;

  if (msPerPixel > msPerDay * 12) {
    return 1;
  }

  if (msPerPixel > msPerDay * 2) {
    return 2;
  }

  return 3;
}

/** Fewer stacked rows when zoomed out — avoids the vertical wall of labels. */
export function maxLanesForZoom(msPerPixel: number): number {
  const msPerDay = 86_400_000;

  if (msPerPixel > msPerDay * 12) {
    return 1;
  }

  if (msPerPixel > msPerDay * 2) {
    return 3;
  }

  if (msPerPixel > msPerDay * 0.4) {
    return 6;
  }

  return 10;
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
): Map<string, LabelLayout> {
  const placements = new Map<string, LabelLayout>();
  const placed: LabelRect[] = [];

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

    if (right < 0 || left > viewportWidth) {
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
        rectsOverlap(rect, candidate, LABEL_COLLISION_GAP),
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
