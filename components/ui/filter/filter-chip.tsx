import type { ReactNode } from "react";

import { Button } from "../button";

type FilterChipProps = {
  kind?: ReactNode;
  children: ReactNode;
  onRemove: () => void;
};

export function FilterChip({ kind, children, onRemove }: FilterChipProps) {
  return (
    <Button variant="chip" onClick={onRemove}>
      {kind ? (
        <span className="text-xs tracking-wide uppercase opacity-72">{kind}</span>
      ) : null}
      <span>{children}</span>
      <span aria-hidden>×</span>
    </Button>
  );
}
