import { LABEL_BOX_HEIGHT, LABEL_LANE_STEP, LABEL_OFFSET } from "./label-layout";

/**
 * Importance tiers (from content schema):
 * 0 — pillar / era-defining (sparse at full-timeline zoom)
 * 1 — landmark / milestone (e.g. C, Java, Linux-era shifts)
 * 2 — standard / notable (releases, major standards)
 * 3 — dense / minor (patch-level, secondary milestones)
 */
export function maxImportanceForZoom(
  msPerPixel: number,
  visibleSpanMs: number,
): 0 | 1 | 2 | 3 {
  const msPerDay = 86_400_000;
  const msPerYear = 365.25 * msPerDay;

  let tier: 0 | 1 | 2 | 3;
  if (msPerPixel > msPerDay * 20) {
    tier = 0;
  } else if (msPerPixel > msPerDay * 4) {
    tier = 1;
  } else if (msPerPixel > msPerDay) {
    tier = 2;
  } else {
    tier = 3;
  }

  // Month-scale views stay readable — dense tier-3 labels only when zoomed tight.
  if (visibleSpanMs > msPerYear * 0.75) {
    tier = Math.min(tier, 1) as 0 | 1 | 2 | 3;
  } else if (visibleSpanMs > msPerYear * 0.3) {
    tier = Math.min(tier, 2) as 0 | 1 | 2 | 3;
  }

  return tier;
}

/** Lane budget from zoom level — kept low to avoid tall label stacks. */
export function maxLanesForZoom(msPerPixel: number, visibleSpanMs: number): number {
  const msPerDay = 86_400_000;
  const msPerYear = 365.25 * msPerDay;

  if (visibleSpanMs <= msPerYear * 0.25) {
    return 4;
  }
  if (visibleSpanMs <= msPerYear) {
    return 3;
  }
  if (visibleSpanMs <= msPerYear * 4) {
    return 2;
  }
  if (msPerPixel > msPerDay * 8) {
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
