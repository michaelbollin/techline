import { describe, expect, it, vi } from "vitest";

vi.mock("react", async () => {
  const actual = await vi.importActual<typeof import("react")>("react");
  return {
    ...actual,
    cache: <T extends (...args: never[]) => unknown>(fn: T) => fn,
  };
});

const loadTimeline = vi.fn(() => [{ id: "cached-event" }]);

vi.mock("./load", () => ({
  loadTimeline,
}));

describe("getTimeline", () => {
  it("delegates to loadTimeline through react cache wrapper", async () => {
    const { getTimeline } = await import("./get-timeline");

    expect(getTimeline()).toEqual([{ id: "cached-event" }]);
    expect(loadTimeline).toHaveBeenCalledTimes(1);
  });
});
