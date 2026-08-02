/**
 * Wrap glossary terms in timeline event text with `[term]` markup.
 * Only processes summary, about, and narrative fields that have no brackets yet.
 *
 * Usage: npx tsx scripts/apply-glossary-markup-batch.ts [limit]
 */
import fs from "node:fs";
import path from "node:path";

import { GLOSSARY_ENTRIES } from "../lib/glossary";

const CONTENT_DIR = path.join(process.cwd(), "content/timeline");
const NARRATIVE_KEYS = ["whyChosen", "whyImportant", "problemSolved"] as const;
const TEXT_KEYS = ["summary", "about", "quoteText"] as const;

type Event = {
  summary?: string;
  about?: string;
  quoteText?: string;
  narrative?: Record<string, string>;
};

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function isCaseSensitiveKey(key: string): boolean {
  if (key.includes(" ")) {
    return false;
  }

  return key !== key.toLowerCase();
}

function termPattern(key: string): string {
  const escaped = escapeRegex(key);
  if (key.includes(" ")) {
    return escaped;
  }

  return `\\b${escaped}\\b`;
}

const sortedKeys = Object.keys(GLOSSARY_ENTRIES).sort((a, b) => b.length - a.length);

function splitOutsideBrackets(text: string): { plain: boolean; value: string }[] {
  const parts: { plain: boolean; value: string }[] = [];
  let index = 0;

  for (const match of text.matchAll(/\[([^\]]+)\]/g)) {
    const start = match.index ?? 0;
    if (start > index) {
      parts.push({ plain: true, value: text.slice(index, start) });
    }
    parts.push({ plain: false, value: match[0] });
    index = start + match[0].length;
  }

  if (index < text.length) {
    parts.push({ plain: true, value: text.slice(index) });
  }

  return parts.length > 0 ? parts : [{ plain: true, value: text }];
}

function wrapPlainSegment(segment: string): string {
  const selected: { start: number; end: number; key: string }[] = [];

  for (const key of sortedKeys) {
    const flags = isCaseSensitiveKey(key) ? "g" : "gi";
    const pattern = new RegExp(termPattern(key), flags);

    for (const match of segment.matchAll(pattern)) {
      const start = match.index ?? 0;
      const end = start + match[0].length;
      const overlaps = selected.some((entry) => start < entry.end && end > entry.start);

      if (!overlaps) {
        selected.push({ start, end, key });
      }
    }
  }

  selected.sort((a, b) => a.start - b.start);

  let result = "";
  let last = 0;

  for (const match of selected) {
    result += segment.slice(last, match.start) + `[${match.key}]`;
    last = match.end;
  }

  return result + segment.slice(last);
}

function applyMarkupToText(text: string): string {
  if (!text) {
    return text;
  }

  return splitOutsideBrackets(text)
    .map((part) => (part.plain ? wrapPlainSegment(part.value) : part.value))
    .join("");
}

function applyToEvent(event: Event): boolean {
  let changed = false;

  for (const key of TEXT_KEYS) {
    const value = event[key];
    if (!value) {
      continue;
    }

    const next = applyMarkupToText(value);
    if (next !== value) {
      event[key] = next;
      changed = true;
    }
  }

  if (event.narrative) {
    for (const key of NARRATIVE_KEYS) {
      const value = event.narrative[key];
      if (!value) {
        continue;
      }

      const next = applyMarkupToText(value);
      if (next !== value) {
        event.narrative[key] = next;
        changed = true;
      }
    }
  }

  return changed;
}

function walkJsonFiles(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    if (fs.statSync(fullPath).isDirectory()) {
      walkJsonFiles(fullPath, out);
    } else if (entry.endsWith(".json")) {
      out.push(fullPath);
    }
  }

  return out.sort();
}

const limit = Number(process.argv[2] ?? 50);
let updated = 0;
const updatedSlugs: string[] = [];

for (const file of walkJsonFiles(CONTENT_DIR)) {
  if (updated >= limit) {
    break;
  }

  const raw = fs.readFileSync(file, "utf8");
  const data = JSON.parse(raw) as { events?: (Event & { slug?: string; id?: string })[] };
  let fileChanged = false;

  for (const event of data.events ?? []) {
    if (updated >= limit) {
      break;
    }

    if (applyToEvent(event)) {
      fileChanged = true;
      updated += 1;
      updatedSlugs.push(event.slug ?? event.id ?? "unknown");
    }
  }

  if (fileChanged) {
    fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
  }
}

console.log(`Updated ${updated} events with glossary markup.`);
for (const slug of updatedSlugs) {
  console.log(`  ${slug}`);
}
