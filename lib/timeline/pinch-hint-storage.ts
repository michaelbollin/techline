export const TIMELINE_PINCH_HINT_STORAGE_KEY = "techline:timeline-pinch-hint-dismissed";

export function hasSeenTimelinePinchHint(): boolean {
  if (typeof window === "undefined") {
    return true;
  }

  try {
    return window.localStorage.getItem(TIMELINE_PINCH_HINT_STORAGE_KEY) === "1";
  } catch {
    return true;
  }
}

export function markTimelinePinchHintSeen(): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(TIMELINE_PINCH_HINT_STORAGE_KEY, "1");
  } catch {
    // Ignore storage failures (private mode, etc.).
  }
}
