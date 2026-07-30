import type { CSSProperties } from "react";

import { SiteBrand } from "@/components/layout/site-brand";
import { SiteFooter } from "@/components/layout/site-footer";
import { SITE_FOOTER_RESERVED_HEIGHT } from "@/lib/site";

/** Chart-area placeholder while d3 timeline chunks load (footer stays mounted in shell). */
export function TimelineChartSkeleton() {
  return (
    <section aria-label="Interactive timeline" className="relative flex h-full w-full flex-col bg-white">
      <header className="relative z-20 flex min-h-10 shrink-0 items-center py-5 pr-[3.75rem] pb-4 pl-6 sm:pl-8 sm:pr-[4.25rem]">
        <SiteBrand className="shrink-0" />
      </header>
      <div className="relative min-h-0 flex-1 px-6 sm:px-8" aria-busy="true" aria-label="Loading timeline">
        <div className="absolute inset-x-6 top-[42%] h-px bg-black/20 sm:inset-x-8" />
      </div>
    </section>
  );
}

/** Full-page shell for layout suspense — brand paints before timeline client JS hydrates. */
export function TimelineLoadingShell() {
  return (
    <div
      className="flex h-[100dvh] flex-col overflow-hidden bg-white"
      style={{ "--site-footer-reserved-height": `${SITE_FOOTER_RESERVED_HEIGHT}px` } as CSSProperties}
    >
      <div className="min-h-0 flex-1 md:pb-[var(--site-footer-reserved-height)]">
        <TimelineChartSkeleton />
      </div>
      <SiteFooter fixed />
    </div>
  );
}
