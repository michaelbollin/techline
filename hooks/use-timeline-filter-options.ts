import { useMemo } from "react";

import {
  TIMELINE_FILTER_GROUPS,
  buildFilterRegistry,
  countFilterMatches,
} from "@/lib/timeline/filters";
import { isSearchFilterId, searchFilterKind } from "@/lib/timeline/filter-options";
import type { SearchFilterKind } from "@/lib/timeline/filter-options";
import type { TimelineEvent } from "@/lib/timeline/schema";

export type ThemeFilterOption = {
  id: string;
  label: string;
  count?: number;
};

export type SearchFilterOption = {
  id: string;
  label: string;
  kind: SearchFilterKind;
  count?: number;
};

export function useTimelineFilterOptions(events: TimelineEvent[]) {
  const { themeOptions, searchOptions } = useMemo(() => {
    const registry = buildFilterRegistry(events);
    const matchCounts = countFilterMatches(events, registry);

    const themeOptions: ThemeFilterOption[] = TIMELINE_FILTER_GROUPS.find(
      (group) => group.id === "theme",
    )!
      .filters.filter((filter) => (matchCounts.get(filter.id) ?? 0) > 0)
      .map((filter) => ({
        id: filter.id,
        label: filter.label,
        count: matchCounts.get(filter.id),
      }));

    const searchOptions: SearchFilterOption[] = [...registry.values()]
      .filter((filter) => isSearchFilterId(filter.id))
      .filter((filter) => (matchCounts.get(filter.id) ?? 0) > 0)
      .map((filter) => ({
        id: filter.id,
        label: filter.label,
        kind: searchFilterKind(filter.id)!,
        count: matchCounts.get(filter.id),
      }))
      .sort((a, b) => a.label.localeCompare(b.label));

    return { themeOptions, searchOptions };
  }, [events]);

  return { themeOptions, searchOptions };
}
