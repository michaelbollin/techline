import { readFileSync } from "node:fs";

import { bucketPathForEvent, loadTimeline } from "../lib/timeline/load";

const { events, buckets } = await loadTimeline(undefined, { includeDeferred: true });

const validationText = readFileSync("content/timeline/VALIDATION.txt", "utf8");
const lineRe = /^([a-z0-9][a-z0-9-]*) - (.+?) \[([x~\-])\]\s*$/;

const validationEntries = new Map<string, { title: string; status: string }>();

for (const line of validationText.split("\n")) {
  const match = line.match(lineRe);
  if (!match) {
    continue;
  }

  const [, id, title, status] = match;
  const existing = validationEntries.get(id!);
  if (!existing) {
    validationEntries.set(id!, { title: title!, status: status! });
    continue;
  }

  if (status === "-") {
    existing.status = "-";
  } else if (status === "~" && existing.status === "x") {
    existing.status = "~";
  }
}

const jsonIds = new Set(events.map((event) => event.id));
const validationIds = new Set(validationEntries.keys());

const missingFromValidation = [...jsonIds].filter((id) => !validationIds.has(id)).sort();
const missingFromJson = [...validationIds].filter((id) => !jsonIds.has(id)).sort();
const nuance = [...validationEntries.entries()]
  .filter(([, value]) => value.status === "~")
  .map(([id]) => id)
  .sort();
const material = [...validationEntries.entries()]
  .filter(([, value]) => value.status === "-")
  .map(([id]) => id)
  .sort();

const actualPath = new Map<string, string>();
for (const bucket of buckets) {
  for (const event of bucket.events) {
    actualPath.set(event.id, bucket.relativePath);
  }
}

const bucketMismatches: string[] = [];
for (const event of events) {
  const expected = bucketPathForEvent(event);
  const actual = actualPath.get(event.id);
  if (actual !== expected) {
    bucketMismatches.push(`${event.id}: actual ${actual} expected ${expected}`);
  }
}

const missingDateSource: string[] = [];
const missingOverviewSource: string[] = [];
for (const event of events) {
  const sources = event.sources ?? [];
  if (!sources.some((source) => source.role === "date")) {
    missingDateSource.push(event.id);
  }
  if (!sources.some((source) => source.role === "overview")) {
    missingOverviewSource.push(event.id);
  }
}

const titleDrift: string[] = [];
for (const event of events) {
  const validation = validationEntries.get(event.id);
  if (!validation) {
    continue;
  }

  const normalize = (value: string) => value.trim().toLowerCase();
  if (normalize(validation.title) !== normalize(event.title)) {
    titleDrift.push(`${event.id}: json="${event.title}" validation="${validation.title}"`);
  }
}

const issueBlocks: string[] = [];
const blocks = validationText.split(/\n(?=[a-z0-9][a-z0-9-]* - )/);
for (const block of blocks) {
  if (!/^\s*Issue:/m.test(block) && !/^\s*Suggest:/m.test(block)) {
    continue;
  }

  const id = block.match(/^([a-z0-9][a-z0-9-]*) - /)?.[1];
  if (!id || !jsonIds.has(id)) {
    continue;
  }

  if (block.includes("[x]") && /Issue:/.test(block)) {
    const issues = [...block.matchAll(/^\s*Issue: (.+)$/gm)].map((match) => match[1]);
    issueBlocks.push(`${id}: ${issues.join(" | ")}`);
  }
}

console.log("=== COUNTS ===");
console.log(`JSON events: ${events.length}`);
console.log(`VALIDATION unique ids: ${validationIds.size}`);
console.log(`Missing from VALIDATION.txt: ${missingFromValidation.length}`);
console.log(`In VALIDATION but not JSON: ${missingFromJson.length}`);
console.log(`Marked [~] in validation: ${nuance.length}`);
console.log(`Marked [-] in validation: ${material.length}`);
console.log(`Bucket path mismatches: ${bucketMismatches.length}`);
console.log(`Missing date source: ${missingDateSource.length}`);
console.log(`Missing overview source: ${missingOverviewSource.length}`);
console.log(`Title drift vs validation index: ${titleDrift.length}`);
console.log(`Verified [x] with open Issue notes: ${issueBlocks.length}`);

if (missingFromValidation.length > 0) {
  console.log("\n=== NOT IN VALIDATION.TXT ===");
  console.log(missingFromValidation.join("\n"));
}

if (missingFromJson.length > 0) {
  console.log("\n=== IN VALIDATION BUT REMOVED FROM JSON ===");
  console.log(missingFromJson.join("\n"));
}

if (material.length > 0) {
  console.log("\n=== MATERIAL ISSUES [-] ===");
  console.log(material.join("\n"));
}

if (nuance.length > 0) {
  console.log("\n=== MINOR NUANCE [~] ===");
  console.log(nuance.join("\n"));
}

if (bucketMismatches.length > 0) {
  console.log("\n=== BUCKET MISMATCHES ===");
  console.log(bucketMismatches.join("\n"));
}

if (titleDrift.length > 0) {
  console.log("\n=== TITLE DRIFT ===");
  console.log(titleDrift.join("\n"));
}

if (issueBlocks.length > 0) {
  console.log("\n=== VERIFIED [x] WITH OPEN ISSUE NOTES ===");
  console.log(issueBlocks.join("\n"));
}
