"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type TimelineSearchFilterProps = {
  value: string;
  onChange: (query: string) => void;
  className?: string;
};

export function TimelineSearchFilter({ value, onChange, className }: TimelineSearchFilterProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative flex items-center">
        <input
          type="search"
          className="w-full border-0 border-b border-black bg-transparent py-0.5 pr-5 pb-1.5 text-base leading-snug text-black outline-none placeholder:text-neutral-500"
          value={value}
          placeholder="wordpress, bill gates"
          aria-label="Search events"
          onChange={(event) => onChange(event.target.value)}
        />

        {value && (
          <Button
            variant="ghost"
            className="absolute right-0 bottom-1.5"
            aria-label="Clear search"
            onClick={() => onChange("")}
          >
            ×
          </Button>
        )}
      </div>
    </div>
  );
}
