import { useMemo } from "react";

import {
  TIMELINE_FILTER_GROUPS,
  buildFilterRegistry,
  countFilterMatches,
} from "@/lib/timeline/filters";
import type { TimelineEvent } from "@/lib/timeline/schema";

export type FilterCheckboxOption = {
  id: string;
  label: string;
  count?: number;
};

export function useTimelineFilterOptions(events: TimelineEvent[]) {
  const themeOptions = useMemo(() => {
    const registry = buildFilterRegistry(events);
    const matchCounts = countFilterMatches(events, registry);
    const group = TIMELINE_FILTER_GROUPS.find((entry) => entry.id === "theme");

    if (!group) {
      return [];
    }

    return group.filters
      .filter((filter) => (matchCounts.get(filter.id) ?? 0) > 0)
      .map((filter) => ({
        id: filter.id,
        label: filter.label,
        count: matchCounts.get(filter.id),
      }));
  }, [events]);

  return { themeOptions };
}
