"use client";

import dynamic from "next/dynamic";

import { TIMELINE_DESKTOP_MEDIA_QUERY, useMediaQuery } from "@/hooks/use-media-query";
import type { TimelineEvent } from "@/lib/timeline/schema";

import { TimelineChartSkeleton, TimelineLoadingShell } from "./timeline-loading-shell";

const ModernTimeline = dynamic(
  () => import("./modern-timeline").then((mod) => ({ default: mod.ModernTimeline })),
  { loading: () => <TimelineChartSkeleton /> },
);

const MobileTimeline = dynamic(
  () => import("./mobile-timeline").then((mod) => ({ default: mod.MobileTimeline })),
  { loading: () => <TimelineChartSkeleton /> },
);

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
