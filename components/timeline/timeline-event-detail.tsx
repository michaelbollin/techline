import { TIMELINE_EDGE_MARGIN } from "@/lib/timeline/constants";
import type { PlottedEvent } from "@/lib/timeline/plot-data";

type TimelineEventDetailProps = {
  event: PlottedEvent;
  top: number;
};

export function TimelineEventDetail({ event, top }: TimelineEventDetailProps) {
  return (
    <div
      className="timeline-event-detail pointer-events-none absolute inset-x-0 z-10"
      style={{ top, paddingLeft: TIMELINE_EDGE_MARGIN, paddingRight: TIMELINE_EDGE_MARGIN }}
      aria-live="polite"
    >
      <div key={event.id} className="timeline-event-detail-reveal max-w-2xl">
        <p className="timeline-event-detail-date">{event.dateLabel}</p>
        <p className="timeline-event-detail-title">{event.title}</p>
        <p className="timeline-event-detail-summary">{event.summary}</p>
      </div>
    </div>
  );
}
