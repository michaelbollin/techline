import { SiteBrand } from "@/components/layout/site-brand";

import { TimelineFilterTrigger } from "./timeline-filters";

type TimelineHeaderProps = {
  isOpen: boolean;
  activeCount: number;
  onToggle: () => void;
};

export function TimelineHeader({ isOpen, activeCount, onToggle }: TimelineHeaderProps) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-black px-6 lg:border-b-0 sm:px-8">
      <SiteBrand className="min-w-0 shrink" />
      <TimelineFilterTrigger isOpen={isOpen} activeCount={activeCount} onToggle={onToggle} />
    </header>
  );
}
