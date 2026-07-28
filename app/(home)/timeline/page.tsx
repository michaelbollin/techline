import { ResponsiveTimeline } from "@/components/timeline/responsive-timeline";
import { getTimeline } from "@/lib/timeline/get-timeline";

export default async function TimelinePage() {
  const { events } = await getTimeline();

  return <ResponsiveTimeline events={events} />;
}
