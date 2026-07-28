import { formatEventDate } from "./format";
import type { Importance } from "./importance";
import type { TimelineEvent } from "./schema";
import { TIMELINE_EXTENT } from "./constants";

export type PlottedEvent = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  importance: Importance;
  timestamp: number;
  dateLabel: string;
};

function eventToIsoDate(date: string, precision: TimelineEvent["datePrecision"]): string {
  if (precision === "decade") {
    const decade = Number.parseInt(date.replace(/\D/g, ""), 10);
    return `${decade + 5}-01-01`;
  }

  if (precision === "year") {
    return `${date}-07-01`;
  }

  if (precision === "month") {
    const [year, month] = date.split("-");
    return `${year}-${month}-15`;
  }

  return date;
}

export function eventToTimestamp(date: string, precision: TimelineEvent["datePrecision"]): number {
  return Date.parse(`${eventToIsoDate(date, precision)}T12:00:00Z`);
}

export function toPlottedEvents(events: TimelineEvent[]): PlottedEvent[] {
  return events
    .map((event) => ({
      id: event.id,
      slug: event.slug,
      title: event.title,
      summary: event.summary,
      importance: event.importance,
      timestamp: eventToTimestamp(event.date, event.datePrecision),
      dateLabel: formatEventDate(event.date, event.datePrecision),
    }))
    .sort((a, b) => a.timestamp - b.timestamp);
}

export function getTimelineExtent(): [number, number] {
  return TIMELINE_EXTENT;
}

export function isInTimelineRange(timestamp: number): boolean {
  const [start, end] = TIMELINE_EXTENT;
  return timestamp >= start && timestamp <= end;
}

export function filterEventsInTimelineRange(events: TimelineEvent[]): TimelineEvent[] {
  return events.filter((event) =>
    isInTimelineRange(eventToTimestamp(event.date, event.datePrecision)),
  );
}
