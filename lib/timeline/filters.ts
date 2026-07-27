import {
  TIMELINE_FILTER_GROUPS,
  type TimelineFilterDef,
} from "./filter-definitions";
import { buildSearchFilterDefs } from "./filter-options";
import type { TimelineEvent } from "./schema";

export type { TimelineFilterDef, TimelineFilterGroup } from "./filter-definitions";
export { TIMELINE_FILTER_GROUPS } from "./filter-definitions";

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
export function countFilterMatches(events: TimelineEvent[]): Map<string, number> {
  const registry = buildFilterRegistry(events);
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
): TimelineEvent[] {
  if (activeFilterIds.size === 0) {
    return events;
  }

  const registry = buildFilterRegistry(events);

  return events.filter((event) =>
    [...activeFilterIds].some((id) => registry.get(id)?.matches(event)),
  );
}
