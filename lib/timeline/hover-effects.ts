/** Event IDs that trigger a full-page hover animation (Google Doodle–style). */
export const TIMELINE_HOVER_EFFECT_IDS = {
  "cd-rom-introduced": "cd-rom-introduced",
} as const;

export type TimelineHoverEffectId =
  (typeof TIMELINE_HOVER_EFFECT_IDS)[keyof typeof TIMELINE_HOVER_EFFECT_IDS];

export function getTimelineHoverEffectId(eventId: string): TimelineHoverEffectId | null {
  if (eventId in TIMELINE_HOVER_EFFECT_IDS) {
    return TIMELINE_HOVER_EFFECT_IDS[eventId as keyof typeof TIMELINE_HOVER_EFFECT_IDS];
  }

  return null;
}
