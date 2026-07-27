import { ModernTimeline } from "@/components/timeline/modern-timeline";
import { getTimeline } from "@/lib/timeline/get-timeline";

export default async function HomePage() {
  const { events } = await getTimeline();

  return <ModernTimeline events={events} />;
}
