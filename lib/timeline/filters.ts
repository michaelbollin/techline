import {
  TIMELINE_FILTER_GROUPS,
  type TimelineFilterDef,
} from "./filter-definitions";
import { buildSearchFilterDefs } from "./filter-options";
import { filterEventsByFulltext } from "./fulltext-search";
import type { TimelineEvent } from "./schema";

export type { TimelineFilterDef, TimelineFilterGroup } from "./filter-definitions";
export { TIMELINE_FILTER_GROUPS } from "./filter-definitions";

export function hasActiveFilters(
  activeFilterIds: ReadonlySet<string>,
  fulltextQuery = "",
): boolean {
  return activeFilterIds.size > 0 || fulltextQuery.trim().length > 0;
}

export function filterSignature(
  activeFilterIds: ReadonlySet<string>,
  fulltextQuery = "",
): string {
  return [...activeFilterIds].sort().join(",") + (fulltextQuery ? `|${fulltextQuery}` : "");
}

export function toggleFilterId(prev: Set<string>, id: string): Set<string> {
  const next = new Set(prev);
  if (next.has(id)) {
    next.delete(id);
  } else {
    next.add(id);
  }
  return next;
}

export function removeFilters(
  prev: Set<string>,
  shouldRemove: (id: string) => boolean,
): Set<string> {
  const next = new Set(prev);
  for (const id of next) {
    if (shouldRemove(id)) {
      next.delete(id);
    }
  }
  return next;
}

export function buildFilterRegistry(events: TimelineEvent[]): Map<string, TimelineFilterDef> {
  const registry = new Map<string, TimelineFilterDef>();

  for (const group of TIMELINE_FILTER_GROUPS) {
    for (const filter of group.filters) {
      registry.set(filter.id, filter);
    }
  }

  for (const filter of buildSearchFilterDefs(events)) {
    registry.set(filter.id, filter);
  }

  return registry;
}

/** Count how many events each filter matches (for hiding empty filters). */
export function countFilterMatches(
  events: TimelineEvent[],
  registry: Map<string, TimelineFilterDef> = buildFilterRegistry(events),
): Map<string, number> {
  const counts = new Map<string, number>();

  for (const filter of registry.values()) {
    let count = 0;
    for (const event of events) {
      if (filter.matches(event)) {
        count += 1;
      }
    }
    counts.set(filter.id, count);
  }

  return counts;
}

export function filterTimelineEvents(
  events: TimelineEvent[],
  activeFilterIds: ReadonlySet<string>,
  fulltextQuery = "",
): TimelineEvent[] {
  let filtered = events;

  if (activeFilterIds.size > 0) {
    const registry = buildFilterRegistry(events);

    filtered = filtered.filter((event) =>
      [...activeFilterIds].some((id) => registry.get(id)?.matches(event)),
    );
  }

  return filterEventsByFulltext(filtered, fulltextQuery);
}
