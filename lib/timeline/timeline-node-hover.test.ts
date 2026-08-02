import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { TIMELINE_HOVER_CLEAR_DELAY_MS } from "./constants";
import { makePlottedEvent } from "@/test/fixtures/plotted-event";
import { useTimelineNodeHover } from "./timeline-node-hover";

describe("useTimelineNodeHover", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("switches hover immediately to a new event", () => {
    const a = makePlottedEvent({ id: "a", title: "A" });
    const b = makePlottedEvent({ id: "b", title: "B" });
    const { result } = renderHook(() => useTimelineNodeHover());

    act(() => result.current.handleHoverEnter(a));
    act(() => result.current.handleHoverEnter(b));

    expect(result.current.hovered?.id).toBe("b");
  });

  it("does not clear when leaving an old target after entering a new one", () => {
    vi.useFakeTimers();
    const a = makePlottedEvent({ id: "a" });
    const b = makePlottedEvent({ id: "b" });
    const { result } = renderHook(() => useTimelineNodeHover());

    act(() => result.current.handleHoverEnter(a));
    act(() => result.current.handleHoverEnter(b));
    act(() => result.current.handleHoverLeave(a));

    act(() => {
      vi.advanceTimersByTime(TIMELINE_HOVER_CLEAR_DELAY_MS);
    });

    expect(result.current.hovered?.id).toBe("b");
  });

  it("clears after the bridge delay when leaving the active target", () => {
    vi.useFakeTimers();
    const event = makePlottedEvent({ id: "a" });
    const { result } = renderHook(() => useTimelineNodeHover());

    act(() => result.current.handleHoverEnter(event));
    act(() => result.current.handleHoverLeave(event));

    act(() => {
      vi.advanceTimersByTime(TIMELINE_HOVER_CLEAR_DELAY_MS);
    });

    expect(result.current.hovered).toBeNull();
  });
});
