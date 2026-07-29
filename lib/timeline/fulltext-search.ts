import type { TimelineEvent } from "./schema";

function normalizeText(value: string): string {
  return value.toLowerCase();
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Split a query into terms; every term must match the same event (AND). */
export function parseFulltextTerms(query: string): string[] {
  return normalizeText(query.trim())
    .split(/[\s,]+/)
    .map((term) => term.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, ""))
    .filter(Boolean);
}

function termMatchesHaystack(haystack: string, term: string): boolean {
  const pattern = new RegExp(`\\b${escapeRegExp(term)}\\b`);
  return pattern.test(haystack);
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
  const terms = parseFulltextTerms(query);

  if (terms.length === 0) {
    return true;
  }

  const haystack = eventSearchText(event);
  return terms.every((term) => termMatchesHaystack(haystack, term));
}

export function filterEventsByFulltext(events: TimelineEvent[], query: string): TimelineEvent[] {
  const trimmed = query.trim();
  if (!trimmed) {
    return events;
  }

  return events.filter((event) => eventMatchesFulltext(event, trimmed));
}
