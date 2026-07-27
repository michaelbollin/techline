import { TIMELINE_FILTER_GROUPS } from "./filters";

const FILTER_BY_ID = new Map(
  TIMELINE_FILTER_GROUPS.flatMap((group) => group.filters).map((filter) => [filter.id, filter]),
);

const SLUG_TO_FILTER_ID = new Map<string, string>();

for (const filter of FILTER_BY_ID.values()) {
  SLUG_TO_FILTER_ID.set(filterIdToSlug(filter.id), filter.id);
}

/** URL slug for a filter id, e.g. lang-javascript → javascript, web → web */
export function filterIdToSlug(filterId: string): string {
  if (filterId.startsWith("lang-")) {
    return filterId.slice(5);
  }

  return filterId;
}

export function slugToFilterId(slug: string): string | null {
  const normalized = slug.trim().toLowerCase();
  if (!normalized) {
    return null;
  }

  return SLUG_TO_FILTER_ID.get(normalized) ?? null;
}

/** Parse `/javascript,web` path segment into active filter ids. */
export function parseFilterSegment(segment: string): Set<string> {
  const ids = new Set<string>();

  for (const part of segment.split(",")) {
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

export function filterLabels(activeFilterIds: ReadonlySet<string>): string[] {
  return [...activeFilterIds]
    .map((id) => FILTER_BY_ID.get(id)?.label)
    .filter((label): label is string => Boolean(label));
}

export const KNOWN_FILTER_SLUGS = [...SLUG_TO_FILTER_ID.keys()].sort();
