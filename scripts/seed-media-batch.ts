#!/usr/bin/env npx tsx
/**
 * Seed timeline images using paced Wikipedia lookups, Openverse fallback,
 * and license checks before download.
 *
 * Usage:
 *   npx tsx scripts/seed-media-batch.ts [offset] [limit] [--dry-run] [--force]
 *   npx tsx scripts/seed-media-batch.ts 120 50
 *   npx tsx scripts/seed-media-batch.ts 120 50 --only=event-id --force
 */
import { mkdirSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { loadTimeline } from "../lib/timeline/load";
import { getMediaBatchConfig } from "./data/media-batches";
import {
  downloadImage,
  extensionFromUrl,
  fetchCommonsMeta,
  formatCommonsCaption,
  isReusableLicense,
  resolveOpenverseImage,
  resolveWikipediaImage,
  sleep,
} from "./lib/media-sources";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const MEDIA_DIR = join(ROOT, "public/media/timeline");
const UA = "TechlineMediaSeed/1.0 (timeline; mailto:contact@techline.dev)";
const DELAY_MS = 3000;

const offset = Number(process.argv[2] ?? 320);
const limit = Number(process.argv[3] ?? 50);
const dryRun = process.argv.includes("--dry-run");
const force = process.argv.includes("--force");
const onlyArg = process.argv.find((arg) => arg.startsWith("--only="));
const onlyIds = onlyArg ? onlyArg.slice("--only=".length).split(",") : null;

const { wikiTitles, openverseQueries, commonsOverrides } = getMediaBatchConfig(offset);

function findBucketFile(eventId: string) {
  function walk(dir: string): string | null {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name);
      if (name.endsWith(".json")) {
        const raw = readFileSync(path, "utf8");
        if (raw.includes(`"id": "${eventId}"`)) {
          return path.replace(`${ROOT}/`, "");
        }
      } else {
        const found = walk(path);
        if (found) {
          return found;
        }
      }
    }
    return null;
  }

  return walk(join(ROOT, "content/timeline"));
}

function updateBucket(bucketPath: string, eventId: string, media: unknown[]) {
  const fullPath = join(ROOT, bucketPath);
  const bucket = JSON.parse(readFileSync(fullPath, "utf8")) as {
    events: Array<{ id: string; media: unknown[] }>;
  };

  const event = bucket.events.find((entry) => entry.id === eventId);
  if (!event) {
    throw new Error(`Event ${eventId} not found in ${bucketPath}`);
  }

  event.media = media;
  writeFileSync(fullPath, `${JSON.stringify(bucket, null, 2)}\n`);
}

async function main() {
  const { events } = await loadTimeline();
  const batch = events.slice(offset, offset + limit);

  mkdirSync(MEDIA_DIR, { recursive: true });

  let ok = 0;
  let skipped = 0;
  let failed = 0;

  for (const event of batch) {
    if (onlyIds && !onlyIds.includes(event.id)) {
      continue;
    }

    const wikiTitle = wikiTitles[event.id];
    if (!wikiTitle) {
      console.log(`SKIP ${event.id}: no Wikipedia title mapping`);
      skipped++;
      continue;
    }

    const existing = readdirSync(MEDIA_DIR).find((name) => name.startsWith(`${event.id}.`));
    if (existing && !force) {
      console.log(`SKIP ${event.id}: ${existing} already exists`);
      skipped++;
      continue;
    }

    if (existing && force) {
      unlinkSync(join(MEDIA_DIR, existing));
      console.log(`FORCE ${event.id}: removed ${existing}`);
    }

    console.log(`LOOKUP ${event.id} -> ${wikiTitle}`);

    const commonsOverride = commonsOverrides[event.id];
    let resolved = null as Awaited<ReturnType<typeof resolveWikipediaImage>>;

    if (commonsOverride) {
      const meta = await fetchCommonsMeta(commonsOverride, UA);
      if (meta && isReusableLicense(meta.license)) {
        resolved = {
          imageUrl: meta.url,
          title: wikiTitle,
          caption: formatCommonsCaption(meta),
          source: "wikipedia",
          license: meta.license,
        };
      }
    }

    if (!resolved) {
      resolved = await resolveWikipediaImage(wikiTitle, UA);
    }

    if (!resolved) {
      const openverseQuery = openverseQueries[event.id] ?? `${wikiTitle} computer history`;
      console.log(`  Wikipedia miss, trying Openverse: ${openverseQuery}`);
      await sleep(DELAY_MS);
      resolved = await resolveOpenverseImage(openverseQuery, UA);
    }

    if (!resolved) {
      console.log(`FAIL ${event.id}: no licensed image found`);
      failed++;
      await sleep(DELAY_MS);
      continue;
    }

    const actualExt = extensionFromUrl(resolved.imageUrl);
    const actualFileName = `${event.id}.${actualExt}`;
    const actualDest = join(MEDIA_DIR, actualFileName);

    console.log(
      `  ${resolved.source} | ${resolved.license} | ${resolved.title} | ${resolved.imageUrl}`,
    );

    if (dryRun) {
      ok++;
      await sleep(DELAY_MS);
      continue;
    }

    const downloaded = await downloadImage(resolved.imageUrl, actualDest, UA);
    if (!downloaded) {
      console.log(`FAIL ${event.id}: download failed`);
      failed++;
      await sleep(DELAY_MS);
      continue;
    }

    const bucketFile = findBucketFile(event.id);
    if (!bucketFile) {
      console.log(`FAIL ${event.id}: bucket file not found`);
      failed++;
      continue;
    }

    updateBucket(bucketFile, event.id, [
      {
        type: "image",
        url: `/media/timeline/${actualFileName}`,
        title: resolved.title,
        caption: resolved.caption,
      },
    ]);

    console.log(`OK ${event.id} -> ${actualFileName}`);
    ok++;
    await sleep(DELAY_MS);
  }

  console.log(`Done. ok=${ok} skipped=${skipped} failed=${failed}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
