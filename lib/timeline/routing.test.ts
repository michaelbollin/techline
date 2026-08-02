import { describe, expect, it } from "vitest";

import { makeTimelineEvent } from "@/test/fixtures/timeline-event";
import { getEventBySlug, getRelatedEvents, isEventSlug } from "./routing";

describe("isEventSlug", () => {
  const events = [
    makeTimelineEvent({ slug: "react-released" }),
    makeTimelineEvent({ id: "linux", slug: "linux-kernel" }),
  ];

  it("returns true for known single slugs", () => {
    expect(isEventSlug("react-released", events)).toBe(true);
  });

  it("returns false for comma-separated filter segments", () => {
    expect(isEventSlug("javascript,web", events)).toBe(false);
  });

  it("returns false for unknown slugs", () => {
    expect(isEventSlug("missing-slug", events)).toBe(false);
  });
});

describe("getEventBySlug", () => {
  const events = [makeTimelineEvent({ slug: "react-released", title: "React" })];

  it("finds event by slug", () => {
    expect(getEventBySlug(events, "react-released")?.title).toBe("React");
  });

  it("returns undefined when missing", () => {
    expect(getEventBySlug(events, "missing")).toBeUndefined();
  });
});

describe("getRelatedEvents", () => {
  const events = [
    makeTimelineEvent({ id: "a", slug: "event-a", title: "A" }),
    makeTimelineEvent({ id: "b", slug: "event-b", title: "B" }),
    makeTimelineEvent({ id: "c", slug: "event-c", title: "C", relatedIds: ["a", "missing", "b"] }),
  ];

  it("resolves related ids in order and skips unknown ids", () => {
    expect(getRelatedEvents(events, events[2]).map((event) => event.slug)).toEqual([
      "event-a",
      "event-b",
    ]);
  });
});
