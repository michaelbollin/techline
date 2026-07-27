/**
 * Importance tiers (from content schema):
 * 1 — landmark / milestone (e.g. C, Java, Linux-era shifts)
 * 2 — standard / notable (releases, major standards)
 * 3 — dense / minor (patch-level, secondary milestones)
 */
export function maxImportanceForZoom(msPerPixel: number): 1 | 2 | 3 {
  const msPerDay = 86_400_000;

  if (msPerPixel > msPerDay * 20) {
    return 1;
  }

  if (msPerPixel > msPerDay * 4) {
    return 2;
  }

  return 3;
}

/** More lanes when zoomed in so year/month views can show clustered labels. */
export function maxLanesForZoom(msPerPixel: number, visibleSpanMs: number): number {
  const msPerDay = 86_400_000;
  const msPerYear = 365.25 * msPerDay;

  if (visibleSpanMs <= msPerYear * 1.5) {
    return 8;
  }
  if (visibleSpanMs <= msPerYear * 4) {
    return 6;
  }
  if (visibleSpanMs <= msPerYear * 15) {
    return 4;
  }
  if (msPerPixel > msPerDay * 8) {
    return 2;
  }

  return 3;
}
