import { describe, expect, it } from "vitest";

import { maxLanesForViewportVertical } from "./zoom-lod";

describe("maxLanesForViewportVertical", () => {
  it("returns at least one lane", () => {
    expect(maxLanesForViewportVertical(320)).toBeGreaterThanOrEqual(1);
  });

  it("allows more lanes on wider screens", () => {
    expect(maxLanesForViewportVertical(1200)).toBeGreaterThan(maxLanesForViewportVertical(400));
  });
});
