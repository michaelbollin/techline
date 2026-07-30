import { readFile } from "node:fs/promises";
import path from "node:path";

import { deferredIdsFromThinCohorts } from "./deferred-cohorts";
import { OUT_OF_SCOPE_EVENT_ID_SET } from "./out-of-scope-events";
import type { TimelineEvent } from "./schema";
import { isValidEventId, parseWrongEventImageIds } from "./wrong-images";

export const DEFERRED_EVENTS_PATH = path.join(process.cwd(), "scripts/deferred-events.txt");

export { isValidEventId };

export function parseDeferredEventIds(content: string): Set<string> {
  return parseWrongEventImageIds(content);
}

export async function readManualDeferredEventIds(): Promise<Set<string>> {
  try {
    const content = await readFile(DEFERRED_EVENTS_PATH, "utf8");
    return parseDeferredEventIds(content);
  } catch {
    return new Set();
  }
}

export async function readDeferredEventIds(events: TimelineEvent[]): Promise<Set<string>> {
  const manual = await readManualDeferredEventIds();
  const automatic = deferredIdsFromThinCohorts(events);
  return new Set([...manual, ...automatic, ...OUT_OF_SCOPE_EVENT_ID_SET]);
}

export function isDeferredEvent(eventId: string, deferredIds: ReadonlySet<string>): boolean {
  return deferredIds.has(eventId);
}
