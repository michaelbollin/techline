import Link from "next/link";

import { CategoryBadge } from "@/components/timeline/category-badge";
import { eventPath, formatEventDate } from "@/lib/timeline/format";
import type { TimelineEvent } from "@/lib/timeline/schema";

type EventCardProps = {
  event: TimelineEvent;
};

export function EventCard({ event }: EventCardProps) {
  return (
    <article className="group rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent/40 hover:bg-surface-raised">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <time className="font-mono text-xs text-accent">
          {formatEventDate(event.date, event.datePrecision)}
        </time>
        <CategoryBadge category={event.category} />
        {event.importance === 0 && (
          <span className="rounded-full border border-black bg-black px-2 py-0.5 text-xs font-medium tracking-wide text-white uppercase">
            Pillar
          </span>
        )}
        {event.importance === 1 && (
          <span className="rounded-full bg-accent-muted px-2 py-0.5 text-xs font-medium tracking-wide text-accent uppercase">
            Landmark
          </span>
        )}
      </div>

      <h2 className="text-lg font-medium text-foreground">
        <Link href={eventPath(event.slug)} className="hover:text-accent">
          {event.title}
        </Link>
      </h2>

      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
        {event.category === "quote" && event.quoteText ? `“${event.quoteText}”` : event.summary}
      </p>

      {event.tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {event.tags.slice(0, 4).map((tag) => (
            <li
              key={tag}
              className="rounded-md bg-background px-2 py-1 font-mono text-xs text-muted"
            >
              #{tag}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
