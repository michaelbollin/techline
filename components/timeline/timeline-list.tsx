import { EventCard } from "@/components/timeline/event-card";
import { formatBucketLabel } from "@/lib/timeline/format";
import type { TimelineEvent } from "@/lib/timeline/schema";

type TimelineListProps = {
  events: TimelineEvent[];
};

type MonthGroup = {
  key: string;
  label: string;
  events: TimelineEvent[];
};

function monthKey(event: TimelineEvent): string {
  if (event.datePrecision === "decade") {
    return `decade-${event.date.replace(/\D/g, "")}`;
  }

  if (event.datePrecision === "year") {
    return `year-${event.date}`;
  }

  if (event.datePrecision === "month") {
    return `month-${event.date}`;
  }

  const date = new Date(event.date);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  return `month-${year}-${String(month).padStart(2, "0")}`;
}

function monthLabel(key: string): string {
  if (key.startsWith("decade-")) {
    return `${key.replace("decade-", "")}s`;
  }

  if (key.startsWith("year-")) {
    return key.replace("year-", "");
  }

  const [, year, month] = key.match(/^month-(\d{4})-(\d{2})$/) ?? [];
  if (year && month) {
    return formatBucketLabel(Number(year), Number(month));
  }

  return key;
}

function groupEventsByMonth(events: TimelineEvent[]): MonthGroup[] {
  const groups = new Map<string, TimelineEvent[]>();

  for (const event of events) {
    const key = monthKey(event);
    const bucket = groups.get(key) ?? [];
    bucket.push(event);
    groups.set(key, bucket);
  }

  return [...groups.entries()].map(([key, groupedEvents]) => ({
    key,
    label: monthLabel(key),
    events: groupedEvents,
  }));
}

export function TimelineList({ events }: TimelineListProps) {
  const groups = groupEventsByMonth(events);

  return (
    <div className="space-y-14">
      {groups.map((group) => (
        <section key={group.key} aria-labelledby={`group-${group.key}`}>
          <div className="mb-5 flex items-center gap-4">
            <h2
              id={`group-${group.key}`}
              className="font-mono text-sm tracking-[0.2em] text-muted uppercase"
            >
              {group.label}
            </h2>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid gap-4">
            {group.events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
