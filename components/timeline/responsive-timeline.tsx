"use client";

import { TIMELINE_DESKTOP_MEDIA_QUERY, useMediaQuery } from "@/hooks/use-media-query";
import type { TimelineEvent } from "@/lib/timeline/schema";

import { MobileTimeline } from "./mobile-timeline";
import { ModernTimeline } from "./modern-timeline";

type ResponsiveTimelineProps = {
  events: TimelineEvent[];
  filterPathKey?: string;
};

export function ResponsiveTimeline({ events, filterPathKey = "" }: ResponsiveTimelineProps) {
  const isDesktop = useMediaQuery(TIMELINE_DESKTOP_MEDIA_QUERY);

  if (isDesktop) {
    return <ModernTimeline events={events} filterPathKey={filterPathKey} />;
  }

  return <MobileTimeline events={events} filterPathKey={filterPathKey} />;
}
