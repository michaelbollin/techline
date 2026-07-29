import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import {
  timelineBucketFileSchema,
  timelineEventSchema,
  type TimelineBucket,
  type TimelineEvent,
} from "./schema";
import { enrichEventWithPeople } from "./people-attributions";

export const CONTENT_DIR = path.join(process.cwd(), "content/timeline");

export type LoadedTimeline = {
  buckets: TimelineBucket[];
  events: TimelineEvent[];
};

const MONTH_FILE_PATTERN = /^(\d{4})\/(0[1-9]|1[0-2])\.json$/;
const YEAR_FILE_PATTERN = /^(\d{4})\/year\.json$/;
const DECADE_FILE_PATTERN = /^decades\/(\d{4})\.json$/;

export function parseBucketPath(relativePath: string): Omit<TimelineBucket, "events" | "relativePath"> {
  const normalized = relativePath.replaceAll("\\", "/");

  const monthMatch = MONTH_FILE_PATTERN.exec(normalized);
  if (monthMatch) {
    return {
      kind: "month",
      year: Number.parseInt(monthMatch[1], 10),
      month: Number.parseInt(monthMatch[2], 10),
    };
  }

  const yearMatch = YEAR_FILE_PATTERN.exec(normalized);
  if (yearMatch) {
    return {
      kind: "year",
      year: Number.parseInt(yearMatch[1], 10),
      month: null,
    };
  }

  const decadeMatch = DECADE_FILE_PATTERN.exec(normalized);
  if (decadeMatch) {
    return {
      kind: "decade",
      year: Number.parseInt(decadeMatch[1], 10),
      month: null,
    };
  }

  throw new Error(
    `Invalid timeline path "${relativePath}". Expected YYYY/MM.json, YYYY/year.json, or decades/YYYY.json`,
  );
}

function parseEventParts(event: TimelineEvent): { year: number; month: number | null; day: number | null } {
  if (event.datePrecision === "decade") {
    const decade = Number.parseInt(event.date.replace(/\D/g, ""), 10);
    return { year: decade, month: null, day: null };
  }

  if (/^\d{4}$/.test(event.date)) {
    return { year: Number.parseInt(event.date, 10), month: null, day: null };
  }

  if (/^\d{4}-\d{2}$/.test(event.date)) {
    const [year, month] = event.date.split("-").map(Number);
    return { year, month, day: null };
  }

  const parsed = Date.parse(event.date);
  if (Number.isNaN(parsed)) {
    throw new Error(`Invalid date "${event.date}" on event "${event.id}"`);
  }

  const d = new Date(parsed);
  return {
    year: d.getUTCFullYear(),
    month: d.getUTCMonth() + 1,
    day: d.getUTCDate(),
  };
}

export function assertEventMatchesBucket(
  event: TimelineEvent,
  bucket: Omit<TimelineBucket, "events" | "relativePath">,
  relativePath: string,
): void {
  const parts = parseEventParts(event);

  if (bucket.kind === "decade") {
    if (event.datePrecision !== "decade") {
      throw new Error(
        `Event "${event.id}" in ${relativePath} must use datePrecision "decade"`,
      );
    }

    if (parts.year !== bucket.year) {
      throw new Error(
        `Event "${event.id}" decade ${event.date} does not match bucket decade ${bucket.year} in ${relativePath}`,
      );
    }

    return;
  }

  if (bucket.kind === "year") {
    if (event.datePrecision !== "year") {
      throw new Error(
        `Event "${event.id}" in ${relativePath} must use datePrecision "year"`,
      );
    }

    if (parts.year !== bucket.year) {
      throw new Error(
        `Event "${event.id}" year ${parts.year} does not match bucket year ${bucket.year} in ${relativePath}`,
      );
    }

    return;
  }

  if (event.datePrecision !== "day" && event.datePrecision !== "month") {
    throw new Error(
      `Event "${event.id}" in ${relativePath} must use datePrecision "day" or "month"`,
    );
  }

  if (parts.year !== bucket.year || parts.month !== bucket.month) {
    throw new Error(
      `Event "${event.id}" date ${event.date} does not match bucket ${bucket.year}-${String(bucket.month).padStart(2, "0")} in ${relativePath}`,
    );
  }
}

