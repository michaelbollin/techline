/**
 * Seeds connectivity / access-network milestones into content/timeline buckets.
 * Run: npm run seed:connectivity
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

import { bucketPathForEvent, CONTENT_DIR } from "../lib/timeline/load";
import { timelineBucketFileSchema, type TimelineEvent } from "../lib/timeline/schema";
import { CONNECTIVITY_MILESTONES } from "./data/connectivity-milestones";

async function loadBucket(relativePath: string) {
  const absolute = path.join(CONTENT_DIR, relativePath);
  try {
    const raw = await readFile(absolute, "utf8");
    return { absolute, parsed: timelineBucketFileSchema.parse(JSON.parse(raw)) };
  } catch {
    return { absolute, parsed: { events: [] as TimelineEvent[] } };
  }
}

async function main() {
  let added = 0;
  let updated = 0;
  const byBucket = new Map<string, TimelineEvent[]>();

  for (const event of CONNECTIVITY_MILESTONES) {
    const bucketPath = bucketPathForEvent(event);
    const list = byBucket.get(bucketPath) ?? [];
    list.push(event);
    byBucket.set(bucketPath, list);
  }

  for (const [relativePath, newEvents] of byBucket) {
    const { absolute, parsed } = await loadBucket(relativePath);
    const indexById = new Map(parsed.events.map((event, index) => [event.id, index]));

    for (const event of newEvents) {
      const existingIndex = indexById.get(event.id);
      if (existingIndex !== undefined) {
        parsed.events[existingIndex] = event;
        updated++;
        continue;
      }
      parsed.events.push(event);
      indexById.set(event.id, parsed.events.length - 1);
      added++;
    }

    await mkdir(path.dirname(absolute), { recursive: true });
    await writeFile(absolute, `${JSON.stringify({ events: parsed.events }, null, 2)}\n`, "utf8");
  }

  console.log(`Connectivity milestones: added ${added}, updated ${updated}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
