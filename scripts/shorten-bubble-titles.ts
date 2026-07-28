import fs from "node:fs";
import path from "node:path";

import { CONTENT_DIR } from "../lib/timeline/load";
import { SHORT_BUBBLE_TITLES } from "../lib/timeline/short-titles";

function walkJsonFiles(dir: string): string[] {
  const files: string[] = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const filePath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkJsonFiles(filePath));
    } else if (entry.name.endsWith(".json")) {
      files.push(filePath);
    }
  }

  return files;
}

let updated = 0;

for (const filePath of walkJsonFiles(CONTENT_DIR)) {
  const raw = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(raw) as { events?: Array<{ id: string; title: string }> };
  let changed = false;

  for (const event of data.events ?? []) {
    const shortTitle = SHORT_BUBBLE_TITLES[event.id];
    if (shortTitle && event.title !== shortTitle) {
      event.title = shortTitle;
      changed = true;
      updated += 1;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`);
  }
}

console.log(`Updated ${updated} event titles in content.`);

const seedFiles = [
  path.join(process.cwd(), "scripts/data/quotes.ts"),
  path.join(process.cwd(), "scripts/data/people-milestones.ts"),
];

let seedUpdated = 0;

for (const filePath of seedFiles) {
  let source = fs.readFileSync(filePath, "utf8");

  for (const [id, shortTitle] of Object.entries(SHORT_BUBBLE_TITLES)) {
    const pattern = new RegExp(`(id:\\s*"${id}"[\\s\\S]*?title:\\s*)"[^"]*"`);
    const next = source.replace(pattern, `$1"${shortTitle.replace(/"/g, '\\"')}"`);
    if (next !== source) {
      source = next;
      seedUpdated += 1;
    }
  }

  fs.writeFileSync(filePath, source);
}

console.log(`Updated ${seedUpdated} event titles in seed data.`);
