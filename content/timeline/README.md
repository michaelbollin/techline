# Timeline content

Static JSON buckets in this folder. **File path is the calendar structure** — only create months that have events.

## Layout

```
content/timeline/
  1947/year.json          # year-precision events (no known month/day)
  1969/year.json
  1969/10.json            # October 1969 — day or month precision
  1981/year.json
  1983/09.json
  1991/08.json
  2020/06.json            # dense AI months get their own file
  2022/11.json
  2024/03.json
  decades/1970.json       # optional — decade-precision only
```

Rules:

| File path | Use for | `datePrecision` |
|-----------|---------|-----------------|
| `YYYY/MM.json` | Events with a known month | `day` or `month` |
| `YYYY/year.json` | Year known, month unknown | `year` |
| `decades/YYYY.json` | Decade-level landmarks | `decade` |

Do **not** create empty month files. Sparse early history might only have `year.json` buckets; modern eras can have many `YYYY/MM.json` files with multiple events each.

Each file contains only:

```json
{
  "events": [ ... ]
}
```

## Adding an event

1. Decide the date precision (`day`, `month`, `year`, or `decade`).
2. Pick the matching file path:
   - ChatGPT launch `2022-11-30` → `2022/11.json`
   - Transistor `1947` → `1947/year.json`
3. Create the file if it does not exist yet.
4. Append the event object to `events`.
5. Run `npm run validate`.

Helper in code:

```ts
import { bucketPathForEvent } from "@/lib/timeline";

bucketPathForEvent({ date: "2022-11-30", datePrecision: "day" });
// → "2022/11.json"
```

## Event object

