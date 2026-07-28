import { notFound } from "next/navigation";

import { EventModal } from "@/components/timeline/event-modal";
import { EventPageContent } from "@/components/timeline/event-page-content";
import { getTimeline } from "@/lib/timeline/get-timeline";
import { getEventById } from "@/lib/timeline/load";

type InterceptedEventPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ from?: string }>;
};

export default async function InterceptedEventPage({
  params,
  searchParams,
}: InterceptedEventPageProps) {
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
    <EventModal>
      <EventPageContent
        event={event}
        related={related}
        filterPathKey={from}
        showBackLink={false}
        variant="modal"
      />
    </EventModal>
  );
}
