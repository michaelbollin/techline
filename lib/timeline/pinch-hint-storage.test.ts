import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";

import {
  hasSeenTimelinePinchHint,
  markTimelinePinchHintSeen,
  TIMELINE_PINCH_HINT_STORAGE_KEY,
} from "./pinch-hint-storage";

describe("pinch-hint-storage", () => {
  beforeEach(() => {
    vi.stubGlobal("localStorage", {
      store: {} as Record<string, string>,
      getItem(key: string) {
        return this.store[key] ?? null;
      },
      setItem(key: string, value: string) {
        this.store[key] = value;
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
