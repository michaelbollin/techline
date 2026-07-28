import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type EventDetailSectionProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export function EventDetailSection({ title, children, className }: EventDetailSectionProps) {
  return (
    <section className={cn("space-y-3", className)}>
      <h2 className="border-b border-black/15 pb-2 text-sm font-medium tracking-wide text-black uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}
