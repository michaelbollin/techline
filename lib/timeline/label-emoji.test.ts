import { describe, expect, it } from "vitest";

import { bubbleTitle, resolveLabelEmoji } from "./label-emoji";

describe("resolveLabelEmoji", () => {
  it("maps release titles to a rocket", () => {
    expect(resolveLabelEmoji("Kubernetes open-sourced", "software")).toBe("🌐");
    expect(resolveLabelEmoji("Terraform first released", "software")).toBe("🚀");
    expect(resolveLabelEmoji("Swift programming language announced at WWDC", "software")).toBe("🚀");
  });

  it("maps quotes and AI categories", () => {
    expect(resolveLabelEmoji("Torvalds: Talk is cheap", "quote")).toBe("💬");
    expect(resolveLabelEmoji("Some model milestone", "ai")).toBe("🤖");
  });
});

describe("bubbleTitle", () => {
  it("prefixes the emoji when one matches", () => {
    expect(bubbleTitle("Perl 1.0 released", "software")).toBe("🚀 Perl 1.0 released");
  });

  it("returns the plain title when no emoji matches", () => {
    expect(bubbleTitle("TCP/IP protocol suite", "protocol")).toBe("TCP/IP protocol suite");
  });
});
