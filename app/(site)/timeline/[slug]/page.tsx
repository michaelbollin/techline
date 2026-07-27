import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { EventDetail } from "@/components/timeline/event-detail";
import { formatEventDate } from "@/lib/timeline/format";
import { getTimeline } from "@/lib/timeline/get-timeline";
import { getEventById } from "@/lib/timeline/load";

type EventPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { events } = await getTimeline();
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { events } = await getTimeline();
  const event = events.find((item) => item.slug === slug);

  if (!event) {
    return { title: "Event not found" };
  }

  return {
    title: event.title,
    description: event.summary,
    openGraph: {
      title: event.title,
      description: event.summary,
      type: "article",
    },
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const { events } = await getTimeline();
  const event = events.find((item) => item.slug === slug);

  if (!event) {
    notFound();
  }

  const related = event.relatedIds
    .map((id) => getEventById(events, id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted hover:text-foreground"
      >
        ← Back to timeline
      </Link>

      <header className="mb-10 space-y-4 border-b border-border pb-10">
        <p className="font-mono text-sm text-foreground">
          {formatEventDate(event.date, event.datePrecision)}
        </p>
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
          {event.title}
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-muted">{event.summary}</p>
      </header>

      <EventDetail event={event} />

      {related.length > 0 && (
        <section className="mt-16 border-t border-border pt-10">
          <h2 className="mb-4 text-sm font-medium tracking-wide text-muted uppercase">
            Related
          </h2>
          <ul className="space-y-3">
            {related.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/timeline/${item.slug}`}
                  className="text-foreground underline-offset-4 hover:underline"
                >
                  {item.title}
                </Link>
                <span className="ml-2 text-sm text-muted">
                  {formatEventDate(item.date, item.datePrecision)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
