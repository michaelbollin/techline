import { describe, expect, it } from "vitest";

import { getAnimationIdForEvent } from "./registry";

describe("getAnimationIdForEvent", () => {
  it("returns the CD-ROM animation for the CD-ROM event", () => {
    expect(getAnimationIdForEvent("cd-rom-introduced")).toBe("cd-rom");
  });

  it("returns the Quicksort animation for the Quicksort event", () => {
    expect(getAnimationIdForEvent("tony-hoare-quicksort-published")).toBe("quicksort");
  });

  it("returns the Git branches animation for Git created", () => {
    expect(getAnimationIdForEvent("git-created")).toBe("git-branches");
  });

  it("returns the transistor animation for Bell Labs transistor invented", () => {
    expect(getAnimationIdForEvent("bell-labs-transistor-invented")).toBe("transistor");
  });

  it("returns the Ballmer developers animation for the developers chant", () => {
    expect(getAnimationIdForEvent("ballmer-developers-chant")).toBe("ballmer-developers");
  });

  it("returns the internet tidal wave animation for Gates memo", () => {
    expect(getAnimationIdForEvent("gates-internet-tidal-wave-memo")).toBe("internet-tidal-wave");
  });

  it("returns the Y2K rollover animation for the millennium rollover", () => {
    expect(getAnimationIdForEvent("y2k-rollover")).toBe("y2k-rollover");
  });

  it("returns null for events without an animation", () => {
    expect(getAnimationIdForEvent("javascript-released")).toBeNull();
  });
});
