import { describe, expect, it } from "vitest";

import {
  resolveTooltipFixedLeft,
  resolveTooltipFixedTop,
  tooltipMaxWidth,
} from "./tooltip-position";

describe("tooltipMaxWidth", () => {
  it("caps width to the viewport minus padding", () => {
    expect(tooltipMaxWidth(320)).toBe(296);
  });

  it("keeps the wrap max on wide viewports", () => {
    expect(tooltipMaxWidth(1200)).toBe(352);
  });
});

describe("resolveTooltipFixedLeft", () => {
  it("centers under the trigger when there is room", () => {
    const trigger = new DOMRect(100, 0, 40, 20);
    expect(resolveTooltipFixedLeft(trigger, 160, 400)).toBe(40);
  });

  it("clamps to the viewport edges", () => {
    const trigger = new DOMRect(10, 0, 20, 20);
    expect(resolveTooltipFixedLeft(trigger, 200, 400)).toBe(12);
  });
});

describe("resolveTooltipFixedTop", () => {
  it("places the tooltip above the trigger", () => {
    const trigger = new DOMRect(0, 100, 20, 20);
    expect(resolveTooltipFixedTop(trigger, 48, "top", 8)).toBe(44);
  });
});
