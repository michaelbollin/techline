"use client";

import { useMemo } from "react";

import { useTimelineFilterOptions } from "@/hooks/use-timeline-filter-options";
import type { FilterUpdater } from "@/hooks/use-timeline-filters";
import { removeFilters, toggleFilterId } from "@/lib/timeline/filters";
import { isSearchFilterId } from "@/lib/timeline/filter-options";
import type { TimelineEvent } from "@/lib/timeline/schema";

import { ActiveFilterChips } from "./active-filter-chips";
import { TimelineSearchFilter } from "./timeline-search-filter";
import { ThemeDropdown } from "./theme-dropdown";

type TimelineFiltersProps = {
  events: TimelineEvent[];
  activeFilterIds: Set<string>;
  onChange: (updater: FilterUpdater) => void;
  onReset: () => void;
  onFulltextChange: (query: string) => void;
  fulltextQuery: string;
  resetNonce?: number;
  onThemeMenuOpenChange?: (open: boolean) => void;
};

export function TimelineFilters({
  events,
  activeFilterIds,
  onChange,
  onReset,
  onFulltextChange,
  fulltextQuery,
  resetNonce = 0,
  onThemeMenuOpenChange,
}: TimelineFiltersProps) {
  const { themeOptions, searchOptions } = useTimelineFilterOptions(events);

  const selectedThemeIds = useMemo(
    () => new Set([...activeFilterIds].filter((id) => themeOptions.some((option) => option.id === id))),
    [activeFilterIds, themeOptions],
  );

  const selectedSearchIds = useMemo(
    () => new Set([...activeFilterIds].filter((id) => isSearchFilterId(id))),
    [activeFilterIds],
  );

  const selectedSearchOptions = useMemo(
    () => searchOptions.filter((option) => selectedSearchIds.has(option.id)),
    [searchOptions, selectedSearchIds],
  );

  const toggle = (id: string) => {
    onChange((prev) => toggleFilterId(prev, id));
  };

  const clearThemes = () => {
    onChange((prev) =>
      removeFilters(prev, (id) => themeOptions.some((option) => option.id === id)),
    );
  };

  const clearSearch = () => {
    onFulltextChange("");
    onChange((prev) => removeFilters(prev, isSearchFilterId));
  };

  return (
    <nav className="timeline-filters" aria-label="Filter timeline events">
      <div className="timeline-filters-row">
        <TimelineSearchFilter
          options={searchOptions}
          selectedIds={selectedSearchIds}
          onToggle={toggle}
          onClear={clearSearch}
          onFulltextChange={onFulltextChange}
          fulltextQuery={fulltextQuery}
          resetNonce={resetNonce}
        />
        <ThemeDropdown
          options={themeOptions}
          selectedIds={selectedThemeIds}
          onToggle={toggle}
          onClear={clearThemes}
          onOpenChange={onThemeMenuOpenChange}
        />
        <button type="button" className="timeline-reset-button" onClick={onReset}>
          Reset
        </button>
      </div>

      <ActiveFilterChips
        fulltextQuery={fulltextQuery}
        chips={selectedSearchOptions}
        onClearFulltext={() => onFulltextChange("")}
        onRemoveChip={toggle}
      />
    </nav>
  );
}
