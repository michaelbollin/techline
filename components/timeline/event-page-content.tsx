import Link from "next/link";

import { EventDetail } from "@/components/timeline/event-detail";
import { EventModalAsideImage } from "@/components/timeline/event-modal-aside-image";
import { eventPath, formatEventDate } from "@/lib/timeline/format";
import { timelinePathFromFilterSegment } from "@/lib/timeline/filter-url";
import type { TimelineEvent } from "@/lib/timeline/schema";

type EventPageContentProps = {
  event: TimelineEvent;
  related: TimelineEvent[];
  filterPathKey?: string;
  showBackLink?: boolean;
  variant?: "page" | "modal";
};

export function EventPageContent({
  event,
  related,
  filterPathKey,
  showBackLink = true,
  variant = "page",
}: EventPageContentProps) {
  const timelineHref = timelinePathFromFilterSegment(filterPathKey);

  if (variant === "modal") {
    return (
      <>
        <header className="mb-8 space-y-3">
          <p className="font-mono text-sm text-muted">
            {formatEventDate(event.date, event.datePrecision)}
          </p>
          <h1 className="border-b border-black/15 pb-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            {event.title}
          </h1>
          <p className="text-base leading-relaxed text-foreground">{event.summary}</p>
        </header>

        <EventModalAsideImage media={event.media} className="mb-8 sm:hidden" />

        <EventDetail event={event} variant="modal" />
      </>
    );
  }

  return (
    <>
      {showBackLink && (
        <Link
          href={timelineHref}
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted hover:text-foreground"
        >
          ← Back to timeline
        </Link>
      )}

      <header className="mb-10 space-y-4 border-b border-border pb-10">
        <p className="font-mono text-sm text-foreground">
          {formatEventDate(event.date, event.datePrecision)}
        </p>
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">{event.title}</h1>
        <p className="max-w-2xl text-lg leading-relaxed text-muted">{event.summary}</p>
      </header>

      <EventDetail event={event} />

      {related.length > 0 && (
        <section className="mt-16 border-t border-border pt-10">
          <h2 className="mb-4 text-sm font-medium tracking-wide text-muted uppercase">Related</h2>
          <ul className="space-y-3">
            {related.map((item) => (
              <li key={item.id}>
                <Link
                  href={eventPath(item.slug, { filterPathKey })}
                  className="text-foreground underline-offset-4 hover:underline"
                >
                  {item.title}
                </Link>
                <span className="ml-2 text-sm text-muted">
                  {formatEventDate(item.date, item.datePrecision)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
