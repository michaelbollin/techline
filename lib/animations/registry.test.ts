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

  it("returns the WorldWideWeb animation for the first web browser", () => {
    expect(getAnimationIdForEvent("worldwideweb-browser")).toBe("world-wide-web");
  });

  it("returns the Linux kernel animation for Linux announced", () => {
    expect(getAnimationIdForEvent("linux-kernel-announced")).toBe("linux-kernel");
  });

  it("returns the IBM PC animation for the 5150 release", () => {
    expect(getAnimationIdForEvent("ibm-pc-5150-released")).toBe("ibm-pc-5150");
  });

  it("returns the integrated circuit animation for Kilby's first IC", () => {
    expect(getAnimationIdForEvent("jack-kilby-integrated-circuit")).toBe("integrated-circuit");
  });

  it("returns the GPT-3 API animation for the first GPT API release", () => {
    expect(getAnimationIdForEvent("gpt-3-api-released")).toBe("gpt-3-api");
  });

  it("returns packet-network animations for ARPANET and TCP/IP milestones", () => {
    expect(getAnimationIdForEvent("arpanet-first-message")).toBe("arpanet");
    expect(getAnimationIdForEvent("tcp-ip-flag-day")).toBe("tcp-ip");
  });

  it("returns quote clip animations for quote events with video backgrounds", () => {
    expect(getAnimationIdForEvent("ballmer-web-developers-chant")).toBe("ballmer-web-developers");
    expect(getAnimationIdForEvent("altman-ai-goes-wrong")).toBe("altman-senate");
    expect(getAnimationIdForEvent("jobs-flash-closed-system")).toBe("jobs-flash");
    expect(getAnimationIdForEvent("ballmer-linux-cancer")).toBe("ballmer-linux-cancer");
  });

  it("returns null for events without an animation", () => {
    expect(getAnimationIdForEvent("javascript-released")).toBeNull();
  });
});
