import { describe, expect, it } from "vitest";

import { SHORT_BUBBLE_TITLES } from "./short-titles";

describe("SHORT_BUBBLE_TITLES", () => {
  it("contains non-empty overrides", () => {
    for (const [id, title] of Object.entries(SHORT_BUBBLE_TITLES)) {
      expect(id.length).toBeGreaterThan(0);
      expect(title.length).toBeGreaterThan(0);
    }
  });
});
