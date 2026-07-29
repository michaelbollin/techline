import { Suspense } from "react";

import { TimelineShell } from "@/components/timeline/timeline-shell";
import { getTimeline } from "@/lib/timeline/get-timeline";

export default async function TimelineLayout({ children }: { children: React.ReactNode }) {
  const { events } = await getTimeline();

  return (
    <>
      <Suspense
        fallback={<div className="h-[100dvh] overflow-hidden bg-white" aria-busy="true" />}
      >
        <TimelineShell events={events} />
      </Suspense>
      {children}
    </>
  );
}
