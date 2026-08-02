import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

/** Shared horizontal inset — aligns headings, filter labels, and counts with the close control. */
export const filterSidebarInsetClassName = "px-6 pr-16 sm:pr-[4.25rem]";

/** Symmetric inset for full-width mobile overlay (close control lives in the header). */
export const filterSidebarOverlayInsetClassName = "px-6";

/** Docked sidebar width — keep in sync with --filter-sidebar-width on the timeline shell. */
export const FILTER_SIDEBAR_WIDTH_CSS = "min(22rem, 40vw)";

export const filterSidebarWidthClassName = "w-[min(22rem,40vw)]";

export const FILTER_SIDEBAR_TRANSITION_MS = 220;

type FilterSidebarInset = "dock" | "overlay";

function insetClassName(inset: FilterSidebarInset) {
  return inset === "overlay" ? filterSidebarOverlayInsetClassName : filterSidebarInsetClassName;
}

type FilterSidebarProps = HTMLAttributes<HTMLElement> & {
  id?: string;
};

export function FilterSidebar({ className, children, ...props }: FilterSidebarProps) {
  return (
    <aside
      className={cn(
        "flex h-full shrink-0 flex-col border-l border-black bg-white",
        filterSidebarWidthClassName,
        className,
      )}
      role="region"
      aria-label="Filter timeline events"
      {...props}
    >
      {children}
    </aside>
  );
}

type FilterSidebarHeaderProps = HTMLAttributes<HTMLElement> & {
  inset?: FilterSidebarInset;
};

export function FilterSidebarHeader({
  className,
  inset = "dock",
  children,
  ...props
}: FilterSidebarHeaderProps) {
  return (
    <header
      className={cn("flex shrink-0 flex-col pt-5 pb-4", insetClassName(inset), className)}
      {...props}
    >
      {children}
    </header>
  );
}

type FilterSidebarTitleProps = HTMLAttributes<HTMLHeadingElement>;

export function FilterSidebarTitle({ className, children, ...props }: FilterSidebarTitleProps) {
  return (
    <h2
      className={cn(
        "m-0 pt-3 font-mono text-sm leading-none font-semibold tracking-widest text-black uppercase",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

type FilterSidebarBodyProps = HTMLAttributes<HTMLDivElement> & {
  inset?: FilterSidebarInset;
};

export function FilterSidebarBody({
  className,
  inset = "dock",
  children,
  ...props
}: FilterSidebarBodyProps) {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col gap-6 overflow-y-auto pb-5",
        insetClassName(inset),
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

type FilterSidebarFooterProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  inset?: FilterSidebarInset;
};

export function FilterSidebarFooter({
  className,
  inset = "dock",
  children,
  ...props
}: FilterSidebarFooterProps) {
  return (
    <footer
      className={cn(
        "flex justify-end border-t border-black pt-3 pb-5",
        insetClassName(inset),
        className,
      )}
      {...props}
    >
      {children}
    </footer>
  );
}
