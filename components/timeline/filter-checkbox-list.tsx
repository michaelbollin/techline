import { FilterOption } from "@/components/ui/filter/filter-option";
import { FilterSection } from "@/components/ui/filter/filter-section";

export type FilterCheckboxOption = {
  id: string;
  label: string;
  count?: number;
};

type FilterCheckboxListProps = {
  label: string;
  options: FilterCheckboxOption[];
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
  className?: string;
};

export function FilterCheckboxList({
  label,
  options,
  selectedIds,
  onToggle,
  className,
}: FilterCheckboxListProps) {
  return (
    <FilterSection label={label} className={className}>
      <ul className="m-0 list-none p-0" role="listbox" aria-label={`${label} filters`}>
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
