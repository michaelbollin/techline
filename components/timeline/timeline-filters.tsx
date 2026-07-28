"use client";

import { useEffect, useMemo } from "react";

import { Button } from "@/components/ui/button";
import {
  FilterSidebar,
  FilterSidebarBody,
  FilterSidebarFooter,
  FilterSidebarHeader,
  FilterSidebarTitle,
} from "@/components/ui/filter/filter-sidebar";
import { useTimelineFilterOptions } from "@/hooks/use-timeline-filter-options";
import type { FilterUpdater } from "@/hooks/use-timeline-filters";
import { toggleFilterId } from "@/lib/timeline/filters";
import type { TimelineEvent } from "@/lib/timeline/schema";

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
    <Button
      variant="icon"
      aria-expanded={isOpen}
      aria-controls="timeline-filter-sidebar"
      aria-label={ariaLabel}
      onClick={onToggle}
    >
      <FilterToggleIcon isOpen={isOpen} />
      {!isOpen && activeCount > 0 && (
        <span
          className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-0.5 font-mono text-xs leading-none font-semibold text-white"
          aria-hidden
        >
          {activeCount}
        </span>
      )}
    </Button>
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
  onClose,
  onOpenChange,
}: TimelineFilterSidebarProps) {
  const { themeOptions } = useTimelineFilterOptions(events);

  const selectedThemeIds = useMemo(
    () => new Set([...activeFilterIds].filter((id) => themeOptions.some((option) => option.id === id))),
    [activeFilterIds, themeOptions],
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

  if (!isOpen) {
    return null;
  }

  return (
    <FilterSidebar id="timeline-filter-sidebar">
      <FilterSidebarHeader>
        <FilterSidebarTitle>Filters</FilterSidebarTitle>
        <TimelineSearchFilter
          className="mt-6"
          value={fulltextQuery}
          onChange={onFulltextChange}
        />
      </FilterSidebarHeader>

      <FilterSidebarBody>
        <ThemeFilterList
          options={themeOptions}
          selectedIds={selectedThemeIds}
          onToggle={toggle}
        />
      </FilterSidebarBody>

      <FilterSidebarFooter>
        <Button variant="text" onClick={onReset}>
          Reset all
        </Button>
      </FilterSidebarFooter>
    </FilterSidebar>
  );
}
