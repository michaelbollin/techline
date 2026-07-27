import { NarrativeBlock } from "@/components/timeline/narrative-block";
import { MediaList } from "@/components/timeline/media-list";
import type { Source, TimelineEvent } from "@/lib/timeline/schema";

type EventDetailProps = {
  event: TimelineEvent;
};

function sourcesByRole(sources: Source[]) {
  const dated = sources.filter((source) => source.role === "date");
  const overview = sources.filter((source) => source.role === "overview");
  const other = sources.filter((source) => !source.role);

  return { dated, overview, other };
}

function SourceLinks({ sources }: { sources: Source[] }) {
  return (
    <ul className="space-y-3">
      {sources.map((source) => (
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
  );
}

export function EventDetail({ event }: EventDetailProps) {
  const { dated, overview, other } = sourcesByRole(event.sources);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
      <div className="space-y-8">
        <section className="rounded-2xl border border-accent/20 bg-accent-muted/30 p-5">
          <h2 className="mb-2 text-sm font-medium tracking-wide text-accent uppercase">
            What it was for
          </h2>
          <p className="leading-relaxed text-foreground/90">{event.about}</p>
        </section>

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
        <aside className="h-fit space-y-5 rounded-2xl border border-border bg-surface p-5">
          {dated.length > 0 && (
            <section>
              <h2 className="mb-3 text-sm font-medium tracking-wide text-muted uppercase">
                Date source
              </h2>
              <SourceLinks sources={dated} />
            </section>
          )}

          {overview.length > 0 && (
            <section>
              <h2 className="mb-3 text-sm font-medium tracking-wide text-muted uppercase">
                Overview
              </h2>
              <SourceLinks sources={overview} />
            </section>
          )}

          {other.length > 0 && (
            <section>
              <h2 className="mb-3 text-sm font-medium tracking-wide text-muted uppercase">
                Sources
              </h2>
              <SourceLinks sources={other} />
            </section>
          )}
        </aside>
      )}
    </div>
  );
}
