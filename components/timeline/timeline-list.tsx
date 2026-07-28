import { EventCard } from "@/components/timeline/event-card";
import { groupEventsByDate } from "@/lib/timeline/event-groups";
import type { TimelineEvent } from "@/lib/timeline/schema";

type TimelineListProps = {
  events: TimelineEvent[];
};

export function TimelineList({ events }: TimelineListProps) {
  const groups = groupEventsByDate(events);

  return (
    <div className="space-y-14">
      {groups.map((group) => (
        <section key={group.key} aria-labelledby={`group-${group.key}`}>
          <div className="mb-5 flex items-center gap-4">
            <h2
              id={`group-${group.key}`}
              className="font-mono text-sm tracking-widest text-muted uppercase"
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
