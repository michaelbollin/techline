import { describe, expect, it } from "vitest";

import { makeTimelineEvent } from "@/test/fixtures/timeline-event";
import { getEventBySlug, isEventSlug } from "./routing";

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
