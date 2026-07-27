import { TIMELINE_FILTER_GROUPS, type TimelineFilterDef } from "./filter-definitions";
import type { TimelineEvent } from "./schema";

export type { TimelineFilterDef, TimelineFilterGroup } from "./filter-definitions";
export { TIMELINE_FILTER_GROUPS } from "./filter-definitions";

const FILTER_BY_ID = new Map<string, TimelineFilterDef>(
  TIMELINE_FILTER_GROUPS.flatMap((group) => group.filters).map((filter) => [filter.id, filter]),
);

/** Count how many events each filter matches (for hiding empty filters). */
export function countFilterMatches(events: TimelineEvent[]): Map<string, number> {
  const counts = new Map<string, number>();

  for (const group of TIMELINE_FILTER_GROUPS) {
    for (const filter of group.filters) {
      let count = 0;
      for (const event of events) {
        if (filter.matches(event)) {
          count += 1;
        }
      }
      counts.set(filter.id, count);
    }
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

  return events.filter((event) =>
    [...activeFilterIds].some((id) => FILTER_BY_ID.get(id)?.matches(event)),
  );
}
