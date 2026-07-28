/** Importance tiers for zoom-based label disclosure (0 = most important). */
export const IMPORTANCE_LEVELS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

export type Importance = (typeof IMPORTANCE_LEVELS)[number];

export const IMPORTANCE_MIN = 0 satisfies Importance;
export const IMPORTANCE_MAX = 9 satisfies Importance;

/**
 * Semantic guide for authors:
 * 0 — pillar / era-defining (sparse at full-timeline zoom)
 * 1–2 — landmark / platform shift
 * 3–5 — major / notable release or standard
 * 6–7 — standard / annual iteration
 * 8–9 — dense / minor (hidden until zoomed tight)
 */
export const IMPORTANCE_LABELS: Record<Importance, string | null> = {
  0: "Pillar",
  1: "Landmark",
  2: "Landmark",
  3: null,
  4: null,
  5: null,
  6: null,
  7: null,
  8: null,
  9: null,
};

/** Map 10 content tiers to 4 visual dot sizes. */
export function visualImportanceTier(importance: Importance): 0 | 1 | 2 | 3 {
  if (importance <= 1) {
    return 0;
  }

  if (importance <= 4) {
    return 1;
  }

  if (importance <= 7) {
    return 2;
  }

  return 3;
}

/** Migrate legacy 4-tier values to the 0–9 scale. */
export function migrateLegacyImportance(value: number): Importance {
  const legacyMap: Record<number, Importance> = {
    0: 0,
    1: 3,
    2: 6,
    3: 9,
  };

  if (value in legacyMap) {
    return legacyMap[value];
  }

  if (value >= IMPORTANCE_MIN && value <= IMPORTANCE_MAX) {
    return value as Importance;
  }

  throw new Error(`Invalid importance value: ${value}`);
}
