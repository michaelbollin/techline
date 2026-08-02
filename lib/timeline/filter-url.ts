import { TIMELINE_FILTER_GROUPS } from "./filter-definitions";

export const FULLTEXT_QUERY_PARAM = "q";

export function parseFulltextQuery(
  searchParams: Pick<URLSearchParams, "get">,
): string {
  return searchParams.get(FULLTEXT_QUERY_PARAM)?.trim() ?? "";
}
import { buildFilterRegistry } from "./filters";
import { filterIdLabel, isCompanyFilterId, isPersonFilterId } from "./filter-options";
import type { TimelineEvent } from "./schema";

const STATIC_FILTER_BY_ID = new Map(
  TIMELINE_FILTER_GROUPS.flatMap((group) => group.filters).map((filter) => [filter.id, filter]),
);

const STATIC_SLUG_TO_FILTER_ID = new Map<string, string>();

for (const filter of STATIC_FILTER_BY_ID.values()) {
  STATIC_SLUG_TO_FILTER_ID.set(filterIdToSlug(filter.id), filter.id);
}

/** URL slug for a filter id, e.g. lang-javascript → javascript, person-linus-torvalds → person-linus-torvalds */
export function filterIdToSlug(filterId: string): string {
  if (filterId.startsWith("lang-")) {
    return filterId.slice(5);
  }

  if (filterId.startsWith("tech-")) {
    return filterId.slice(5);
  }

  if (filterId.startsWith("company-")) {
    return filterId;
  }

  if (filterId.startsWith("person-")) {
    return filterId;
  }

  return filterId;
}

export function slugToFilterId(slug: string): string | null {
  const normalized = slug.trim().toLowerCase();
  if (!normalized) {
    return null;
  }

  if (STATIC_SLUG_TO_FILTER_ID.has(normalized)) {
    return STATIC_SLUG_TO_FILTER_ID.get(normalized)!;
  }

  if (isPersonFilterId(normalized) || isCompanyFilterId(normalized)) {
    return normalized;
  }

  return null;
}

/** Parse `/javascript,web` path segment into active filter ids. */
export function parseFilterSegment(segment: string): Set<string> {
  const ids = new Set<string>();

  let decoded = segment;
  try {
    decoded = decodeURIComponent(segment);
  } catch {
    decoded = segment;
  }

  for (const part of decoded.split(",")) {
    const id = slugToFilterId(part);
    if (id) {
      ids.add(id);
    }
  }

  return ids;
}

export function filterIdsToPath(activeFilterIds: ReadonlySet<string>): string {
  if (activeFilterIds.size === 0) {
    return "/";
  }

  const slugs = [...activeFilterIds]
    .map((id) => filterIdToSlug(id))
    .sort((a, b) => a.localeCompare(b));

  return `/${slugs.join(",")}`;
}

/** Rebuild a safe timeline path from a `?from=` query segment. */
export function timelinePathFromFilterSegment(segment: string | undefined): string {
  if (!segment?.trim()) {
    return "/";
  }

  return filterIdsToPath(parseFilterSegment(segment));
}

export function filterLabels(
  activeFilterIds: ReadonlySet<string>,
  events?: TimelineEvent[],
): string[] {
  const registry = events ? buildFilterRegistry(events) : null;

  return [...activeFilterIds]
    .map((id) => registry?.get(id)?.label ?? STATIC_FILTER_BY_ID.get(id)?.label ?? filterIdLabel(id))
    .filter((label): label is string => Boolean(label));
}

export const KNOWN_FILTER_SLUGS = [...STATIC_SLUG_TO_FILTER_ID.keys()].sort();
