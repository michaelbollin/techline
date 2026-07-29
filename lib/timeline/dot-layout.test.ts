import { describe, expect, it } from "vitest";

import { makePlottedEvent } from "@/test/fixtures/plotted-event";
import { resolveDotLayout } from "./dot-layout";

describe("resolveDotLayout", () => {
  const x = (timestamp: number) => timestamp / 1_000_000;

  it("shows important non-overlapping dots", () => {
    const events = [makePlottedEvent({ id: "a", importance: 1, timestamp: 500_000_000 })];
    const layout = resolveDotLayout(events, x, 9, 0, 1_000, () => 5);
    expect(layout.get("a")?.showDot).toBe(true);
  });

  it("shows lower-importance dots when there is axis room", () => {
    const events = [makePlottedEvent({ id: "minor", importance: 9, timestamp: 500_000_000 })];
    const layout = resolveDotLayout(events, x, 3, 0, 1_000, () => 5);
    expect(layout.get("minor")?.showDot).toBe(true);
  });

  it("still hides lower-importance dots when they would overlap", () => {
    const events = [
      makePlottedEvent({ id: "major", importance: 1, timestamp: 500_000_000 }),
      makePlottedEvent({ id: "minor", importance: 5, timestamp: 500_100_000 }),
    ];
    const layout = resolveDotLayout(events, x, 9, 0, 1_000, () => 8);
    expect(layout.get("major")?.showDot).toBe(true);
    expect(layout.get("minor")?.showDot).toBe(false);
  });

  it("forces visibility for pinned ids", () => {
    const events = [
      makePlottedEvent({ id: "major", importance: 1, timestamp: 500_000_000 }),
      makePlottedEvent({ id: "hovered", importance: 9, timestamp: 500_050_000 }),
    ];
    const layout = resolveDotLayout(events, x, 1, 0, 1_000, () => 8, {
      forceVisibleIds: new Set(["hovered"]),
    });
    expect(layout.get("hovered")?.showDot).toBe(true);
  });
});
