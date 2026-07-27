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
| `summary` | yes | One sentence for collapsed view |
| `narrative` | yes | Expanded copy |
| `category` | yes | See categories below |
| `tags` | no | Filters, e.g. `llm`, `internet` |
| `importance` | yes | `1` landmark, `2` standard, `3` dense |
| `media` | no | YouTube, links, memes, images |
| `sources` | no | Citations |
| `relatedIds` | no | Other event ids |

### Date formats by precision

| `datePrecision` | `date` example | File |
|-----------------|----------------|------|
| `day` | `"2022-11-30"` | `2022/11.json` |
| `month` | `"2022-11"` | `2022/11.json` |
| `year` | `"1947"` | `1947/year.json` |
| `decade` | `"1970"` | `decades/1970.json` |

### Narrative block

```json
"narrative": {
  "whyChosen": "Why this event is in the timeline.",
  "whyImportant": "Why it mattered.",
  "problemSolved": "What problem or constraint it addressed."
}
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
- Prefer primary sources in `sources`; use `media` for videos, memes, and extras.
