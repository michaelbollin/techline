import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EventPageContent } from "@/components/timeline/event-page-content";
import { getTimeline } from "@/lib/timeline/get-timeline";
import { getEventById } from "@/lib/timeline/load";

type EventPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ from?: string }>;
};

export async function generateStaticParams() {
  const { events } = await getTimeline();
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { events } = await getTimeline();
  const event = events.find((item) => item.slug === slug);

  if (!event) {
    return { title: "Event not found" };
  }

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

export default async function EventPage({ params, searchParams }: EventPageProps) {
  const { slug } = await params;
  const { from } = await searchParams;
  const { events } = await getTimeline();
  const event = events.find((item) => item.slug === slug);

  if (!event) {
    notFound();
  }

  const related = event.relatedIds
    .map((id) => getEventById(events, id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <EventPageContent event={event} related={related} filterPathKey={from} />
    </div>
  );
}
