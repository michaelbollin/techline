import { describe, expect, it } from "vitest";

import { makePlottedEvent } from "@/test/fixtures/plotted-event";
import {
  labelBottomLocalY,
  labelTopLocalY,
  resolveLabelLayout,
} from "./label-layout";

describe("labelTopLocalY", () => {
  it("steps labels further above the axis for higher lanes", () => {
    expect(labelTopLocalY(1)).toBeLessThan(labelTopLocalY(0));
    expect(labelBottomLocalY(0)).toBeGreaterThan(labelTopLocalY(0));
  });
});

describe("resolveLabelLayout", () => {
  const x = (timestamp: number) => timestamp / 1_000_000;
  const widthFor = () => 80;

  it("hides labels clipped by viewport edges", () => {
    const events = [makePlottedEvent({ id: "edge", timestamp: 1 })];
    const layout = resolveLabelLayout(events, x, 9, 100, 3, widthFor);
    expect(layout.get("edge")?.showLabel).toBe(false);
  });

  it("hides labels above importance threshold", () => {
    const events = [makePlottedEvent({ id: "minor", importance: 9, timestamp: 500_000_000 })];
    const layout = resolveLabelLayout(events, x, 3, 1000, 3, widthFor);
    expect(layout.get("minor")?.showLabel).toBe(false);
  });

  it("places non-overlapping labels in lanes", () => {
    const events = [
      makePlottedEvent({ id: "a", importance: 1, timestamp: 500_000_000 }),
      makePlottedEvent({ id: "b", importance: 2, timestamp: 500_100_000 }),
    ];
    const layout = resolveLabelLayout(events, x, 9, 2000, 3, widthFor);
    expect(layout.get("a")?.showLabel).toBe(true);
    expect(layout.get("b")?.showLabel).toBe(true);
    expect(layout.get("a")?.lane).not.toBe(layout.get("b")?.lane);
  });
});
