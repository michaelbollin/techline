import path from "node:path";

import { describe, expect, it } from "vitest";

import { makeTimelineEvent } from "@/test/fixtures/timeline-event";
import {
  assertEventMatchesBucket,
  assertUniqueIds,
  assertUniqueSlugs,
  bucketPathForEvent,
  getEventById,
  getEventsByCategory,
  getEventsByTag,
  loadTimeline,
  parseBucketPath,
  sortEvents,
} from "./load";

const FIXTURE_DIR = path.join(process.cwd(), "test/fixtures/buckets");

describe("parseBucketPath", () => {
  it("parses month, year, and decade paths", () => {
    expect(parseBucketPath("2000/01.json")).toEqual({
      kind: "month",
      year: 2000,
      month: 1,
    });
    expect(parseBucketPath("1999/year.json")).toEqual({
      kind: "year",
      year: 1999,
      month: null,
    });
    expect(parseBucketPath("decades/1990.json")).toEqual({
      kind: "decade",
      year: 1990,
      month: null,
    });
  });

  it("throws for invalid paths", () => {
    expect(() => parseBucketPath("invalid/path.json")).toThrow(/Invalid timeline path/);
  });
});

describe("assertEventMatchesBucket", () => {
  it("accepts matching month bucket events", () => {
    const event = makeTimelineEvent({ date: "2000-01-15", datePrecision: "day" });
    expect(() =>
      assertEventMatchesBucket(event, { kind: "month", year: 2000, month: 1 }, "2000/01.json"),
    ).not.toThrow();
  });

  it("rejects mismatched month bucket", () => {
    const event = makeTimelineEvent({ date: "2000-02-01", datePrecision: "day" });
    expect(() =>
      assertEventMatchesBucket(event, { kind: "month", year: 2000, month: 1 }, "2000/01.json"),
    ).toThrow(/does not match bucket/);
  });
});

describe("sortEvents", () => {
  it("sorts by date then title", () => {
    const sorted = sortEvents([
      makeTimelineEvent({ id: "b", title: "Beta", date: "2000-01-01" }),
      makeTimelineEvent({ id: "a", title: "Alpha", date: "2000-01-01" }),
      makeTimelineEvent({ id: "c", title: "Earlier", date: "1999-01-01" }),
    ]);

    expect(sorted.map((event) => event.id)).toEqual(["c", "a", "b"]);
  });
});

describe("assertUniqueIds", () => {
  it("throws on duplicate ids", () => {
    const events = [
      makeTimelineEvent({ id: "dup", title: "One" }),
      makeTimelineEvent({ id: "dup", slug: "dup-2", title: "Two" }),
    ];

    expect(() => assertUniqueIds(events)).toThrow(/Duplicate event id/);
  });
});

describe("assertUniqueSlugs", () => {
  it("throws on duplicate slugs", () => {
    const events = [
      makeTimelineEvent({ id: "one", slug: "same-slug", title: "One" }),
      makeTimelineEvent({ id: "two", slug: "same-slug", title: "Two" }),
    ];

    expect(() => assertUniqueSlugs(events)).toThrow(/Duplicate event slug/);
  });
});

describe("query helpers", () => {
  const events = [
    makeTimelineEvent({ id: "software-event", category: "software", tags: ["react"] }),
    makeTimelineEvent({ id: "ai-event", slug: "ai-event", category: "ai", tags: ["llm"] }),
  ];

  it("finds by id, category, and tag", () => {
    expect(getEventById(events, "software-event")?.title).toBe("Test Event");
    expect(getEventsByCategory(events, "ai").map((event) => event.id)).toEqual(["ai-event"]);
    expect(getEventsByTag(events, "react").map((event) => event.id)).toEqual(["software-event"]);
  });
});

describe("bucketPathForEvent", () => {
  it("derives bucket paths from date precision", () => {
    expect(
      bucketPathForEvent({ date: "2000-01-15", datePrecision: "day" }),
    ).toBe(`${path.join("2000", "01.json")}`);
    expect(bucketPathForEvent({ date: "1999", datePrecision: "year" })).toBe(
      path.join("1999", "year.json"),
    );
    expect(bucketPathForEvent({ date: "1990", datePrecision: "decade" })).toBe(
      path.join("decades", "1990.json"),
    );
  });
});

describe("loadTimeline", () => {
  it("loads and validates fixture buckets", async () => {
    const { events, buckets } = await loadTimeline(FIXTURE_DIR);

    expect(buckets).toHaveLength(2);
    expect(events.map((event) => event.id).sort()).toEqual(["fixture-day-event", "fixture-year-event"]);
  });
});
