import { ResponsiveTimeline } from "@/components/timeline/responsive-timeline";
import { getTimeline } from "@/lib/timeline/get-timeline";

export default async function HomePage() {
  const { events } = await getTimeline();

  return <ResponsiveTimeline events={events} />;
}
