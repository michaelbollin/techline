import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

import { FilterHeading } from "./filter-label";

type FilterSectionProps = HTMLAttributes<HTMLElement> & {
  label: string;
  children: ReactNode;
};

export function FilterSection({ label, className, children, ...props }: FilterSectionProps) {
  return (
    <section className={cn("flex flex-col gap-2", className)} {...props}>
      <FilterHeading>{label}</FilterHeading>
      {children}
    </section>
  );
}
