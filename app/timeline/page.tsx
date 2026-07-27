import type { Metadata } from "next";

import { TimelineList } from "@/components/timeline/timeline-list";
import { getTimeline } from "@/lib/timeline/get-timeline";

export const metadata: Metadata = {
  title: "Timeline",
  description: "Browse the full IT history timeline — from transistors to the AI race.",
};

export default async function TimelinePage() {
  const { events } = await getTimeline();

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <header className="mb-12 space-y-3">
        <p className="font-mono text-xs tracking-[0.25em] text-accent uppercase">
          {events.length} events
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Timeline</h1>
        <p className="max-w-2xl text-muted">
          Landmarks, culture, and dense modern chapters. Click an event for the full story,
          media, and sources.
        </p>
      </header>

      <TimelineList events={events} />
    </div>
  );
}
