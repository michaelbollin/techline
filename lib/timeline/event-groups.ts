import { formatBucketLabel } from "./format";
import type { TimelineEvent } from "./schema";

export type EventGroup = {
  key: string;
  label: string;
  events: TimelineEvent[];
};

function groupKey(event: TimelineEvent): string {
  if (event.datePrecision === "decade") {
    return `decade-${event.date.replace(/\D/g, "")}`;
  }

  if (event.datePrecision === "year") {
    return `year-${event.date}`;
  }

  if (event.datePrecision === "month") {
    return `month-${event.date}`;
  }

  const date = new Date(event.date);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  return `month-${year}-${String(month).padStart(2, "0")}`;
}

function groupLabel(key: string): string {
  if (key.startsWith("decade-")) {
    return `${key.replace("decade-", "")}s`;
  }

  if (key.startsWith("year-")) {
    return key.replace("year-", "");
  }

  const [, year, month] = key.match(/^month-(\d{4})-(\d{2})$/) ?? [];
  if (year && month) {
    return formatBucketLabel(Number(year), Number(month));
  }

  return key;
}

export function groupEventsByDate(events: TimelineEvent[]): EventGroup[] {
  const groups = new Map<string, TimelineEvent[]>();

  for (const event of events) {
    const key = groupKey(event);
    const bucket = groups.get(key) ?? [];
    bucket.push(event);
    groups.set(key, bucket);
  }

  return [...groups.entries()].map(([key, groupedEvents]) => ({
    key,
    label: groupLabel(key),
    events: groupedEvents,
  }));
}
