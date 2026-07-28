import { writeFileSync } from "node:fs";

import { loadTimeline } from "../lib/timeline/load";

const { events } = await loadTimeline();

const rows = events.map((e) => ({
  id: e.id,
  title: e.title,
  date: e.date,
  category: e.category,
  tags: e.tags,
  importance: e.importance,
}));

writeFileSync(
  "/tmp/techline-events.json",
  JSON.stringify(rows, null, 2),
);

console.log(`Exported ${rows.length} events`);
