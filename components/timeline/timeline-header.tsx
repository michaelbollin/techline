import type { MouseEventHandler } from "react";

import { SiteBrand } from "@/components/layout/site-brand";
import { cn } from "@/lib/cn";

import { TimelineFilterTrigger } from "./timeline-filters";

type TimelineHeaderProps = {
  isOpen: boolean;
  activeCount: number;
  onToggle: () => void;
  onLogoClick?: MouseEventHandler<HTMLAnchorElement>;
};

export function TimelineHeader({ isOpen, activeCount, onToggle, onLogoClick }: TimelineHeaderProps) {
  return (
    <header
      className={cn(
        "flex h-14 shrink-0 items-center justify-between border-b border-black px-6 sm:px-8 lg:border-b-0",
        isOpen && "relative z-50 bg-white",
      )}
    >
      <SiteBrand className="min-w-0 shrink" onClick={onLogoClick} />
      <TimelineFilterTrigger isOpen={isOpen} activeCount={activeCount} onToggle={onToggle} />
    </header>
  );
}
