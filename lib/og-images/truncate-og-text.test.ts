import { describe, expect, it } from "vitest";

import { clampOgTextAtWords, truncateOgText } from "./truncate-og-text";

describe("truncateOgText", () => {
  it("truncates long strings with an ellipsis", () => {
    const text = "abcdefghijklmnopqrstuvwxyz";
    expect(truncateOgText(text, 10)).toBe("abcdefghi…");
  });

  it("returns short strings unchanged", () => {
    expect(truncateOgText("short", 10)).toBe("short");
  });
});

describe("clampOgTextAtWords", () => {
  it("truncates at the last word boundary", () => {
    const text = "The quick brown fox jumps over the lazy dog";
    expect(clampOgTextAtWords(text, 20)).toBe("The quick brown…");
    expect(clampOgTextAtWords(text, 28)).toBe("The quick brown fox jumps…");
  });

  it("returns short strings unchanged", () => {
    expect(clampOgTextAtWords("short title", 40)).toBe("short title");
  });
});
