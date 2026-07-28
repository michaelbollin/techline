import { SEARCH_FILTER_KIND_LABELS } from "@/lib/timeline/filter-options";
import type { SearchFilterKind } from "@/lib/timeline/filter-options";

type ActiveFilterChip = {
  id: string;
  label: string;
  kind?: SearchFilterKind;
};

type ActiveFilterChipsProps = {
  fulltextQuery: string;
  chips: ActiveFilterChip[];
  onClearFulltext: () => void;
  onRemoveChip: (id: string) => void;
};

export function ActiveFilterChips({
  fulltextQuery,
  chips,
  onClearFulltext,
  onRemoveChip,
}: ActiveFilterChipsProps) {
  if (!fulltextQuery && chips.length === 0) {
    return null;
  }

  return (
    <ul className="timeline-search-filter-chips" aria-label="Active search filters">
      {fulltextQuery && (
        <li>
          <button type="button" className="timeline-search-filter-chip" onClick={onClearFulltext}>
            <span className="timeline-search-filter-chip-kind">Search</span>
            <span>{fulltextQuery}</span>
            <span aria-hidden>×</span>
          </button>
        </li>
      )}
      {chips.map((chip) => (
        <li key={chip.id}>
          <button
            type="button"
            className="timeline-search-filter-chip"
            onClick={() => onRemoveChip(chip.id)}
          >
            {chip.kind && (
              <span className="timeline-search-filter-chip-kind">
                {SEARCH_FILTER_KIND_LABELS[chip.kind]}
              </span>
            )}
            <span>{chip.label}</span>
            <span aria-hidden>×</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
