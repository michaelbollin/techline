import { NarrativeBlock } from "@/components/timeline/narrative-block";
import { MediaList } from "@/components/timeline/media-list";
import type { TimelineEvent } from "@/lib/timeline/schema";

type EventDetailProps = {
  event: TimelineEvent;
};

export function EventDetail({ event }: EventDetailProps) {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
      <div className="space-y-8">
        <NarrativeBlock narrative={event.narrative} />

        {event.media.length > 0 && (
          <section>
            <h2 className="mb-4 text-sm font-medium tracking-wide text-muted uppercase">
              Media
            </h2>
            <MediaList media={event.media} />
          </section>
        )}
      </div>

      {event.sources.length > 0 && (
        <aside className="h-fit rounded-2xl border border-border bg-surface p-5">
          <h2 className="mb-4 text-sm font-medium tracking-wide text-muted uppercase">
            Sources
          </h2>
          <ul className="space-y-3">
            {event.sources.map((source) => (
              <li key={source.url}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground underline decoration-border underline-offset-4 hover:text-accent hover:decoration-accent"
                >
                  {source.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </div>
  );
}
