import { describe, expect, it } from "vitest";

import { getAnimationIdForEvent } from "./registry";

describe("getAnimationIdForEvent", () => {
  it("returns the CD-ROM animation for the CD-ROM event", () => {
    expect(getAnimationIdForEvent("cd-rom-introduced")).toBe("cd-rom");
  });

  it("returns null for events without an animation", () => {
    expect(getAnimationIdForEvent("javascript-released")).toBeNull();
  });
});
