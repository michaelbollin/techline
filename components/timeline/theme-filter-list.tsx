import { FilterOption } from "@/components/ui/filter/filter-option";
import { FilterSection } from "@/components/ui/filter/filter-section";

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
    <FilterSection label="Theme">
      <ul className="m-0 list-none p-0" role="listbox" aria-label="Theme filters">
        {options.map((option) => {
          const checked = selectedIds.has(option.id);

          return (
            <li key={option.id} role="option" aria-selected={checked}>
              <FilterOption
                checked={checked}
                onChange={() => onToggle(option.id)}
                label={option.label}
                count={option.count}
                emphasizeLabelWhenSelected
              />
            </li>
          );
        })}
      </ul>
    </FilterSection>
  );
}
