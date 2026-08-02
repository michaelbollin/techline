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

import { FilterCheckboxList } from "./filter-checkbox-list";
import { FilterToggleIcon } from "./filter-toggle-icon";
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
  variant?: "dock" | "overlay";
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
  variant = "dock",
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
        if (document.querySelector('[role="dialog"][aria-modal="true"]')) {
          return;
        }

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
    <>
      {variant === "overlay" && (
        <button
          type="button"
          className="fixed inset-x-0 top-14 bottom-0 z-30 bg-black/20"
          aria-label="Close filters"
          onClick={onClose}
        />
      )}

      <FilterSidebar
        id="timeline-filter-sidebar"
        className={
          variant === "overlay"
            ? "fixed inset-x-0 top-14 bottom-0 z-40 w-full border-l-0"
            : undefined
        }
      >
      <FilterSidebarHeader inset={variant === "overlay" ? "overlay" : "dock"}>
        <FilterSidebarTitle className={variant === "overlay" ? "pt-0" : undefined}>
          Filters
        </FilterSidebarTitle>
        <TimelineSearchFilter
          className="mt-6"
          value={fulltextQuery}
          onChange={onFulltextChange}
        />
      </FilterSidebarHeader>

      <FilterSidebarBody inset={variant === "overlay" ? "overlay" : "dock"}>
        <FilterCheckboxList
          className="mt-6"
          label="Theme"
          options={themeOptions}
          selectedIds={selectedThemeIds}
          onToggle={toggle}
        />
      </FilterSidebarBody>

      <FilterSidebarFooter inset={variant === "overlay" ? "overlay" : "dock"}>
        <Button variant="text" onClick={onReset}>
          Reset all
        </Button>
      </FilterSidebarFooter>
    </FilterSidebar>
    </>
  );
}
