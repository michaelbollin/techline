"use client";

import dynamic from "next/dynamic";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo, type CSSProperties } from "react";

import { EventModal } from "@/components/timeline/event-modal";
import { EventPageContent } from "@/components/timeline/event-page-content";
import { TimelineHoverEffectProvider } from "@/components/timeline/hover-effects/timeline-hover-effect-context";
import { TimelineChartSkeleton } from "@/components/timeline/timeline-loading-shell";
import { SiteFooter } from "@/components/layout/site-footer";
import { getAnimationIdForEvent } from "@/lib/animations/registry";
import { SITE_FOOTER_RESERVED_HEIGHT } from "@/lib/site";
import { timelinePathFromFilterSegment } from "@/lib/timeline/filter-url";
import { getEventById, getEventBySlug } from "@/lib/timeline/routing";
import { parseTimelineRoute } from "@/lib/timeline/timeline-route";
import type { TimelineEvent } from "@/lib/timeline/schema";

const ResponsiveTimeline = dynamic(
  () =>
    import("@/components/timeline/responsive-timeline").then((mod) => ({
      default: mod.ResponsiveTimeline,
    })),
  { loading: () => <TimelineChartSkeleton /> },
);

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

  const modalAnimationId = event ? getAnimationIdForEvent(event.id) : null;

  return (
    <TimelineHoverEffectProvider modalEventId={event?.id ?? null}>
      <div
        className="flex h-[100dvh] flex-col overflow-hidden bg-white"
        style={
          {
            "--site-footer-reserved-height": `${SITE_FOOTER_RESERVED_HEIGHT}px`,
          } as CSSProperties
        }
      >
        <div className="min-h-0 flex-1 md:pb-[var(--site-footer-reserved-height)]">
          <ResponsiveTimeline events={events} filterPathKey={route.filterPathKey} />
        </div>
        <SiteFooter fixed />
      </div>

      {event && (
        <EventModal returnHref={returnHref} animationId={modalAnimationId}>
          <EventPageContent
            event={event}
            related={related}
            filterPathKey={route.filterPathKey}
            showBackLink={false}
            variant="modal"
          />
        </EventModal>
      )}
    </TimelineHoverEffectProvider>
  );
}
