import type { TimelineEvent } from "./schema";

function normalizeText(value: string): string {
  return value.toLowerCase();
}

function eventSearchText(event: TimelineEvent): string {
  const parts = [
    event.title,
    event.summary,
    event.about,
    event.quoteText,
    event.category,
    ...event.tags,
    ...event.people.map((person) => person.name),
    ...event.companies.map((company) => company.name),
    event.narrative.whyChosen,
    event.narrative.whyImportant,
    event.narrative.problemSolved,
  ];

  return normalizeText(parts.filter(Boolean).join(" "));
}

export function eventMatchesFulltext(event: TimelineEvent, query: string): boolean {
  const terms = normalizeText(query.trim())
    .split(/\s+/)
    .filter(Boolean);

  if (terms.length === 0) {
    return true;
  }

  const haystack = eventSearchText(event);
  return terms.every((term) => haystack.includes(term));
}

export function filterEventsByFulltext(events: TimelineEvent[], query: string): TimelineEvent[] {
  const trimmed = query.trim();
  if (!trimmed) {
    return events;
  }

  return events.filter((event) => eventMatchesFulltext(event, trimmed));
}
