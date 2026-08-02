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
  "chatgpt-released": "chatgpt",
  "arpanet-first-message": "arpanet",
  "tcp-ip-flag-day": "tcp-ip",
  "altman-ai-goes-wrong": "altman-senate",
  "jobs-flash-closed-system": "jobs-flash",
  "steve-jobs-iphone-introduced": "iphone-intro",
  "macintosh-128k-released": "macintosh-intro",
  "mosaic-1-0-released": "mosaic-demo",
  "android-announced": "android-intro",
  "windows-95-released": "windows-95-welcome",
} as const;

type BuiltInAnimationId = (typeof EVENT_ANIMATION_IDS)[keyof typeof EVENT_ANIMATION_IDS];

export type AnimationId = BuiltInAnimationId | QuoteClipAnimationId;

export function getAnimationIdForEvent(eventId: string): AnimationId | null {
  if (eventId in EVENT_ANIMATION_IDS) {
    return EVENT_ANIMATION_IDS[eventId as keyof typeof EVENT_ANIMATION_IDS];
  }

  return null;
}
