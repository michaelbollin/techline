import { writeFileSync } from "node:fs";

import { findThinCohorts } from "../lib/timeline/deferred-cohorts";
import { readDeferredEventIds } from "../lib/timeline/deferred-events";
import { loadTimeline } from "../lib/timeline/load";
import { OUT_OF_SCOPE_EVENT_IDS } from "../lib/timeline/out-of-scope-events";

const { events: allEvents } = await loadTimeline(undefined, { includeDeferred: true });
const thinCohorts = findThinCohorts(allEvents);
const deferredIds = await readDeferredEventIds(allEvents);
const eventById = new Map(allEvents.map((event) => [event.id, event]));

const lines = [
  "# Deferred timeline events",
  "",
  "Hidden from the public axis — still in JSON for later curation.",
  `Generated ${new Date().toISOString().slice(0, 10)}.`,
  "",
  `- **${deferredIds.size}** events deferred`,
  `- **${allEvents.length - deferredIds.size}** events visible`,
  "",
  "## Out of scope (not dev/programming history)",
  "",
  "Office suites, consumer media, and generic business SaaS that did not shape how software is built.",
  "",
];

for (const eventId of OUT_OF_SCOPE_EVENT_IDS) {
  const event = eventById.get(eventId);
  lines.push(`- \`${eventId}\`${event ? ` — ${event.title}` : " (missing)"}`);
}

lines.push("", "## Thin cohorts", "");

if (thinCohorts.length === 0) {
  lines.push("(none)", "");
} else {
  for (const { rule, events } of thinCohorts) {
    lines.push(`### ${rule.label} (\`${rule.tag}\`, need ${rule.minimum}, have ${events.length})`);
    lines.push("");
    for (const event of events) {
      lines.push(`- \`${event.id}\` — ${event.title}`);
    }
    lines.push("");
  }
}

lines.push("## All deferred event ids", "", ...[...deferredIds].sort().map((id) => `- \`${id}\``), "");

writeFileSync("content/timeline/DEFERRED-EVENTS.md", lines.join("\n"), "utf8");

console.log(`Deferred: ${deferredIds.size} / ${allEvents.length}`);
console.log(`Out of scope: ${OUT_OF_SCOPE_EVENT_IDS.length}`);
for (const { rule, events } of thinCohorts) {
  console.log(`- ${rule.label}: ${events.map((event) => event.id).join(", ")}`);
}
console.log("Wrote content/timeline/DEFERRED-EVENTS.md");
