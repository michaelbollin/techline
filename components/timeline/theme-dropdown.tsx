"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

export type ThemeDropdownOption = {
  id: string;
  label: string;
  count?: number;
};

type ThemeDropdownProps = {
  options: ThemeDropdownOption[];
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
  onClear: () => void;
  onOpenChange?: (open: boolean) => void;
};

export function ThemeDropdown({
  options,
  selectedIds,
  onToggle,
  onClear,
  onOpenChange,
}: ThemeDropdownProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const [isOpen, setIsOpen] = useState(false);

  const selectedOptions = useMemo(
    () => options.filter((option) => selectedIds.has(option.id)),
    [options, selectedIds],
  );

  const triggerLabel = useMemo(() => {
    if (selectedOptions.length === 0) {
      return "All themes";
    }

    if (selectedOptions.length === 1) {
      return selectedOptions[0]!.label;
    }

    return `${selectedOptions.length} themes`;
  }, [selectedOptions]);

  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return (
    <div
      ref={rootRef}
      className={`theme-dropdown ${isOpen ? "is-open" : ""} ${selectedIds.size > 0 ? "has-selection" : ""}`}
    >
      <span className="theme-dropdown-label">Theme</span>

      <div className="theme-dropdown-field">
        <button
          type="button"
          className="theme-dropdown-trigger"
          aria-expanded={isOpen}
          aria-controls={menuId}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span>{triggerLabel}</span>
          <span className="theme-dropdown-chevron" aria-hidden>
            ▾
          </span>
        </button>

        {selectedIds.size > 0 && (
          <button
            type="button"
            className="theme-dropdown-clear"
            aria-label="Clear theme filters"
            onClick={onClear}
          >
            ×
          </button>
        )}
      </div>

      {isOpen && (
        <ul id={menuId} className="theme-dropdown-list" role="listbox" aria-label="Theme filters">
          {options.map((option) => {
            const checked = selectedIds.has(option.id);

            return (
              <li key={option.id} role="option" aria-selected={checked}>
                <label
                  className={`theme-dropdown-option ${checked ? "is-selected" : ""}`}
                  onMouseDown={(event) => event.preventDefault()}
                >
                  <input
                    type="checkbox"
                    className="timeline-filter-checkbox"
                    checked={checked}
                    onChange={() => {
                      onToggle(option.id);
                      setIsOpen(true);
                    }}
                  />
                  <span className="theme-dropdown-option-label">{option.label}</span>
                  {option.count !== undefined && (
                    <span className="theme-dropdown-option-count" aria-hidden>
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
