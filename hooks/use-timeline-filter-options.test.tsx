import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useTimelineFilterOptions } from "./use-timeline-filter-options";
import { makeTimelineEvent } from "@/test/fixtures/timeline-event";

describe("useTimelineFilterOptions", () => {
  it("returns theme options with non-zero counts only", () => {
    const events = [
      makeTimelineEvent({ tags: ["programming-language", "rust"] }),
      makeTimelineEvent({
        id: "ai-event",
        slug: "ai-event",
        tags: ["llm"],
        category: "ai",
      }),
    ];

    const { result } = renderHook(() => useTimelineFilterOptions(events));
    const ids = result.current.themeOptions.map((option) => option.id);

    expect(ids).toContain("languages");
    expect(ids).toContain("ai");
    expect(result.current.themeOptions.every((option) => (option.count ?? 0) > 0)).toBe(true);
  });

  it("memoizes options for the same events array", () => {
    const events = [makeTimelineEvent({ tags: ["javascript"] })];
    const { result, rerender } = renderHook(() => useTimelineFilterOptions(events));

    const first = result.current.themeOptions;
    rerender();
    expect(result.current.themeOptions).toBe(first);
  });
});
