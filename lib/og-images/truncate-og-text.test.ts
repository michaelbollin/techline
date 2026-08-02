import { describe, expect, it } from "vitest";

import { truncateOgText } from "./truncate-og-text";

describe("truncateOgText", () => {
  it("truncates long strings with an ellipsis", () => {
    const text = "abcdefghijklmnopqrstuvwxyz";
    expect(truncateOgText(text, 10)).toBe("abcdefghi…");
  });

  it("returns short strings unchanged", () => {
    expect(truncateOgText("short", 10)).toBe("short");
  });
});
