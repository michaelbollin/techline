import { writeFileSync } from "node:fs";

import { loadTimeline } from "../lib/timeline/load";
import type { TimelineEvent } from "../lib/timeline/schema";

const TITLES_PATH = "content/timeline/event-titles.txt";
const DUPLICATES_PATH = "content/timeline/event-titles-duplicates.txt";

function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/['’]/g, "'")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function duplicateGroups(
  events: TimelineEvent[],
  keyFor: (event: TimelineEvent) => string,
): Array<[string, TimelineEvent[]]> {
  const groups = new Map<string, TimelineEvent[]>();

  for (const event of events) {
    const key = keyFor(event);
    const list = groups.get(key) ?? [];
    list.push(event);
    groups.set(key, list);
  }

  return [...groups.entries()]
    .filter(([, list]) => list.length > 1)
    .sort(([a], [b]) => a.localeCompare(b));
}

function formatDuplicateReport(
  label: string,
  groups: Array<[string, TimelineEvent[]]>,
): string[] {
  const lines = [`## ${label}: ${groups.length} duplicate groups`, ""];

  if (groups.length === 0) {
    lines.push("(none)", "");
    return lines;
  }

  for (const [key, list] of groups) {
    lines.push(`${key} (${list.length}x)`);
    for (const event of list) {
      lines.push(`  - ${event.id} | ${event.date} | ${event.title}`);
    }
    lines.push("");
  }

  return lines;
}

const { events } = await loadTimeline();

writeFileSync(TITLES_PATH, events.map((event) => event.title).join("\n") + "\n", "utf8");

const duplicateChecks = [
  ["Exact titles", duplicateGroups(events, (event) => event.title.trim())],
  [
    "Case-insensitive titles",
    duplicateGroups(events, (event) => event.title.trim().toLowerCase()),
  ],
  ["Normalized titles", duplicateGroups(events, (event) => normalizeTitle(event.title))],
  ["Event ids", duplicateGroups(events, (event) => event.id)],
  ["Slugs", duplicateGroups(events, (event) => event.slug)],
] as const;

const duplicateLines = [
  "# Duplicate analysis for timeline events",
  `# ${events.length} events checked`,
  "",
  ...duplicateChecks.flatMap(([label, groups]) => formatDuplicateReport(label, groups)),
];

writeFileSync(DUPLICATES_PATH, duplicateLines.join("\n"), "utf8");

console.log(`Wrote ${events.length} titles to ${TITLES_PATH}`);
console.log(`Wrote duplicate report to ${DUPLICATES_PATH}`);

for (const [label, groups] of duplicateChecks) {
  console.log(`${label}: ${groups.length}`);
}
