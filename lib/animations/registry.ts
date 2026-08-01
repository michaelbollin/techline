/** Maps timeline event IDs to reusable animation IDs. */
export const EVENT_ANIMATION_IDS = {
  "cd-rom-introduced": "cd-rom",
  "tony-hoare-quicksort-published": "quicksort",
  "git-created": "git-branches",
  "bell-labs-transistor-invented": "transistor",
  "ballmer-developers-chant": "ballmer-developers",
  "gates-internet-tidal-wave-memo": "internet-tidal-wave",
  "y2k-rollover": "y2k-rollover",
  "worldwideweb-browser": "world-wide-web",
  "linux-kernel-announced": "linux-kernel",
} as const;

export type AnimationId = (typeof EVENT_ANIMATION_IDS)[keyof typeof EVENT_ANIMATION_IDS];

export function getAnimationIdForEvent(eventId: string): AnimationId | null {
  if (eventId in EVENT_ANIMATION_IDS) {
    return EVENT_ANIMATION_IDS[eventId as keyof typeof EVENT_ANIMATION_IDS];
  }

  return null;
}
