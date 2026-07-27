/**
 * Generates content/timeline/COMPANY-MAP.md — reference only, not applied to events at load time.
 * Run: npm run generate:company-map
 */
import { writeFile } from "node:fs/promises";
import path from "node:path";

import { resolveEventCompanies } from "../lib/timeline/company-attributions";
import { COMPANIES } from "../lib/timeline/company-registry";
import { loadTimeline } from "../lib/timeline/load";
import type { TimelineEvent } from "../lib/timeline/schema";

const OUTPUT = path.join(process.cwd(), "content/timeline/COMPANY-MAP.md");

function formatDate(event: TimelineEvent): string {
  return event.date;
}

async function main() {
  const { events } = await loadTimeline();
  const byCompany = new Map<string, { name: string; events: TimelineEvent[] }>();

  for (const event of events) {
    const companies = resolveEventCompanies(event);
    for (const company of companies) {
      const bucket = byCompany.get(company.id) ?? { name: company.name, events: [] };
      bucket.events.push(event);
      byCompany.set(company.id, bucket);
    }
  }

  const mappedCount = events.filter((event) => resolveEventCompanies(event).length > 0).length;
  const companyCount = byCompany.size;

  const lines: string[] = [
    "# Techline company map",
    "",
    "Companion to [RESEARCH-PLAN-PEOPLE.md](./RESEARCH-PLAN-PEOPLE.md). Links timeline events to **companies, vendors, and foundations** when one is clearly involved.",
    "",
    `**Coverage:** ${mappedCount} of ${events.length} events mapped · ${companyCount} organizations`,
    "",
    "> Reference map only — not wired into timeline load/schema yet. Regenerate with `npm run generate:company-map`. Edit `lib/timeline/company-registry.ts` (tag rules) or `lib/timeline/company-attributions.ts` (manual overrides).",
    "",
    "---",
    "",
    "## Rules",
    "",
    "1. **Programming-oriented vendors** — Microsoft, Google, Oracle, Mozilla, etc. Standards bodies (IETF, W3C) and research labs (CERN, Bell Labs) are included when they are the clear sponsor.",
    "2. **Tag inference** — if an event tag maps to a company in `company-registry.ts`, that company is listed in this map.",
    "3. **Manual overrides** — `lib/timeline/company-attributions.ts` when tags are ambiguous (e.g. WebKit shared by Apple and Google).",
    "4. **No company** — independent open-source projects, academic papers, and cross-vendor standards may have no company (left unmapped).",
    "",
    "---",
    "",
    "## By company",
    "",
  ];

  const sortedCompanies = [...byCompany.entries()].sort((a, b) =>
    a[1].name.localeCompare(b[1].name),
  );

  for (const [companyId, { name, events: companyEvents }] of sortedCompanies) {
    const sortedEvents = [...companyEvents].sort((a, b) => a.date.localeCompare(b.date));
    lines.push(`### ${name} (\`${companyId}\`) — ${sortedEvents.length} events`, "");
    lines.push("| Date | Event id | Title |", "|------|----------|-------|");
    for (const event of sortedEvents) {
      lines.push(`| ${formatDate(event)} | \`${event.id}\` | ${event.title} |`);
    }
    lines.push("");
  }

  lines.push("---", "", "## Event index", "");
  lines.push("| Event id | Company | How |", "|----------|---------|-----|");

  for (const event of events) {
    const companies = resolveEventCompanies(event);
    if (!companies.length) {
      continue;
    }
    const names = companies.map((c) => c.name).join(", ");
    const sources = [...new Set(companies.map((c) => c.source))].join(", ");
    lines.push(`| \`${event.id}\` | ${names} | ${sources} |`);
  }

  lines.push("", "---", "", "## Registry reference", "");
  lines.push("| Company id | Display name |", "|------------|--------------|");
  for (const [id, { name }] of Object.entries(COMPANIES).sort((a, b) =>
    a[1].name.localeCompare(b[1].name),
  )) {
    lines.push(`| \`${id}\` | ${name} |`);
  }
  lines.push("");

  await writeFile(OUTPUT, `${lines.join("\n")}\n`, "utf8");
  console.log(`Wrote ${OUTPUT} (${mappedCount} events, ${companyCount} companies).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
