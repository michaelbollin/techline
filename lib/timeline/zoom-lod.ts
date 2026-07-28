import { LABEL_BOX_HEIGHT, LABEL_LANE_STEP, LABEL_OFFSET } from "./label-layout";
import { IMPORTANCE_MAX, type Importance } from "./importance";

const MS_PER_DAY = 86_400_000;
const MS_PER_YEAR = 365.25 * MS_PER_DAY;

/**
 * Importance tiers (from content schema, 0–9):
 * 0 — pillar / era-defining (sparse at full-timeline zoom)
 * 1–2 — landmark / platform shift
 * 3–5 — major / notable release or standard
 * 6–7 — standard / annual iteration
 * 8–9 — dense / minor (hidden until zoomed tight)
 */
export function maxImportanceForZoom(
  msPerPixel: number,
  visibleSpanMs: number,
): Importance {
  let tier: number;
  if (msPerPixel > MS_PER_DAY * 60) {
    tier = 0;
  } else if (msPerPixel > MS_PER_DAY * 20) {
    tier = 1;
  } else if (msPerPixel > MS_PER_DAY * 8) {
    tier = 2;
  } else if (msPerPixel > MS_PER_DAY * 4) {
    tier = 3;
  } else if (msPerPixel > MS_PER_DAY * 2) {
    tier = 4;
  } else if (msPerPixel > MS_PER_DAY) {
    tier = 5;
  } else if (msPerPixel > MS_PER_DAY / 4) {
    tier = 6;
  } else if (msPerPixel > MS_PER_DAY / 12) {
    tier = 7;
  } else if (msPerPixel > MS_PER_DAY / 48) {
    tier = 8;
  } else {
    tier = IMPORTANCE_MAX;
  }

  if (visibleSpanMs > MS_PER_YEAR * 8) {
    tier = Math.min(tier, 1);
  } else if (visibleSpanMs > MS_PER_YEAR * 3) {
    tier = Math.min(tier, 3);
  } else if (visibleSpanMs > MS_PER_YEAR) {
    tier = Math.min(tier, 6);
  }

  return tier as Importance;
}

/** Lane budget from zoom level — more lanes when zoomed in tight. */
export function maxLanesForZoom(msPerPixel: number, visibleSpanMs: number): number {
  if (visibleSpanMs <= MS_PER_YEAR * 0.15) {
    return 6;
  }
  if (visibleSpanMs <= MS_PER_YEAR * 0.5) {
    return 5;
  }
  if (visibleSpanMs <= MS_PER_YEAR) {
    return 4;
  }
  if (visibleSpanMs <= MS_PER_YEAR * 3) {
    return 4;
  }
  if (visibleSpanMs <= MS_PER_YEAR * 8) {
    return 3;
  }
  if (msPerPixel > MS_PER_DAY * 8) {
    return 2;
  }

  return 2;
}

/** Never stack more lanes than fit above the axis (header chrome inset). */
export function maxLanesForViewport(
  viewportHeight: number,
  axisYRatio: number,
  topInset = 96,
): number {
  const axisY = viewportHeight * axisYRatio;
  const available = axisY - topInset - LABEL_OFFSET - LABEL_BOX_HEIGHT;

  if (available <= 0) {
    return 1;
  }

  return Math.max(1, Math.floor(available / LABEL_LANE_STEP) + 1);
}
