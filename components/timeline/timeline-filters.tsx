"use client";

import { useMemo } from "react";

import type { FilterUpdater } from "@/hooks/use-timeline-filters";
import {
  TIMELINE_FILTER_GROUPS,
  buildFilterRegistry,
  countFilterMatches,
} from "@/lib/timeline/filters";
import {
  SEARCH_FILTER_KIND_LABELS,
  isSearchFilterId,
  searchFilterKind,
} from "@/lib/timeline/filter-options";
import type { TimelineEvent } from "@/lib/timeline/schema";

import { TimelineSearchFilter } from "./timeline-search-filter";
import { ThemeDropdown } from "./theme-dropdown";

type TimelineFiltersProps = {
  events: TimelineEvent[];
  activeFilterIds: Set<string>;
  onChange: (updater: FilterUpdater) => void;
  onThemeMenuOpenChange?: (open: boolean) => void;
};

export function TimelineFilters({
  events,
  activeFilterIds,
  onChange,
  onThemeMenuOpenChange,
}: TimelineFiltersProps) {
  const registry = useMemo(() => buildFilterRegistry(events), [events]);
  const matchCounts = useMemo(() => countFilterMatches(events), [events]);

  const themeOptions = useMemo(
    () =>
      TIMELINE_FILTER_GROUPS.find((group) => group.id === "theme")!.filters
        .filter((filter) => (matchCounts.get(filter.id) ?? 0) > 0)
        .map((filter) => ({
          id: filter.id,
          label: filter.label,
          count: matchCounts.get(filter.id),
        })),
    [matchCounts],
  );

  const searchOptions = useMemo(
    () =>
      [...registry.values()]
        .filter((filter) => isSearchFilterId(filter.id))
        .filter((filter) => (matchCounts.get(filter.id) ?? 0) > 0)
        .map((filter) => ({
          id: filter.id,
          label: filter.label,
          kind: searchFilterKind(filter.id)!,
          count: matchCounts.get(filter.id),
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    [matchCounts, registry],
  );

  const selectedThemeIds = useMemo(
    () => new Set([...activeFilterIds].filter((id) => themeOptions.some((option) => option.id === id))),
    [activeFilterIds, themeOptions],
  );

  const toggle = (id: string) => {
    onChange((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectedSearchIds = useMemo(
    () => new Set([...activeFilterIds].filter((id) => isSearchFilterId(id))),
    [activeFilterIds],
  );

  const selectedSearchOptions = useMemo(
    () => searchOptions.filter((option) => selectedSearchIds.has(option.id)),
    [searchOptions, selectedSearchIds],
  );

  const clearThemes = () => {
    onChange((prev) => {
      const next = new Set(prev);
      for (const option of themeOptions) {
        next.delete(option.id);
      }
      return next;
    });
  };

  const clearSearch = () => {
    onChange((prev) => {
      const next = new Set(prev);
      for (const id of next) {
        if (isSearchFilterId(id)) {
          next.delete(id);
        }
      }
      return next;
    });
  };

  return (
    <nav className="timeline-filters" aria-label="Filter timeline events">
      <div className="timeline-filters-row">
        <TimelineSearchFilter
          options={searchOptions}
          selectedIds={selectedSearchIds}
          onToggle={toggle}
          onClear={clearSearch}
        />
        <ThemeDropdown
          options={themeOptions}
          selectedIds={selectedThemeIds}
          onToggle={toggle}
          onClear={clearThemes}
          onOpenChange={onThemeMenuOpenChange}
        />
      </div>

      {selectedSearchOptions.length > 0 && (
        <ul className="timeline-search-filter-chips" aria-label="Active search filters">
          {selectedSearchOptions.map((option) => (
            <li key={option.id}>
              <button
                type="button"
                className="timeline-search-filter-chip"
                onClick={() => toggle(option.id)}
              >
                <span className="timeline-search-filter-chip-kind">
                  {SEARCH_FILTER_KIND_LABELS[option.kind]}
                </span>
                <span>{option.label}</span>
                <span aria-hidden>×</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
