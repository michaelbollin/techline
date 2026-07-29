import { describe, expect, it } from "vitest";

import { makePlottedEvent } from "@/test/fixtures/plotted-event";
import { labelLeftLocalX, resolveVerticalLabelLayout } from "./label-layout";

describe("labelLeftLocalX", () => {
  it("offsets labels to the right by lane", () => {
    expect(labelLeftLocalX(1)).toBeGreaterThan(labelLeftLocalX(0));
  });
});

describe("resolveVerticalLabelLayout", () => {
  const y = (timestamp: number) => timestamp / 1_000_000;

  it("places labels in available lanes", () => {
    const events = [makePlottedEvent({ id: "a", importance: 1, timestamp: 500_000_000 })];
    const layout = resolveVerticalLabelLayout(events, y, 80, 9, 800, 3, () => 100);
    expect(layout.get("a")?.showLabel).toBe(true);
  });

  it("hides labels above importance threshold", () => {
    const events = [makePlottedEvent({ id: "minor", importance: 9, timestamp: 500_000_000 })];
    const layout = resolveVerticalLabelLayout(events, y, 80, 3, 800, 3, () => 100);
    expect(layout.get("minor")?.showLabel).toBe(false);
  });
});
