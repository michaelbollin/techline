import type { Metadata } from "next";
import Link from "next/link";

import { EventImageReviewList } from "@/components/review/event-image-review-list";
import { loadTimeline } from "@/lib/timeline/load";
import { readWrongEventImageIds, WRONG_EVENT_IMAGES_PATH } from "@/lib/timeline/wrong-images";

export const metadata: Metadata = {
  title: "Review images",
  robots: { index: false, follow: false },
};

export default async function ReviewImagesPage() {
  const { events } = await loadTimeline(undefined, { includeDeferred: true });
  const wrongImageIds = [...(await readWrongEventImageIds())];

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-10">
      <header className="mb-10 space-y-3 border-b border-black/10 pb-6">
        <Link href="/" className="text-sm font-medium text-black/50 hover:text-black">
          ← Timeline
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight">Event image review</h1>
        <p className="text-sm leading-relaxed text-black/60">
          Scroll through every event with its cover image and summary. Click{" "}
          <span className="font-medium text-black">Wrong image</span> to append the event id to{" "}
          <code className="rounded bg-black/5 px-1.5 py-0.5 font-mono text-xs">
            {WRONG_EVENT_IMAGES_PATH.replace(`${process.cwd()}/`, "")}
          </code>
          .
        </p>
        {wrongImageIds.length > 0 ? (
          <p className="text-sm text-black/60">
            {wrongImageIds.length} flagged so far.
          </p>
        ) : null}
      </header>

      <EventImageReviewList events={events} wrongImageIds={wrongImageIds} />
    </main>
  );
}
