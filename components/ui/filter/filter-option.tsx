import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

import { Checkbox } from "../checkbox";

type FilterOptionProps = {
  checked: boolean;
  onChange: () => void;
  label: ReactNode;
  kind?: ReactNode;
  count?: number;
  emphasizeLabelWhenSelected?: boolean;
  onMouseDown?: (event: React.MouseEvent<HTMLLabelElement>) => void;
};

export function FilterOption({
  checked,
  onChange,
  label,
  kind,
  count,
  emphasizeLabelWhenSelected = false,
  onMouseDown,
}: FilterOptionProps) {
  return (
    <label
      className={cn(
        "flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left text-sm leading-snug text-black hover:bg-black/[0.04]",
        checked && "bg-black/[0.04]",
      )}
      onMouseDown={onMouseDown}
    >
      <Checkbox checked={checked} onChange={onChange} />
      {kind ? (
        <span className="shrink-0 text-xs font-semibold tracking-wider text-muted uppercase">
          {kind}
        </span>
      ) : null}
      <span className={cn("min-w-0 flex-1", emphasizeLabelWhenSelected && checked && "font-semibold")}>
        {label}
      </span>
      {count !== undefined ? (
        <span className="shrink-0 text-xs text-muted tabular-nums" aria-hidden>
          {count}
        </span>
      ) : null}
    </label>
  );
}
