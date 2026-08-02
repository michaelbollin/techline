"use client";

import Link from "next/link";

import { BuyMeACoffeeButton } from "@/components/layout/buy-me-a-coffee";
import { useTimelineChromeOptional } from "@/components/timeline/timeline-chrome-context";
import { cn } from "@/lib/cn";
import {
  SITE_AUTHOR_EMAIL,
  SITE_AUTHOR_NAME,
  SITE_AUTHOR_URL,
} from "@/lib/site";

type SiteFooterProps = {
  /** Pin to the viewport bottom — for full-screen timeline views. */
  fixed?: boolean;
  className?: string;
};

export function SiteFooter({ fixed = false, className }: SiteFooterProps) {
  const chrome = useTimelineChromeOptional();
  const filtersOpen = chrome?.filtersOpen ?? false;

  return (
    <footer
      className={cn(
        "text-xs leading-relaxed text-black/45",
        fixed &&
          "z-20 shrink-0 border-t border-black bg-white max-md:relative max-md:z-30 max-md:pb-[env(safe-area-inset-bottom)] md:pointer-events-none md:fixed md:inset-x-0 md:bottom-0 md:border-t-0 md:bg-transparent",
        fixed &&
          "md:transition-transform md:duration-[220ms] md:ease-[cubic-bezier(0.22,1,0.36,1)]",
        fixed && filtersOpen && "md:-translate-x-[var(--filter-sidebar-width)]",
        className,
      )}
    >
      <div
        className={cn(
          "flex px-6 py-3 sm:px-8",
          "max-md:flex-col max-md:items-center max-md:gap-1.5 max-md:py-3",
          "md:flex-row md:flex-wrap md:items-center md:justify-end md:gap-x-1",
          fixed && "pointer-events-auto md:min-h-[56px]",
        )}
      >
        <span className="inline-flex items-center gap-x-1 md:translate-y-[8px]">
          <BuyMeACoffeeButton className="md:relative md:-top-[5px]" />
          <span aria-hidden="true"> · </span>
          <Link
            href={SITE_AUTHOR_URL}
            className="text-black/70 underline-offset-2 hover:text-black hover:underline"
          >
            {SITE_AUTHOR_NAME}
          </Link>
        </span>

        <span className="inline-flex items-center gap-x-1 max-md:text-center md:translate-y-[8px]">
          <span aria-hidden="true" className="max-md:hidden">
            {" · "}
          </span>
          <span>Missing event? Send it to: </span>
          <a
            href={`mailto:${SITE_AUTHOR_EMAIL}`}
            className="text-black/55 underline-offset-2 hover:text-black hover:underline"
          >
            {SITE_AUTHOR_EMAIL}
          </a>
        </span>
      </div>
    </footer>
  );
}
