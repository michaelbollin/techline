import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

type FilterSidebarProps = HTMLAttributes<HTMLElement> & {
  id?: string;
};

export function FilterSidebar({ className, children, ...props }: FilterSidebarProps) {
  return (
    <aside
      className={cn(
        "flex h-full w-[min(22rem,40vw)] shrink-0 flex-col border-l border-black bg-white",
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

type FilterSidebarHeaderProps = HTMLAttributes<HTMLElement>;

export function FilterSidebarHeader({ className, children, ...props }: FilterSidebarHeaderProps) {
  return (
    <header
      className={cn(
        "flex shrink-0 flex-col py-5 pr-[3.75rem] pb-4 pl-5 sm:pr-[4.25rem]",
        className,
      )}
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

type FilterSidebarBodyProps = HTMLAttributes<HTMLDivElement>;

export function FilterSidebarBody({ className, children, ...props }: FilterSidebarBodyProps) {
  return (
    <div className={cn("flex flex-1 flex-col gap-6 overflow-y-auto px-5 pb-5", className)} {...props}>
      {children}
    </div>
  );
}

type FilterSidebarFooterProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
};

export function FilterSidebarFooter({ className, children, ...props }: FilterSidebarFooterProps) {
  return (
    <footer
      className={cn("flex justify-end border-t border-black px-5 pt-3 pb-5", className)}
      {...props}
    >
      {children}
    </footer>
  );
}
