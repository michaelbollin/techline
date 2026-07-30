import { Suspense } from "react";

import { TimelineLoadingShell } from "@/components/timeline/timeline-loading-shell";
import { TimelineShell } from "@/components/timeline/timeline-shell";
import { getTimeline } from "@/lib/timeline/get-timeline";

export default async function TimelineLayout({ children }: { children: React.ReactNode }) {
  const { events } = await getTimeline();

  return (
    <>
      <Suspense fallback={<TimelineLoadingShell />}>
        <TimelineShell events={events} />
      </Suspense>
      {children}
    </>
  );
}
