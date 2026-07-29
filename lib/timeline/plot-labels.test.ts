import { describe, expect, it } from "vitest";

import { makePlottedEvent } from "@/test/fixtures/plotted-event";
import { reorderLabelsForHover, sortVisibleLabelNodes } from "./plot-labels";

describe("sortVisibleLabelNodes", () => {
  const layout = new Map([
    ["a", { showLabel: true, lane: 1, width: 80 }],
    ["b", { showLabel: true, lane: 0, width: 80 }],
    ["c", { showLabel: false, lane: 0, width: 80 }],
  ]);

  const plotted = [
    makePlottedEvent({ id: "a", timestamp: 200 }),
    makePlottedEvent({ id: "b", timestamp: 100 }),
    makePlottedEvent({ id: "c", timestamp: 300 }),
  ];

  it("sorts visible labels by lane then x position", () => {
    const sorted = sortVisibleLabelNodes(plotted, layout, (timestamp) => timestamp);
    expect(sorted.map((event) => event.id)).toEqual(["b", "a"]);
  });
});

describe("reorderLabelsForHover", () => {
  const sorted = [
    makePlottedEvent({ id: "a" }),
    makePlottedEvent({ id: "b" }),
    makePlottedEvent({ id: "c" }),
  ];

  it("returns original order without hover", () => {
    expect(reorderLabelsForHover(sorted, null).map((event) => event.id)).toEqual(["a", "b", "c"]);
  });

  it("moves hovered label to the end for z-order", () => {
    const reordered = reorderLabelsForHover(sorted, sorted[1]!);
    expect(reordered.map((event) => event.id)).toEqual(["a", "c", "b"]);
  });
});
