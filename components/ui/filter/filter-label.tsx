import type { HTMLAttributes, LabelHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export const filterLabelClassName =
  "m-0 block text-xs font-medium tracking-wider text-muted uppercase";

type FilterLabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export function FilterLabel({ className, ...props }: FilterLabelProps) {
  return <label className={cn(filterLabelClassName, className)} {...props} />;
}

type FilterHeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: "h2" | "h3";
};

export function FilterHeading({ as: Tag = "h3", className, ...props }: FilterHeadingProps) {
  return <Tag className={cn(filterLabelClassName, className)} {...props} />;
}
