import { readFile } from "node:fs/promises";
import path from "node:path";

import { deferredIdsFromThinCohorts } from "./deferred-cohorts";
import { parseIdListFile } from "./id-list-file";
import { OUT_OF_SCOPE_EVENT_ID_SET } from "./out-of-scope-events";
import type { TimelineEvent } from "./schema";

const DEFERRED_EVENTS_PATH = path.join(process.cwd(), "scripts/deferred-events.txt");

async function readManualDeferredEventIds(): Promise<Set<string>> {
  try {
    const content = await readFile(DEFERRED_EVENTS_PATH, "utf8");
    return parseIdListFile(content);
  } catch {
    return new Set();
  }
}

export async function readDeferredEventIds(events: TimelineEvent[]): Promise<Set<string>> {
  const manual = await readManualDeferredEventIds();
  const automatic = deferredIdsFromThinCohorts(events);
  return new Set([...manual, ...automatic, ...OUT_OF_SCOPE_EVENT_ID_SET]);
}
