import { describe, expect, it } from "vitest";

import { makeTimelineEvent } from "@/test/fixtures/timeline-event";
import {
  buildFilterRegistry,
  countFilterMatches,
  filterSignature,
  filterTimelineEvents,
  hasActiveFilters,
  removeFilters,
  toggleFilterId,
} from "./filters";

describe("hasActiveFilters", () => {
  it("is false when no filters or query", () => {
    expect(hasActiveFilters(new Set(), "")).toBe(false);
    expect(hasActiveFilters(new Set(), "   ")).toBe(false);
  });

  it("is true when filter ids or fulltext query are set", () => {
    expect(hasActiveFilters(new Set(["web"]), "")).toBe(true);
    expect(hasActiveFilters(new Set(), "react")).toBe(true);
  });
});

describe("filterSignature", () => {
  it("sorts filter ids and appends fulltext query", () => {
    expect(filterSignature(new Set(["web", "ai"]), "typescript")).toBe("ai,web|typescript");
    expect(filterSignature(new Set(["web"]), "")).toBe("web");
  });
});

describe("toggleFilterId", () => {
  it("adds and removes ids immutably", () => {
    const first = toggleFilterId(new Set(), "web");
    expect([...first]).toEqual(["web"]);

    const second = toggleFilterId(first, "web");
    expect(second.size).toBe(0);
  });
});

describe("removeFilters", () => {
  it("removes ids matching predicate", () => {
    const next = removeFilters(new Set(["web", "ai", "mobile"]), (id) => id.startsWith("a"));
    expect([...next].sort()).toEqual(["mobile", "web"]);
  });
});

describe("filterTimelineEvents", () => {
  const events = [
    makeTimelineEvent({
      id: "react-release",
      title: "React released",
      tags: ["react", "javascript", "web-framework"],
      category: "software",
    }),
    makeTimelineEvent({
      id: "linux-kernel",
      title: "Linux kernel",
      tags: ["linux", "open-source"],
      category: "software",
    }),
    makeTimelineEvent({
      id: "openai-founded",
      title: "OpenAI founded",
      tags: ["ai", "company"],
      category: "company",
    }),
  ];

  it("returns all events with no active filters", () => {
    expect(filterTimelineEvents(events, new Set())).toHaveLength(3);
  });

  it("matches any active theme filter (OR between filter ids)", () => {
    const filtered = filterTimelineEvents(events, new Set(["web", "ai"]));
    expect(filtered.map((event) => event.id).sort()).toEqual(["openai-founded", "react-release"]);
  });

  it("applies fulltext AND after filter OR", () => {
    const filtered = filterTimelineEvents(events, new Set(["web"]), "react javascript");
    expect(filtered.map((event) => event.id)).toEqual(["react-release"]);
  });
});

describe("buildFilterRegistry", () => {
  it("includes static and dynamic filters", () => {
    const events = [
      makeTimelineEvent({
        people: [{ id: "linus-torvalds", name: "Linus Torvalds", role: "creator" }],
      }),
    ];

    const registry = buildFilterRegistry(events);
    expect(registry.has("web")).toBe(true);
    expect(registry.has("person-linus-torvalds")).toBe(true);
  });
});

describe("countFilterMatches", () => {
  it("counts events per filter", () => {
    const events = [
      makeTimelineEvent({ tags: ["javascript"] }),
      makeTimelineEvent({ tags: ["python"] }),
    ];

    const counts = countFilterMatches(events);
    expect(counts.get("lang-javascript")).toBe(1);
    expect(counts.get("lang-python")).toBe(1);
    expect(counts.get("lang-rust")).toBe(0);
  });
});
