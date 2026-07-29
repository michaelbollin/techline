import { describe, expect, it } from "vitest";

import { makeTimelineEvent } from "@/test/fixtures/timeline-event";
import {
  eventMatchesFulltext,
  filterEventsByFulltext,
  parseFulltextTerms,
} from "./fulltext-search";

describe("parseFulltextTerms", () => {
  it("splits on whitespace", () => {
    expect(parseFulltextTerms("bill gates")).toEqual(["bill", "gates"]);
  });

  it("splits on commas", () => {
    expect(parseFulltextTerms("wordpress, bill gates")).toEqual(["wordpress", "bill", "gates"]);
  });

  it("strips leading and trailing punctuation", () => {
    expect(parseFulltextTerms('"wordpress", bill!')).toEqual(["wordpress", "bill"]);
  });

  it("returns empty array for blank input", () => {
    expect(parseFulltextTerms("   ")).toEqual([]);
  });
});

describe("eventMatchesFulltext", () => {
  const wordpress = makeTimelineEvent({
    id: "wordpress",
    title: "WordPress released",
    tags: ["wordpress", "cms"],
  });

  const gates = makeTimelineEvent({
    id: "gates",
    title: "Bill Gates founds Microsoft",
    people: [{ id: "bill-gates", name: "Bill Gates", role: "founder" }],
  });

  const both = makeTimelineEvent({
    id: "both",
    title: "WordPress interview",
    about: "Bill Gates commented on WordPress adoption.",
    tags: ["wordpress"],
  });

  const falsePositive = makeTimelineEvent({
    id: "neurons",
    title: "Neural networks paper",
    about: "Logic gates and billions of parameters.",
  });

  it("matches empty query", () => {
    expect(eventMatchesFulltext(wordpress, "")).toBe(true);
  });

  it("requires every term in the same event (AND)", () => {
    expect(eventMatchesFulltext(both, "wordpress bill")).toBe(true);
    expect(eventMatchesFulltext(wordpress, "wordpress bill")).toBe(false);
    expect(eventMatchesFulltext(gates, "wordpress bill")).toBe(false);
  });

  it("uses word boundaries, not substring matches", () => {
    expect(eventMatchesFulltext(falsePositive, "bill gates")).toBe(false);
    expect(eventMatchesFulltext(gates, "bill gates")).toBe(true);
  });
});

describe("filterEventsByFulltext", () => {
  const events = [
    makeTimelineEvent({ id: "a", title: "Alpha release", tags: ["alpha"] }),
    makeTimelineEvent({ id: "b", title: "Beta release", tags: ["beta"] }),
    makeTimelineEvent({ id: "ab", title: "Alpha Beta milestone", tags: ["alpha", "beta"] }),
  ];

  it("returns all events for empty query", () => {
    expect(filterEventsByFulltext(events, "")).toHaveLength(3);
    expect(filterEventsByFulltext(events, "   ")).toHaveLength(3);
  });

  it("filters with AND semantics", () => {
    const results = filterEventsByFulltext(events, "alpha beta");
    expect(results.map((event) => event.id)).toEqual(["ab"]);
  });
});
