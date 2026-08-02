import type { QuoteClipAnimationId } from "./quote-clip";

/** Maps timeline event IDs to reusable animation IDs. */
export const EVENT_ANIMATION_IDS = {
  "cd-rom-introduced": "cd-rom",
  "tony-hoare-quicksort-published": "quicksort",
  "git-created": "git-branches",
  "bell-labs-transistor-invented": "transistor",
  "ballmer-developers-chant": "ballmer-developers",
  "ballmer-web-developers-chant": "ballmer-web-developers",
  "ballmer-linux-cancer": "ballmer-linux-cancer",
  "gates-internet-tidal-wave-memo": "internet-tidal-wave",
  "y2k-rollover": "y2k-rollover",
  "worldwideweb-browser": "world-wide-web",
  "linux-kernel-announced": "linux-kernel",
  "ibm-pc-5150-released": "ibm-pc-5150",
  "jack-kilby-integrated-circuit": "integrated-circuit",
  "altman-ai-goes-wrong": "altman-senate",
  "jobs-flash-closed-system": "jobs-flash",
} as const;

type BuiltInAnimationId = (typeof EVENT_ANIMATION_IDS)[keyof typeof EVENT_ANIMATION_IDS];

export type AnimationId = BuiltInAnimationId | QuoteClipAnimationId;

export function getAnimationIdForEvent(eventId: string): AnimationId | null {
  if (eventId in EVENT_ANIMATION_IDS) {
    return EVENT_ANIMATION_IDS[eventId as keyof typeof EVENT_ANIMATION_IDS];
  }

  return null;
}
