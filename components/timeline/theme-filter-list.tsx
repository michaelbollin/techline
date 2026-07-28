export type ThemeFilterOption = {
  id: string;
  label: string;
  count?: number;
};

type ThemeFilterListProps = {
  options: ThemeFilterOption[];
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
};

export function ThemeFilterList({ options, selectedIds, onToggle }: ThemeFilterListProps) {
  return (
    <section className="timeline-filter-section">
      <h3 className="timeline-filter-section-label">Theme</h3>
      <ul className="theme-filter-list" role="listbox" aria-label="Theme filters">
        {options.map((option) => {
          const checked = selectedIds.has(option.id);

          return (
            <li key={option.id} role="option" aria-selected={checked}>
              <label
                className={`theme-filter-option ${checked ? "is-selected" : ""}`}
              >
                <input
                  type="checkbox"
                  className="timeline-filter-checkbox"
                  checked={checked}
                  onChange={() => onToggle(option.id)}
                />
                <span className="theme-filter-option-label">{option.label}</span>
                {option.count !== undefined && (
                  <span className="theme-filter-option-count" aria-hidden>
                    {option.count}
                  </span>
                )}
              </label>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
