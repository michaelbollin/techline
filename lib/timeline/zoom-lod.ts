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

  if (msPerPixel > msPerDay * 0.08) {
    return 2;
  }

  return 4;
}