| Field | Required | Notes |
|------|----------|-------|
| `id` | yes | Unique kebab-case key |
| `slug` | yes | URL slug; usually same as `id` |
| `date` | yes | Must match the bucket file (see below) |
| `datePrecision` | yes | Must match the bucket file type |
| `title` | yes | Display headline |
| `summary` | yes | One sentence for collapsed timeline row |
| `about` | yes | Plain-language: what this was used for, typical apps/examples (for readers who never used it) |
| `narrative` | yes | Expanded copy — why it matters historically |
| `category` | yes | See categories below |
| `tags` | no | Filters, e.g. `llm`, `internet`, `people` |
| `people` | no | Key figures on this milestone — see [People](#people) |
| `companies` | no | Vendor / foundation on this milestone — see [Companies](#companies) |
| `importance` | yes | `1` landmark, `2` standard, `3` dense |
| `media` | no | YouTube, links, memes, images |
| `sources` | no | Citations — prefer two links: `role: "date"` confirms when, `role: "overview"` confirms what it was for (Wikipedia, official docs) |
| `relatedIds` | no | Other event ids |

### Date formats by precision

| `datePrecision` | `date` example | File |
|-----------------|----------------|------|
| `day` | `"2022-11-30"` | `2022/11.json` |
| `month` | `"2022-11"` | `2022/11.json` |
| `year` | `"1947"` | `1947/year.json` |
| `decade` | `"1970"` | `decades/1970.json` |

### Narrative block

Keep `summary` short for the timeline list. Use `about` for accessible context — who used it, what they built, 1–2 concrete examples:

```json
"summary": "Microsoft launched Visual Basic at Comdex…",
"about": "Visual Basic let non-specialists build Windows desktop apps: drag buttons onto a form, double-click to write event code. Typical apps: inventory tools, accounting front-ends, and in-house CRUD screens.",
"narrative": {
  "whyChosen": "Why this event is in the timeline.",
  "whyImportant": "Why it mattered.",
  "problemSolved": "What problem or constraint it addressed."
}
```

### Sources

Every event should cite **two kinds** of trusted link:

| `role` | Confirms | Examples |
|--------|----------|----------|
| `"date"` | When it happened | Press release, author chronology, official release page, archive.org announcement |
| `"overview"` | What it was for | Wikipedia language page, official docs, vendor “what is” page |

The `about` field is editorial text for readability — it should match the overview source, not add unsourced claims.

### People

Use milestone titles like **founds**, **creates**, **named CEO**, **researches** — not biographical birthdays.

**Avoid duplicate events** when a tech milestone already exists. Attach people to the existing event instead of adding a second "Torvalds creates Git" entry:

1. **Tech event exists** (e.g. `git-created`) → add attribution in `lib/timeline/people-attributions.ts` (merged at load time).
2. **No tech event** (e.g. `microsoft-founded`, `satya-nadella-microsoft-ceo`) → add a people milestone in `scripts/data/people-milestones.ts` and run `npx tsx scripts/seed-people-milestones.ts`.

```json
"people": [
  { "id": "linus-torvalds", "name": "Linus Torvalds", "role": "creator" }
]
```

Roles: `creator`, `co-creator`, `founder`, `co-founder`, `ceo`, `cto`, `researcher`, `author`, `maintainer`.

Tag people milestones with `"people"` in `tags`. Use `importance: 1` for world-changing figures (founders of major platforms, Turing-level researchers); `2` for significant but narrower milestones.

### Companies

Link events to a vendor, foundation, or research lab when one clearly sponsored or shipped the work. See [COMPANY-MAP.md](./COMPANY-MAP.md) for the full generated index.

1. **Tag inference** — tags like `microsoft`, `dotnet`, `google`, `android` map to companies via `lib/timeline/company-registry.ts`.
2. **Manual override** — add `lib/timeline/company-attributions.ts` when tags are ambiguous.
3. **Seeded onto events** — run `npm run seed:companies` to write the `companies` array into each event JSON bucket.

```json
"companies": [
  { "id": "microsoft", "name": "Microsoft" }
]
```

Regenerate after registry/attribution edits:

```bash
npm run seed:companies
npm run generate:company-map
```

```json
"sources": [
  {
    "title": "Microsoft — Introduces C# (June 26, 2000)",
    "url": "https://news.microsoft.com/source/2000/06/26/...",
    "role": "date"
  },
  {
    "title": "Wikipedia — C# (overview)",
    "url": "https://en.wikipedia.org/wiki/C_Sharp_(programming_language)",
    "role": "overview"
  }
]
```

### Media

```json
"media": [
  { "type": "youtube", "url": "https://www.youtube.com/watch?v=...", "title": "..." },
  { "type": "link", "url": "https://...", "title": "Primary source" },
  { "type": "meme", "url": "https://knowyourmeme.com/...", "caption": "Why it fits" },
  { "type": "image", "url": "https://...", "title": "Photo" }
]
```

## Categories

`invention`, `hardware`, `software`, `protocol`, `company`, `culture`, `ai`, `quote`

### Quotes

Famous words in tech — predictions, laws, memes, and controversies. See [RESEARCH-PLAN-QUOTES.md](./RESEARCH-PLAN-QUOTES.md).

- Set `category: "quote"` and required `quoteText` (exact wording or canonical short form).
- Tag tone: `insight`, `prediction`, `controversy`, `critique`, `meme`, `warning` — always include `quote`.
- Link related tech/people milestones via `relatedIds`; don't duplicate product launches.
- Add definitions in `scripts/data/quotes.ts`, then `npx tsx scripts/seed-quotes.ts`.

## Importance

- `1` — landmark, always visible
- `2` — normal timeline density
- `3` — minor/detailed (e.g. individual model releases in a busy month)

Multiple events in one month file is expected — especially for AI-era months.

## Validation

```bash
npm run validate
```

Checks:

- JSON schema
- file path matches each event's date and precision
- unique `id`s across all buckets
- valid `relatedIds` references
- every `PEOPLE_ATTRIBUTIONS` key matches an existing event id
- every `COMPANY_ATTRIBUTIONS` key matches an existing event id

## Loading (for Next.js later)

```ts
import { loadTimeline } from "@/lib/timeline";

const { events, buckets } = await loadTimeline();
// events — flat sorted list
// buckets — monthly/yearly groupings with path metadata
```

## Authoring tips

- Put many events in the same `YYYY/MM.json` when they share a month.
- Use `importance: 3` to keep busy months manageable in the UI later.
- Keep `id` stable once published.
- Prefer primary sources for dates; Wikipedia or official docs for overview/purpose.
- **People milestones:** see [RESEARCH-PLAN-PEOPLE.md](./RESEARCH-PLAN-PEOPLE.md) for batch backlog and attribution rules.
