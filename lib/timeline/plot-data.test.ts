import { describe, expect, it } from "vitest";

import { makeTimelineEvent } from "@/test/fixtures/timeline-event";
import {
  eventToTimestamp,
  filterEventsInTimelineRange,
  getTimelineExtent,
  isInTimelineRange,
  toPlottedEvents,
} from "./plot-data";

describe("eventToTimestamp", () => {
  it("maps precisions to stable noon UTC timestamps", () => {
    expect(eventToTimestamp("2000", "year")).toBe(Date.parse("2000-07-01T12:00:00Z"));
    expect(eventToTimestamp("2000-01", "month")).toBe(Date.parse("2000-01-15T12:00:00Z"));
    expect(eventToTimestamp("2000-01-15", "day")).toBe(Date.parse("2000-01-15T12:00:00Z"));
    expect(eventToTimestamp("1990", "decade")).toBe(Date.parse("1995-01-01T12:00:00Z"));
  });
});

describe("toPlottedEvents", () => {
  it("sorts by timestamp and includes derived fields", () => {
    const plotted = toPlottedEvents([
      makeTimelineEvent({ id: "later", date: "2001-01-01", title: "Later" }),
      makeTimelineEvent({ id: "earlier", date: "1999-01-01", title: "Earlier" }),
    ]);

    expect(plotted.map((event) => event.id)).toEqual(["earlier", "later"]);
    expect(plotted[0]).toMatchObject({
      dateLabel: "January 1, 1999",
      bubbleTitle: expect.any(String),
      imageUrl: null,
      imageCaption: null,
    });
  });
});

describe("timeline range helpers", () => {
  const [start, end] = getTimelineExtent();

  it("exposes configured extent", () => {
    expect(start).toBeLessThan(end);
  });

  it("filters events outside range", () => {
    const inRange = makeTimelineEvent({ date: "2000-01-01" });
    const outOfRange = makeTimelineEvent({
      id: "old",
      slug: "old",
      date: "1800",
      datePrecision: "year",
    });

    expect(isInTimelineRange(eventToTimestamp(inRange.date, inRange.datePrecision))).toBe(true);
    expect(isInTimelineRange(eventToTimestamp(outOfRange.date, outOfRange.datePrecision))).toBe(
      false,
    );
    expect(filterEventsInTimelineRange([inRange, outOfRange]).map((event) => event.id)).toEqual([
      "test-event",
    ]);
  });
});
