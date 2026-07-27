"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

import {
  SEARCH_FILTER_KIND_LABELS,
  type SearchFilterKind,
} from "@/lib/timeline/filter-options";

export type TimelineSearchOption = {
  id: string;
  label: string;
  kind: SearchFilterKind;
  count?: number;
};

type TimelineSearchFilterProps = {
  options: TimelineSearchOption[];
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
  onClear: () => void;
};

const MAX_RESULTS = 12;

function normalizeQuery(value: string): string {
  return value.trim().toLowerCase();
}

function rankOptions(options: TimelineSearchOption[], query: string): TimelineSearchOption[] {
  const normalized = normalizeQuery(query);
  if (!normalized) {
    return [];
  }

  return options
    .filter((option) => option.label.toLowerCase().includes(normalized))
    .sort((a, b) => {
      const aLabel = a.label.toLowerCase();
      const bLabel = b.label.toLowerCase();
      const aExact = aLabel === normalized;
      const bExact = bLabel === normalized;
      if (aExact !== bExact) {
        return aExact ? -1 : 1;
      }

      const aStarts = aLabel.startsWith(normalized);
      const bStarts = bLabel.startsWith(normalized);
      if (aStarts !== bStarts) {
        return aStarts ? -1 : 1;
      }

      if (aLabel.length !== bLabel.length) {
        return aLabel.length - bLabel.length;
      }

      return a.label.localeCompare(b.label);
    })
    .slice(0, MAX_RESULTS);
}

export function TimelineSearchFilter({
  options,
  selectedIds,
  onToggle,
  onClear,
}: TimelineSearchFilterProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const results = useMemo(() => rankOptions(options, query), [options, query]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  const toggleOption = (id: string) => {
    onToggle(id);
    inputRef.current?.focus();
  };

  return (
    <div
      ref={rootRef}
      className={`timeline-search-filter ${isOpen ? "is-open" : ""} ${selectedIds.size > 0 ? "has-selection" : ""}`}
    >
      <label className="timeline-search-filter-label" htmlFor={`${listboxId}-input`}>
        Search
      </label>

      <div className="timeline-search-filter-field">
        <input
          ref={inputRef}
          id={`${listboxId}-input`}
          type="search"
          className="timeline-search-filter-input"
          value={query}
          placeholder="People, companies, languages, technologies…"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-autocomplete="list"
          role="combobox"
          onFocus={() => setIsOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setIsOpen(false);
              setQuery("");
              inputRef.current?.blur();
            }

            if (event.key === "Enter" && results[0]) {
              event.preventDefault();
              toggleOption(results[0].id);
            }
          }}
        />

        {selectedIds.size > 0 && (
          <button
            type="button"
            className="timeline-search-filter-clear"
            aria-label="Clear search filters"
            onClick={() => {
              onClear();
              setQuery("");
            }}
          >
            ×
          </button>
        )}
      </div>

      {isOpen && query.trim().length > 0 && (
        <ul id={listboxId} className="timeline-search-filter-list" role="listbox" aria-label="Search suggestions">
          {results.length === 0 ? (
            <li className="timeline-search-filter-empty">No matches</li>
          ) : (
            results.map((option) => {
              const checked = selectedIds.has(option.id);

              return (
                <li key={option.id} role="option" aria-selected={checked}>
                  <label
                    className={`timeline-search-filter-option ${checked ? "is-selected" : ""}`}
                    onMouseDown={(event) => event.preventDefault()}
                  >
                    <input
                      type="checkbox"
                      className="timeline-filter-checkbox"
                      checked={checked}
                      onChange={() => toggleOption(option.id)}
                    />
                    <span className="timeline-search-filter-option-kind">
                      {SEARCH_FILTER_KIND_LABELS[option.kind]}
                    </span>
                    <span className="timeline-search-filter-option-label">{option.label}</span>
                    {option.count !== undefined && (
                      <span className="timeline-search-filter-option-count" aria-hidden>
                        {option.count}
                      </span>
                    )}
                  </label>
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
}
