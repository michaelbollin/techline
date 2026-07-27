/**
 * Seeds company links onto timeline events from tag rules + manual attributions.
 * Run: npm run seed:companies
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { companiesForEvent } from "../lib/timeline/company-attributions";
import { CONTENT_DIR } from "../lib/timeline/load";
import { timelineBucketFileSchema, type TimelineEvent } from "../lib/timeline/schema";

async function collectJsonFiles(dir: string, baseDir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const absolutePath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectJsonFiles(absolutePath, baseDir)));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".json")) {
      files.push(path.relative(baseDir, absolutePath));
    }
  }

  return files.sort();
}

async function main() {
  const jsonFiles = await collectJsonFiles(CONTENT_DIR, CONTENT_DIR);
  let updated = 0;
  let withCompanies = 0;

  for (const relativePath of jsonFiles) {
    const absolute = path.join(CONTENT_DIR, relativePath);
    const raw = await readFile(absolute, "utf8");
    const parsed = timelineBucketFileSchema.parse(JSON.parse(raw));
    let bucketChanged = false;

    const events = parsed.events.map((event) => {
      const companies = companiesForEvent(event);
      if (companies.length > 0) {
        withCompanies++;
      }

      const existing = JSON.stringify(event.companies ?? []);
      const next = JSON.stringify(companies);
      if (existing !== next) {
        bucketChanged = true;
        updated++;
      }

      return { ...event, companies } satisfies TimelineEvent;
    });

    if (bucketChanged) {
      await writeFile(absolute, `${JSON.stringify({ events }, null, 2)}\n`, "utf8");
    }
  }

  console.log(`Companies: updated ${updated} events (${withCompanies} with at least one company).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
