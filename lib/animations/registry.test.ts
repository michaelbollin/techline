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

  it("returns null for events without an animation", () => {
    expect(getAnimationIdForEvent("javascript-released")).toBeNull();
  });
});