function parseSortableDate(date: string, precision: TimelineEvent["datePrecision"]): number {
  if (precision === "decade") {
    const decade = Number.parseInt(date.replace(/\D/g, ""), 10);
    return decade * 10000;
  }

  if (/^\d{4}$/.test(date)) {
    return Number.parseInt(date, 10) * 10000;
  }

  if (/^\d{4}-\d{2}$/.test(date)) {
    const [year, month] = date.split("-").map(Number);
    return year * 10000 + month * 100;
  }

  const parsed = Date.parse(date);
  if (Number.isNaN(parsed)) {
    throw new Error(`Invalid date "${date}"`);
  }

  const d = new Date(parsed);
  return d.getUTCFullYear() * 10000 + (d.getUTCMonth() + 1) * 100 + d.getUTCDate();
}

export function sortEvents(events: TimelineEvent[]): TimelineEvent[] {
  return [...events].sort((a, b) => {
    const dateDiff =
      parseSortableDate(a.date, a.datePrecision) -
      parseSortableDate(b.date, b.datePrecision);

    if (dateDiff !== 0) {
      return dateDiff;
    }

    return a.title.localeCompare(b.title);
  });
}

export function assertUniqueIds(events: TimelineEvent[]): void {
  const seen = new Map<string, string>();

  for (const event of events) {
    if (seen.has(event.id)) {
      throw new Error(
        `Duplicate event id "${event.id}" (${seen.get(event.id)} and ${event.title})`,
      );
    }

    seen.set(event.id, event.title);
  }
}

async function collectJsonFiles(dir: string, baseDir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const absolutePath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name.startsWith(".")) {
        continue;
      }
      files.push(...(await collectJsonFiles(absolutePath, baseDir)));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".json")) {
      files.push(path.relative(baseDir, absolutePath));
    }
  }

  return files.sort();
}

export async function loadTimeline(contentDir = CONTENT_DIR): Promise<LoadedTimeline> {
  const jsonFiles = await collectJsonFiles(contentDir, contentDir);
  const buckets: TimelineBucket[] = [];
  const events: TimelineEvent[] = [];

  for (const relativePath of jsonFiles) {
    const bucketMeta = parseBucketPath(relativePath);
    const raw = await readFile(path.join(contentDir, relativePath), "utf8");
    const parsed = timelineBucketFileSchema.parse(JSON.parse(raw));
    const bucketEvents = parsed.events.map((event) => timelineEventSchema.parse(event));

    for (const event of bucketEvents) {
      assertEventMatchesBucket(event, bucketMeta, relativePath);
    }

    buckets.push({
      ...bucketMeta,
      relativePath,
      events: bucketEvents,
    });

    events.push(...bucketEvents);
  }

  assertUniqueIds(events);

  const enrichedEvents = events.map(enrichEventWithPeople);
  const enrichedBuckets = buckets.map((bucket) => ({
    ...bucket,
    events: bucket.events.map(enrichEventWithPeople),
  }));

  return {
    buckets: enrichedBuckets,
    events: sortEvents(enrichedEvents),
  };
}

export function getEventById(events: TimelineEvent[], id: string): TimelineEvent | undefined {
  return events.find((event) => event.id === id);
}

export function getEventsByCategory(
  events: TimelineEvent[],
  category: TimelineEvent["category"],
): TimelineEvent[] {
  return events.filter((event) => event.category === category);
}

export function getEventsByTag(events: TimelineEvent[], tag: string): TimelineEvent[] {
  return events.filter((event) => event.tags.includes(tag));
}

export function getBucketForEvent(
  buckets: TimelineBucket[],
  eventId: string,
): TimelineBucket | undefined {
  return buckets.find((bucket) => bucket.events.some((event) => event.id === eventId));
}

/** Where to create a file for a new event. */
export function bucketPathForEvent(event: Pick<TimelineEvent, "date" | "datePrecision">): string {
  if (event.datePrecision === "decade") {
    const decade = event.date.replace(/\D/g, "");
    return path.join("decades", `${decade}.json`);
  }

  if (event.datePrecision === "year") {
    return path.join(event.date, "year.json");
  }

  const parts = parseEventParts(event as TimelineEvent);
  if (parts.month === null) {
    throw new Error(`Cannot derive month bucket for event date "${event.date}"`);
  }

  const month = String(parts.month).padStart(2, "0");
  return path.join(String(parts.year), `${month}.json`);
}
