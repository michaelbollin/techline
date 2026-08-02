"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

import { TIMELINE_DESKTOP_MEDIA_QUERY, useMediaQuery } from "@/hooks/use-media-query";
import type { TimelineEvent } from "@/lib/timeline/schema";

import { TimelineChartSkeleton } from "./timeline-loading-shell";

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
  keyboardNavEnabled?: boolean;
};

export function ResponsiveTimeline({
  events,
  filterPathKey = "",
  keyboardNavEnabled = true,
}: ResponsiveTimelineProps) {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const isDesktop = useMediaQuery(TIMELINE_DESKTOP_MEDIA_QUERY);

  if (!mounted) {
    return <TimelineChartSkeleton />;
  }

  if (isDesktop) {
    return (
      <ModernTimeline
        events={events}
        filterPathKey={filterPathKey}
        keyboardNavEnabled={keyboardNavEnabled}
      />
    );
  }

  return (
    <MobileTimeline
      events={events}
      filterPathKey={filterPathKey}
      keyboardNavEnabled={keyboardNavEnabled}
    />
  );
}
