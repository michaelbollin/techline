import { useMemo } from "react";

import {
  TIMELINE_FILTER_GROUPS,
  buildFilterRegistry,
  countFilterMatches,
} from "@/lib/timeline/filters";
import type { TimelineEvent } from "@/lib/timeline/schema";

export type ThemeFilterOption = {
  id: string;
  label: string;
  count?: number;
};

export function useTimelineFilterOptions(events: TimelineEvent[]) {
  const themeOptions = useMemo(() => {
    const registry = buildFilterRegistry(events);
    const matchCounts = countFilterMatches(events, registry);

    return TIMELINE_FILTER_GROUPS.find((group) => group.id === "theme")!
      .filters.filter((filter) => (matchCounts.get(filter.id) ?? 0) > 0)
      .map((filter) => ({
        id: filter.id,
        label: filter.label,
        count: matchCounts.get(filter.id),
      }));
  }, [events]);

  return { themeOptions };
}
