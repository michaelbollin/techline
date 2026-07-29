"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { EventModal } from "@/components/timeline/event-modal";
import { EventPageContent } from "@/components/timeline/event-page-content";
import { ResponsiveTimeline } from "@/components/timeline/responsive-timeline";
import { timelinePathFromFilterSegment } from "@/lib/timeline/filter-url";
import { getEventById, getEventBySlug } from "@/lib/timeline/routing";
import { parseTimelineRoute } from "@/lib/timeline/timeline-route";
import type { TimelineEvent } from "@/lib/timeline/schema";

type TimelineShellProps = {
  events: TimelineEvent[];
};

export function TimelineShell({ events }: TimelineShellProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  const route = useMemo(
    () => parseTimelineRoute(pathname, from, events),
    [events, from, pathname],
  );

  const event = route.eventSlug ? getEventBySlug(events, route.eventSlug) : undefined;
  const returnHref = timelinePathFromFilterSegment(route.filterPathKey);

  const related = useMemo(() => {
    if (!event) {
      return [];
    }

    return event.relatedIds
      .map((id) => getEventById(events, id))
      .filter((item): item is TimelineEvent => Boolean(item));
  }, [event, events]);

  return (
    <>
      <div className="h-[100dvh] overflow-hidden bg-white">
        <ResponsiveTimeline events={events} filterPathKey={route.filterPathKey} />
      </div>

      {event && (
        <EventModal returnHref={returnHref}>
          <EventPageContent
            event={event}
            related={related}
            filterPathKey={route.filterPathKey}
            showBackLink={false}
            variant="modal"
          />
        </EventModal>
      )}
    </>
  );
}
