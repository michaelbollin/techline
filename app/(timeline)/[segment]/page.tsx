import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { filterLabels, parseFilterSegment } from "@/lib/timeline/filter-url";
import { getTimeline } from "@/lib/timeline/get-timeline";
import { getEventBySlug, isEventSlug } from "@/lib/timeline/routing";
import { SITE_NAME } from "@/lib/site";

type SegmentPageProps = {
  params: Promise<{ segment: string }>;
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

export default async function SegmentPage({ params }: SegmentPageProps) {
  const { segment } = await params;
  const { events } = await getTimeline();

  if (isEventSlug(segment, events)) {
    return null;
  }

  if (parseFilterSegment(segment).size === 0) {
    notFound();
  }

  return null;
}
