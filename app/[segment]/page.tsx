import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/layout/site-header";
import { ResponsiveTimeline } from "@/components/timeline/responsive-timeline";
import { EventPageContent } from "@/components/timeline/event-page-content";
import { filterLabels, parseFilterSegment } from "@/lib/timeline/filter-url";
import { getTimeline } from "@/lib/timeline/get-timeline";
import { getEventById } from "@/lib/timeline/load";
import { getEventBySlug, isEventSlug } from "@/lib/timeline/routing";
import { SITE_NAME } from "@/lib/site";

type SegmentPageProps = {
  params: Promise<{ segment: string }>;
  searchParams: Promise<{ from?: string }>;
};

export async function generateStaticParams() {
  const { events } = await getTimeline();
  return events.map((event) => ({ segment: event.slug }));
}

export async function generateMetadata({ params }: SegmentPageProps): Promise<Metadata> {
  const { segment } = await params;
  const { events } = await getTimeline();

  if (isEventSlug(segment, events)) {
    const event = getEventBySlug(events, segment)!;

    return {
      title: event.title,
      description: event.summary,
      openGraph: {
        title: event.title,
        description: event.summary,
        type: "article",
      },
    };
  }

  const activeFilterIds = parseFilterSegment(segment);
  const labels = filterLabels(activeFilterIds, events);

  if (labels.length === 0) {
    return { title: SITE_NAME };
  }

  return {
    title: labels.join(", "),
  };
}

export default async function SegmentPage({ params, searchParams }: SegmentPageProps) {
  const { segment } = await params;
  const { from } = await searchParams;
  const { events } = await getTimeline();

  if (isEventSlug(segment, events)) {
    const event = getEventBySlug(events, segment)!;
    const related = event.relatedIds
      .map((id) => getEventById(events, id))
      .filter((item): item is NonNullable<typeof item> => Boolean(item));

    return (
      <>
        <SiteHeader />
        <main className="mx-auto max-w-5xl px-6 py-12">
          <EventPageContent event={event} related={related} filterPathKey={from} />
        </main>
      </>
    );
  }

  const activeFilterIds = parseFilterSegment(segment);

  if (activeFilterIds.size === 0) {
    notFound();
  }

  return (
    <div className="h-[100dvh] overflow-hidden bg-white">
      <ResponsiveTimeline events={events} filterPathKey={segment} />
    </div>
  );
}
