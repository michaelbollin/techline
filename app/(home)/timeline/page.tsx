import { ModernTimeline } from "@/components/timeline/modern-timeline";
import { getTimeline } from "@/lib/timeline/get-timeline";

export default async function TimelinePage() {
  const { events } = await getTimeline();

  return <ModernTimeline events={events} />;
}
