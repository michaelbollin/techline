import { describe, expect, it } from "vitest";

import { timelineBucketFileSchema, timelineEventSchema } from "./schema";

const validEvent = {
  id: "valid-event",
  slug: "valid-event",
  date: "2000-01-15",
  datePrecision: "day" as const,
  title: "Valid Event",
  summary: "Summary",
  about: "About",
  narrative: {
    whyChosen: "Why chosen",
    whyImportant: "Why important",
    problemSolved: "Problem solved",
  },
  category: "software" as const,
  tags: ["test"],
  importance: 3 as const,
  sources: [{ title: "Source", url: "https://example.com/source" }],
};

describe("timelineEventSchema", () => {
  it("accepts a valid event", () => {
    expect(timelineEventSchema.parse(validEvent)).toMatchObject({ id: "valid-event" });
  });

  it("rejects non-kebab-case ids", () => {
    expect(() =>
      timelineEventSchema.parse({ ...validEvent, id: "Invalid_ID" }),
    ).toThrow();
  });

  it("requires quoteText for quote category", () => {
    expect(() =>
      timelineEventSchema.parse({
        ...validEvent,
        category: "quote",
      }),
    ).toThrow(/quoteText/);
  });

  it("accepts quote events with quoteText", () => {
    const parsed = timelineEventSchema.parse({
      ...validEvent,
      category: "quote",
      quoteText: "Hello, world.",
    });

    expect(parsed.quoteText).toBe("Hello, world.");
  });

  it("rejects invalid importance values", () => {
    expect(() =>
      timelineEventSchema.parse({ ...validEvent, importance: 10 }),
    ).toThrow();
  });
});

describe("timelineBucketFileSchema", () => {
  it("requires at least one event", () => {
    expect(() => timelineBucketFileSchema.parse({ events: [] })).toThrow();
  });

  it("accepts a bucket with events", () => {
    expect(timelineBucketFileSchema.parse({ events: [validEvent] }).events).toHaveLength(1);
  });
});
