import { describe, expect, it } from "vitest";

import { resolveTooltipAlign } from "./tooltip-align";

describe("resolveTooltipAlign", () => {
  const boundary = new DOMRect(100, 0, 400, 600);

  it("centers when there is room on both sides", () => {
    const trigger = new DOMRect(280, 200, 40, 20);
    expect(resolveTooltipAlign(trigger, 160, boundary)).toBe("center");
  });

  it("aligns start near the left edge", () => {
    const trigger = new DOMRect(110, 200, 30, 20);
    expect(resolveTooltipAlign(trigger, 200, boundary)).toBe("start");
  });

  it("aligns end near the right edge", () => {
    const trigger = new DOMRect(470, 200, 30, 20);
    expect(resolveTooltipAlign(trigger, 200, boundary)).toBe("end");
  });
});
