"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import {
  TIMELINE_FILTER_GROUPS,
  countFilterMatches,
  type TimelineFilterDef,
  type TimelineFilterGroup,
} from "@/lib/timeline/filters";
import type { TimelineEvent } from "@/lib/timeline/schema";

type TimelineFiltersProps = {
  events: TimelineEvent[];
  activeFilterIds: Set<string>;
  onChange: (next: Set<string>) => void;
};

type OpenMenu = "theme" | "languages" | null;

function FilterMenu({
  group,
  isOpen,
  activeFilterIds,
  matchCounts,
  onToggle,
  onToggleMenu,
}: {
  group: TimelineFilterGroup;
  isOpen: boolean;
  activeFilterIds: Set<string>;
  matchCounts: Map<string, number>;
  onToggle: (id: string) => void;
  onToggleMenu: () => void;
}) {
  const visibleFilters = group.filters.filter((filter) => (matchCounts.get(filter.id) ?? 0) > 0);
  const activeCount = visibleFilters.filter((filter) => activeFilterIds.has(filter.id)).length;
  const menuId = `timeline-filter-menu-${group.id}`;

  return (
    <div className="timeline-filter-menu">
      <button
        type="button"
        className={`timeline-filter-trigger ${isOpen ? "is-open" : ""} ${activeCount > 0 ? "has-selection" : ""}`}
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={onToggleMenu}
      >
        <span>{group.label}</span>
        {activeCount > 0 && (
          <span className="timeline-filter-trigger-badge" aria-label={`${activeCount} selected`}>
            {activeCount}
          </span>
        )}
        <span className="timeline-filter-trigger-chevron" aria-hidden>
          ▾
        </span>
      </button>

      {isOpen && (
        <div id={menuId} className="timeline-filter-dropdown" role="dialog" aria-label={`${group.label} filters`}>
          <ul
            className={
              group.id === "languages"
                ? "timeline-filter-list timeline-filter-list-languages"
                : "timeline-filter-list"
            }
          >
            {visibleFilters.map((filter) => (
              <FilterOption
                key={filter.id}
                filter={filter}
                checked={activeFilterIds.has(filter.id)}
                count={matchCounts.get(filter.id) ?? 0}
                onToggle={onToggle}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function FilterOption({
  filter,
  checked,
  count,
  onToggle,
}: {
  filter: TimelineFilterDef;
  checked: boolean;
  count: number;
  onToggle: (id: string) => void;
}) {
  return (
    <li>
      <label className="timeline-filter-option">
        <input
          type="checkbox"
          className="timeline-filter-checkbox"
          checked={checked}
          onChange={() => onToggle(filter.id)}
        />
        <span className="timeline-filter-option-label">{filter.label}</span>
        <span className="timeline-filter-option-count" aria-hidden>
          {count}
        </span>
      </label>
    </li>
  );
}

export function TimelineFilters({ events, activeFilterIds, onChange }: TimelineFiltersProps) {
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const matchCounts = useMemo(() => countFilterMatches(events), [events]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  const toggle = (id: string) => {
    const next = new Set(activeFilterIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    onChange(next);
  };

  const clearAll = () => {
    onChange(new Set());
    setOpenMenu(null);
  };

  return (
    <nav ref={rootRef} className="timeline-filters" aria-label="Filter timeline events">
      {TIMELINE_FILTER_GROUPS.map((group) => (
        <FilterMenu
          key={group.id}
          group={group}
          isOpen={openMenu === group.id}
          activeFilterIds={activeFilterIds}
          matchCounts={matchCounts}
          onToggle={toggle}
          onToggleMenu={() =>
            setOpenMenu((current) =>
              current === group.id ? null : (group.id as OpenMenu),
            )
          }
        />
      ))}

      {activeFilterIds.size > 0 && (
        <button type="button" className="timeline-filters-clear" onClick={clearAll}>
          Clear
        </button>
      )}
    </nav>
  );
}
