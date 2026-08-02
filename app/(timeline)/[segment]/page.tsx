import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EventSeoDocument } from "@/components/timeline/event-seo-document";
import { filterLabels, parseFilterSegment } from "@/lib/timeline/filter-url";
import { getTimeline } from "@/lib/timeline/get-timeline";
import { getEventBySlug, getRelatedEvents, isEventSlug } from "@/lib/timeline/routing";
import { buildPageMetadata } from "@/lib/site-metadata";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

/** Cache SEO HTML; timeline + modal UX is unchanged. */
export const revalidate = 86_400;

type SegmentPageProps = {
  params: Promise<{ segment: string }>;
  searchParams: Promise<{ from?: string }>;
};

export async function generateMetadata({ params }: SegmentPageProps): Promise<Metadata> {
  const { segment } = await params;
  const { events } = await getTimeline();

  if (isEventSlug(segment, events)) {
    const event = getEventBySlug(events, segment)!;

    return buildPageMetadata({
      title: event.title,
      description: event.summary,
      path: `/${segment}`,
      type: "article",
      omitImage: true,
    });
  }

  const activeFilterIds = parseFilterSegment(segment);
  const labels = filterLabels(activeFilterIds, events);

  if (labels.length === 0) {
    return buildPageMetadata({ title: SITE_NAME });
  }

  const filterTitle = labels.join(", ");

  return buildPageMetadata({
    title: filterTitle,
    description: `Timeline events filtered by ${filterTitle}. ${SITE_DESCRIPTION}`,
    path: `/${segment}`,
  });
}

export default async function SegmentPage({ params, searchParams }: SegmentPageProps) {
  const { segment } = await params;
  const { from } = await searchParams;
  const { events } = await getTimeline();

  if (isEventSlug(segment, events)) {
    const event = getEventBySlug(events, segment)!;
    const related = getRelatedEvents(events, event);

    return (
      <EventSeoDocument
        event={event}
        related={related}
        filterPathKey={from?.trim() ?? ""}
      />
    );
  }

  if (parseFilterSegment(segment).size === 0) {
    notFound();
  }

  return null;
}
