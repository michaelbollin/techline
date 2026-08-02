import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useTimelineFilters } from "./use-timeline-filters";

const replace = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace, push: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

describe("useTimelineFilters", () => {
  it("initializes from filter path key", () => {
    const { result } = renderHook(() => useTimelineFilters("javascript,web"));
    expect([...result.current.activeFilterIds].sort()).toEqual(["lang-javascript", "web"]);
  });

  it("syncs router when filters change", () => {
    const { result } = renderHook(() => useTimelineFilters(""));

    act(() => {
      result.current.updateFilters(new Set(["web"]));
    });

    expect(replace).toHaveBeenCalledWith("/web", { scroll: false });
  });

  it("defers url updates while sidebar is open", async () => {
    replace.mockClear();
    const { result } = renderHook(() => useTimelineFilters(""));

    act(() => {
      result.current.setDeferUrlSync(true);
      result.current.updateFilters(new Set(["ai"]));
    });

    expect(replace).not.toHaveBeenCalled();

    act(() => {
      result.current.setDeferUrlSync(false);
    });

    await waitFor(() => {
      expect(replace).toHaveBeenCalledWith("/ai", { scroll: false });
    });
  });

  it("updates when filter path key changes externally", async () => {
    const { result, rerender } = renderHook(({ key }) => useTimelineFilters(key), {
      initialProps: { key: "" },
    });

    rerender({ key: "javascript" });

    await waitFor(() => {
      expect([...result.current.activeFilterIds]).toEqual(["lang-javascript"]);
    });
  });
});
