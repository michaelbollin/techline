import { describe, expect, it } from "vitest";

import { getTimelineHoverEffectId } from "./hover-effects";

describe("getTimelineHoverEffectId", () => {
  it("returns the CD-ROM effect for the CD-ROM event", () => {
    expect(getTimelineHoverEffectId("cd-rom-introduced")).toBe("cd-rom-introduced");
  });

  it("returns null for events without a hover effect", () => {
    expect(getTimelineHoverEffectId("javascript-released")).toBeNull();
  });
});
