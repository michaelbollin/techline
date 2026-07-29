import { describe, expect, it } from "vitest";

import { makePlottedEvent } from "@/test/fixtures/plotted-event";
import { labelBottomLocalY } from "./label-layout";
import { computeStemStarts } from "./stem-layout";

describe("computeStemStarts", () => {
  it("starts stems at axis for first lane", () => {
    const events = [makePlottedEvent({ id: "a", timestamp: 1000 })];
    const layout = new Map([["a", { showLabel: true, lane: 0, width: 80 }]]);
    const starts = computeStemStarts(events, layout, () => 100);
    expect(starts.get("a")).toBe(0);
  });

  it("extends stems through lower lanes at same x bucket", () => {
    const events = [
      makePlottedEvent({ id: "a", timestamp: 1000 }),
      makePlottedEvent({ id: "b", timestamp: 1000 }),
    ];
    const layout = new Map([
      ["a", { showLabel: true, lane: 0, width: 80 }],
      ["b", { showLabel: true, lane: 1, width: 80 }],
    ]);
    const starts = computeStemStarts(events, layout, () => 100);
    expect(starts.get("b")).toBe(labelBottomLocalY(0));
  });
});
