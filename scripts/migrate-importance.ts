#!/usr/bin/env tsx
/** One-time migration: legacy importance 0–3 → 0–9 scale. */

import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { migrateLegacyImportance } from "../lib/timeline/importance";

const TIMELINE = join(import.meta.dirname, "../content/timeline");

function walkJsonFiles(dir: string): string[] {
  const files: string[] = [];

  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...walkJsonFiles(full));
    } else if (entry.endsWith(".json")) {
      files.push(full);
    }
  }

  return files;
}

let migrated = 0;

for (const file of walkJsonFiles(TIMELINE)) {
  const raw = readFileSync(file, "utf8");
  const data = JSON.parse(raw) as { events?: Array<{ importance?: number }> };

  if (!Array.isArray(data.events)) {
    continue;
  }

  let changed = false;

  for (const event of data.events) {
    if (typeof event.importance !== "number" || event.importance > 3) {
      continue;
    }

    const next = migrateLegacyImportance(event.importance);
    if (next !== event.importance) {
      event.importance = next;
      changed = true;
      migrated++;
    }
  }

  if (changed) {
    writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  }
}

console.log(`Migrated ${migrated} event importance values.`);
