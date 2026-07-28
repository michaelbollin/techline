import { notFound } from "next/navigation";

import { EventModal } from "@/components/timeline/event-modal";
import { EventPageContent } from "@/components/timeline/event-page-content";
import { getTimeline } from "@/lib/timeline/get-timeline";
import { getEventById } from "@/lib/timeline/load";
import { getEventBySlug, isEventSlug } from "@/lib/timeline/routing";

type InterceptedEventPageProps = {
  params: Promise<{ segment: string }>;
  searchParams: Promise<{ from?: string }>;
};

export default async function InterceptedEventPage({
  params,
  searchParams,
}: InterceptedEventPageProps) {
  const { segment } = await params;
  const { from } = await searchParams;
  const { events } = await getTimeline();

  if (!isEventSlug(segment, events)) {
    notFound();
  }

  const event = getEventBySlug(events, segment)!;
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
