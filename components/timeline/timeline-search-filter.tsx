"use client";

import { useCallback, useId, useRef, useState } from "react";

import { useClickOutside } from "@/hooks/use-click-outside";
import { useSearchFilterInput } from "@/hooks/use-search-filter-input";
import { SEARCH_FILTER_KIND_LABELS } from "@/lib/timeline/filter-options";
import type { SearchFilterKind } from "@/lib/timeline/filter-options";

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
  onFulltextChange: (query: string) => void;
  fulltextQuery: string;
  resetNonce?: number;
};

export function TimelineSearchFilter({
  options,
  selectedIds,
  onToggle,
  onClear,
  onFulltextChange,
  fulltextQuery,
  resetNonce = 0,
}: TimelineSearchFilterProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();
  const [isOpen, setIsOpen] = useState(false);

  const { query, setQuery, clearQuery, results } = useSearchFilterInput({
    options,
    fulltextQuery,
    resetNonce,
    onFulltextChange,
  });

  const closeSuggestions = useCallback(() => setIsOpen(false), []);
  useClickOutside(rootRef, closeSuggestions);

  const toggleOption = (id: string) => {
    onToggle(id);
    inputRef.current?.focus();
  };

  const showSuggestions = isOpen && query.trim().length > 0 && results.length > 0;
  const hasSelection = selectedIds.size > 0 || Boolean(fulltextQuery);

  return (
    <div
      ref={rootRef}
      className={`timeline-search-filter ${isOpen ? "is-open" : ""} ${hasSelection ? "has-selection" : ""}`}
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
              clearQuery();
              onFulltextChange("");
              inputRef.current?.blur();
            }

            if (event.key === "Enter") {
              if (results[0]) {
                event.preventDefault();
                toggleOption(results[0].id);
                return;
              }

              if (query.trim()) {
                event.preventDefault();
                setIsOpen(false);
              }
            }
          }}
        />

        {hasSelection && (
          <button
            type="button"
            className="timeline-search-filter-clear"
            aria-label="Clear search filters"
            onClick={() => {
              onClear();
              onFulltextChange("");
              clearQuery();
            }}
          >
            ×
          </button>
        )}
      </div>

      {showSuggestions && (
        <ul id={listboxId} className="timeline-search-filter-list" role="listbox" aria-label="Search suggestions">
          {results.map((option) => {
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
          })}
        </ul>
      )}
    </div>
  );
}
