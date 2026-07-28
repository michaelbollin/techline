"use client";

import { useEffect, useMemo } from "react";

import { useTimelineFilterOptions } from "@/hooks/use-timeline-filter-options";
import type { FilterUpdater } from "@/hooks/use-timeline-filters";
import { removeFilters, toggleFilterId } from "@/lib/timeline/filters";
import { isSearchFilterId } from "@/lib/timeline/filter-options";
import type { TimelineEvent } from "@/lib/timeline/schema";

import { ActiveFilterChips } from "./active-filter-chips";
import { FilterToggleIcon } from "./filter-toggle-icon";
import { ThemeFilterList } from "./theme-filter-list";
import { TimelineSearchFilter } from "./timeline-search-filter";

type TimelineFilterTriggerProps = {
  isOpen: boolean;
  activeCount: number;
  onToggle: () => void;
};

export function TimelineFilterTrigger({ isOpen, activeCount, onToggle }: TimelineFilterTriggerProps) {
  const ariaLabel = isOpen
    ? "Close filters"
    : activeCount > 0
      ? `Filters, ${activeCount} active`
      : "Filters";

  return (
    <button
      type="button"
      className={`timeline-filter-trigger ${isOpen ? "is-open" : ""} ${activeCount > 0 ? "has-selection" : ""}`}
      aria-expanded={isOpen}
      aria-controls="timeline-filter-sidebar"
      aria-label={ariaLabel}
      onClick={onToggle}
    >
      <FilterToggleIcon isOpen={isOpen} />
      {!isOpen && activeCount > 0 && (
        <span className="timeline-filter-trigger-count" aria-hidden>
          {activeCount}
        </span>
      )}
    </button>
  );
}

type TimelineFilterSidebarProps = {
  isOpen: boolean;
  events: TimelineEvent[];
  activeFilterIds: Set<string>;
  onChange: (updater: FilterUpdater) => void;
  onReset: () => void;
  onFulltextChange: (query: string) => void;
  fulltextQuery: string;
  resetNonce?: number;
  onClose: () => void;
  onOpenChange?: (open: boolean) => void;
};

export function TimelineFilterSidebar({
  isOpen,
  events,
  activeFilterIds,
  onChange,
  onReset,
  onFulltextChange,
  fulltextQuery,
  resetNonce = 0,
  onClose,
  onOpenChange,
}: TimelineFilterSidebarProps) {
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

  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  const toggle = (id: string) => {
    onChange((prev) => toggleFilterId(prev, id));
  };

  const clearSearch = () => {
    onFulltextChange("");
    onChange((prev) => removeFilters(prev, isSearchFilterId));
  };

  if (!isOpen) {
    return null;
  }

  return (
    <aside
      id="timeline-filter-sidebar"
      className="timeline-filter-sidebar"
      role="region"
      aria-label="Filter timeline events"
    >
      <header className="timeline-filter-sidebar-header">
        <h2 className="timeline-filter-sidebar-title">Filters</h2>
      </header>

      <div className="timeline-filter-sidebar-body">
        <ActiveFilterChips
          fulltextQuery={fulltextQuery}
          chips={selectedSearchOptions}
          onClearFulltext={() => onFulltextChange("")}
          onRemoveChip={toggle}
        />

        <TimelineSearchFilter
          layout="pane"
          options={searchOptions}
          selectedIds={selectedSearchIds}
          onToggle={toggle}
          onClear={clearSearch}
          onFulltextChange={onFulltextChange}
          fulltextQuery={fulltextQuery}
          resetNonce={resetNonce}
        />

        <ThemeFilterList
          options={themeOptions}
          selectedIds={selectedThemeIds}
          onToggle={toggle}
        />
      </div>

      <footer className="timeline-filter-sidebar-footer">
        <button type="button" className="timeline-reset-button" onClick={onReset}>
          Reset all
        </button>
      </footer>
    </aside>
  );
}
