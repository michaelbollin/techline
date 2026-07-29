import { describe, expect, it } from "vitest";

import { makeTimelineEvent } from "@/test/fixtures/timeline-event";
import { TIMELINE_FILTER_GROUPS } from "./filter-definitions";

const themeFilters = TIMELINE_FILTER_GROUPS.find((group) => group.id === "theme")!.filters;
const languageFilters = TIMELINE_FILTER_GROUPS.find((group) => group.id === "languages")!.filters;

describe("TIMELINE_FILTER_GROUPS", () => {
  it("defines unique filter ids", () => {
    const ids = TIMELINE_FILTER_GROUPS.flatMap((group) => group.filters.map((filter) => filter.id));
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("theme filters", () => {
  it("matches web-tagged software events", () => {
    const web = themeFilters.find((filter) => filter.id === "web")!;
    expect(web.matches(makeTimelineEvent({ tags: ["react", "web-framework"] }))).toBe(true);
    expect(web.matches(makeTimelineEvent({ tags: ["linux"] }))).toBe(false);
  });

  it("matches AI category and tags", () => {
    const ai = themeFilters.find((filter) => filter.id === "ai")!;
    expect(ai.matches(makeTimelineEvent({ category: "ai", tags: [] }))).toBe(true);
    expect(ai.matches(makeTimelineEvent({ tags: ["machine-learning"] }))).toBe(true);
  });

  it("matches quote events", () => {
    const quotes = themeFilters.find((filter) => filter.id === "quotes")!;
    expect(quotes.matches(makeTimelineEvent({ category: "quote", tags: ["quote"] }))).toBe(true);
  });
});

describe("language filters", () => {
  it("matches language tags without false positives", () => {
    const java = languageFilters.find((filter) => filter.id === "lang-java")!;
    const c = languageFilters.find((filter) => filter.id === "lang-c")!;

    expect(java.matches(makeTimelineEvent({ tags: ["java"] }))).toBe(true);
    expect(c.matches(makeTimelineEvent({ tags: ["c"] }))).toBe(true);
    expect(c.matches(makeTimelineEvent({ tags: ["cpp"] }))).toBe(false);
  });
});
