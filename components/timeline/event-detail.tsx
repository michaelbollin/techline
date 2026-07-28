import { EventDetailSection } from "@/components/timeline/event-detail-section";
import { NarrativeBlock } from "@/components/timeline/narrative-block";
import { MediaList } from "@/components/timeline/media-list";
import type { Source, TimelineEvent } from "@/lib/timeline/schema";

type EventDetailProps = {
  event: TimelineEvent;
  variant?: "page" | "modal";
};

function sourcesByRole(sources: Source[]) {
  const overview = sources.filter((source) => source.role === "overview");
  const other = sources.filter((source) => !source.role);

  return { overview, other };
}

function SourceLinks({ sources }: { sources: Source[] }) {
  return (
    <ul className="space-y-2">
      {sources.map((source) => (
        <li key={source.url}>
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-foreground underline decoration-black/15 underline-offset-4 hover:decoration-black/40"
          >
            {source.title}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function EventDetail({ event, variant = "page" }: EventDetailProps) {
  const { overview, other } = sourcesByRole(event.sources);

  if (variant === "modal") {
    return (
      <div className="space-y-8">
        {event.quoteText && (
          <EventDetailSection title="Quote">
            <blockquote className="text-base leading-relaxed font-medium text-foreground italic">
              &ldquo;{event.quoteText}&rdquo;
            </blockquote>
          </EventDetailSection>
        )}

        <EventDetailSection title="What it was for">
          <p className="text-sm leading-relaxed text-foreground">{event.about}</p>
        </EventDetailSection>

        {event.people.length > 0 && (
          <EventDetailSection title="People">
            <ul className="space-y-2">
              {event.people.map((person) => (
                <li key={person.id} className="text-sm text-foreground">
                  <span className="font-medium">{person.name}</span>
                  <span className="text-muted"> — {person.role.replace("-", " ")}</span>
                </li>
              ))}
            </ul>
          </EventDetailSection>
        )}

        {event.companies.length > 0 && (
          <EventDetailSection title="Companies">
            <ul className="space-y-2">
              {event.companies.map((company) => (
                <li key={company.id} className="text-sm text-foreground">
                  {company.name}
                </li>
              ))}
            </ul>
          </EventDetailSection>
        )}

        <NarrativeBlock narrative={event.narrative} variant="modal" />

        {event.media.length > 0 && (
          <EventDetailSection title="Media">
            <MediaList media={event.media} variant="modal" />
          </EventDetailSection>
        )}

        {overview.length > 0 && (
          <EventDetailSection title="Overview">
            <SourceLinks sources={overview} />
          </EventDetailSection>
        )}

        {other.length > 0 && (
          <EventDetailSection title="Sources">
            <SourceLinks sources={other} />
          </EventDetailSection>
        )}
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
      <div className="space-y-8">
        {event.quoteText && (
          <section className="rounded-2xl border border-fuchsia-400/25 bg-fuchsia-400/5 p-6">
            <h2 className="mb-3 text-sm font-medium tracking-wide text-fuchsia-300 uppercase">
              Quote
            </h2>
            <blockquote className="text-lg leading-relaxed font-medium text-foreground italic">
              &ldquo;{event.quoteText}&rdquo;
            </blockquote>
          </section>
        )}

        <section className="rounded-2xl border border-accent/20 bg-accent-muted/30 p-5">
          <h2 className="mb-2 text-sm font-medium tracking-wide text-accent uppercase">
            What it was for
          </h2>
          <p className="leading-relaxed text-foreground/90">{event.about}</p>
        </section>

        {event.people.length > 0 && (
          <section>
            <h2 className="mb-3 text-sm font-medium tracking-wide text-muted uppercase">
              People
            </h2>
            <ul className="space-y-2">
              {event.people.map((person) => (
                <li key={person.id} className="text-sm text-foreground/90">
                  <span className="font-medium text-foreground">{person.name}</span>
                  <span className="text-muted"> — {person.role.replace("-", " ")}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {event.companies.length > 0 && (
          <section>
            <h2 className="mb-3 text-sm font-medium tracking-wide text-muted uppercase">
              Companies
            </h2>
            <ul className="space-y-2">
              {event.companies.map((company) => (
                <li key={company.id} className="text-sm text-foreground/90">
                  <span className="font-medium text-foreground">{company.name}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

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

      {(overview.length > 0 || other.length > 0) && (
        <aside className="h-fit space-y-5 rounded-2xl border border-border bg-surface p-5">
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
