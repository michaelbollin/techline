import Image from "next/image";
import Link from "next/link";

import { WrongImageButton } from "@/components/review/wrong-image-button";
import { formatEventDate } from "@/lib/timeline/format";
import { getEventCoverImage } from "@/lib/timeline/event-image";
import { eventToTimestamp } from "@/lib/timeline/plot-data";
import type { TimelineEvent } from "@/lib/timeline/schema";

type EventImageReviewListProps = {
  events: TimelineEvent[];
  wrongImageIds: string[];
};

export function EventImageReviewList({ events, wrongImageIds }: EventImageReviewListProps) {
  const wrongIds = new Set(wrongImageIds);
  const sorted = [...events].sort(
    (a, b) => eventToTimestamp(a.date, a.datePrecision) - eventToTimestamp(b.date, b.datePrecision),
  );

  const withImage = sorted.filter((event) => getEventCoverImage(event.media));
  const withoutImage = sorted.filter((event) => !getEventCoverImage(event.media));

  return (
    <div className="space-y-12">
      <section className="space-y-0">
        <h2 className="mb-4 text-sm font-medium tracking-wide text-black/50 uppercase">
          With image ({withImage.length})
        </h2>
        <ul className="divide-y divide-black/10 border-y border-black/10">
          {withImage.map((event) => (
            <EventImageReviewRow key={event.id} event={event} marked={wrongIds.has(event.id)} />
          ))}
        </ul>
      </section>

      {withoutImage.length > 0 ? (
        <section className="space-y-0">
          <h2 className="mb-4 text-sm font-medium tracking-wide text-black/50 uppercase">
            No image ({withoutImage.length})
          </h2>
          <ul className="divide-y divide-black/10 border-y border-black/10">
            {withoutImage.map((event) => (
              <EventImageReviewRow key={event.id} event={event} marked={wrongIds.has(event.id)} />
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

function EventImageReviewRow({ event, marked }: { event: TimelineEvent; marked: boolean }) {
  const image = getEventCoverImage(event.media);

  return (
    <li className="flex flex-col gap-4 py-6 sm:flex-row sm:items-start">
      <div className="flex w-full shrink-0 items-center justify-center rounded-lg border border-black/10 bg-neutral-50 sm:w-56 sm:self-stretch">
        {image ? (
          <Image
            src={image.url}
            alt={image.title ?? event.title}
            width={224}
            height={224}
            className="h-40 w-full max-w-56 rounded-lg object-contain p-2 sm:h-48"
            unoptimized={image.url.endsWith(".svg")}
          />
        ) : (
          <span className="px-4 py-10 text-sm text-black/40">No image</span>
        )}
      </div>

      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-lg font-semibold text-black">{event.title}</h3>
          <time className="text-sm text-black/50" dateTime={event.date}>
            {formatEventDate(event.date, event.datePrecision)}
          </time>
        </div>

        <p className="font-mono text-xs text-black/40">{event.id}</p>
        <p className="max-w-3xl text-sm leading-relaxed text-black/80">{event.summary}</p>

        {image?.caption ? (
          <p className="text-xs leading-relaxed text-black/50">{image.caption}</p>
        ) : null}

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Link
            href={`/${event.slug}`}
            className="text-sm font-medium text-black underline underline-offset-2"
          >
            View event
          </Link>
          {image ? (
            <WrongImageButton eventId={event.id} initiallyMarked={marked} />
          ) : null}
        </div>
      </div>
    </li>
  );
}
