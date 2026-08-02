import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";

import {
  hasSeenTimelinePinchHint,
  markTimelinePinchHintSeen,
  TIMELINE_PINCH_HINT_STORAGE_KEY,
} from "./pinch-hint-storage";

describe("pinch-hint-storage", () => {
  beforeEach(() => {
    const store: Record<string, string> = {};
    vi.stubGlobal("localStorage", {
      getItem(key: string) {
        return store[key] ?? null;
      },
      setItem(key: string, value: string) {
        store[key] = value;
      },
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("starts unseen", () => {
    expect(hasSeenTimelinePinchHint()).toBe(false);
  });

  it("marks the hint as seen", () => {
    markTimelinePinchHintSeen();
    expect(hasSeenTimelinePinchHint()).toBe(true);
    expect(localStorage.getItem(TIMELINE_PINCH_HINT_STORAGE_KEY)).toBe("1");
  });
});
