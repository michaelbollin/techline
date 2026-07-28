import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

import { FilterHeading } from "./filter-label";

type FilterSectionProps = HTMLAttributes<HTMLElement> & {
  label: string;
  children: ReactNode;
  headingClassName?: string;
};

export function FilterSection({
  label,
  className,
  headingClassName,
  children,
  ...props
}: FilterSectionProps) {
  return (
    <section className={cn("flex flex-col gap-2", className)} {...props}>
      <FilterHeading className={headingClassName}>{label}</FilterHeading>
      {children}
    </section>
  );
}
