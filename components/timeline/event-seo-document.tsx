import { EventPageContent } from "@/components/timeline/event-page-content";
import { JsonLd } from "@/components/seo/json-ld";
import { buildArticleJsonLd } from "@/lib/structured-data";
import type { TimelineEvent } from "@/lib/timeline/schema";

type EventSeoDocumentProps = {
  event: TimelineEvent;
  related: TimelineEvent[];
  filterPathKey?: string;
};

/**
 * Full event article in the server HTML for crawlers and link previews.
 * The timeline modal remains the interactive UI — this block is not shown to sighted users.
 */
export function EventSeoDocument({ event, related, filterPathKey }: EventSeoDocumentProps) {
  return (
    <>
      <JsonLd data={buildArticleJsonLd(event)} />
      <article className="sr-only">
      <EventPageContent
        event={event}
        related={related}
        filterPathKey={filterPathKey}
        showBackLink={false}
        variant="page"
      />
      </article>
    </>
  );
}
