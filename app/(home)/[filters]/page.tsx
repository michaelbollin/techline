import type { Metadata } from "next";

import { ModernTimeline } from "@/components/timeline/modern-timeline";
import { filterLabels, parseFilterSegment } from "@/lib/timeline/filter-url";
import { getTimeline } from "@/lib/timeline/get-timeline";

type FilteredTimelinePageProps = {
  params: Promise<{ filters: string }>;
};

export async function generateMetadata({ params }: FilteredTimelinePageProps): Promise<Metadata> {
  const { filters } = await params;
  const activeFilterIds = parseFilterSegment(filters);
  const { events } = await getTimeline();
  const labels = filterLabels(activeFilterIds, events);

  if (labels.length === 0) {
    return { title: "Techline" };
  }

  return {
    title: labels.join(", "),
  };
}

export default async function FilteredTimelinePage({ params }: FilteredTimelinePageProps) {
  const { filters } = await params;
  const activeFilterIds = parseFilterSegment(filters);
  const { events } = await getTimeline();

  return (
    <ModernTimeline events={events} filterPathKey={filters} />
  );
}
