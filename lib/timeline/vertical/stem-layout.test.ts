import { describe, expect, it } from "vitest";

import { makePlottedEvent } from "@/test/fixtures/plotted-event";
import { labelLeftLocalX } from "./label-layout";
import { computeVerticalStemStarts } from "./stem-layout";

describe("computeVerticalStemStarts", () => {
  it("starts at axis for innermost lane", () => {
    const events = [makePlottedEvent({ id: "a", timestamp: 1000 })];
    const layout = new Map([["a", { showLabel: true, lane: 0, width: 80 }]]);
    expect(computeVerticalStemStarts(events, layout, () => 100).get("a")).toBe(0);
  });

  it("extends through inner lanes at same y bucket", () => {
    const events = [
      makePlottedEvent({ id: "inner", timestamp: 1000 }),
      makePlottedEvent({ id: "outer", timestamp: 1000 }),
    ];
    const layout = new Map([
      ["inner", { showLabel: true, lane: 0, width: 60 }],
      ["outer", { showLabel: true, lane: 1, width: 80 }],
    ]);
    const starts = computeVerticalStemStarts(events, layout, () => 100);
    expect(starts.get("outer")).toBe(labelLeftLocalX(0) + 60);
  });
});
