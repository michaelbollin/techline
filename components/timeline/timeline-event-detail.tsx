import { TIMELINE_EDGE_MARGIN } from "@/lib/timeline/constants";
import type { PlottedEvent } from "@/lib/timeline/plot-data";

type TimelineEventDetailProps = {
  event: PlottedEvent;
  top: number;
};

export function TimelineEventDetail({ event, top }: TimelineEventDetailProps) {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 z-10 text-left text-black"
      style={{ top, paddingLeft: TIMELINE_EDGE_MARGIN, paddingRight: TIMELINE_EDGE_MARGIN }}
      aria-live="polite"
    >
      <div key={event.id} className="animate-timeline-detail-reveal max-w-2xl pl-4">
        <p className="m-0 text-xs font-medium tracking-widest uppercase">
          {event.dateLabel}
        </p>
        <p className="mt-1.5 text-xl leading-tight font-semibold tracking-tight">
          {event.title}
        </p>
        <p className="mt-2 max-w-xl text-base leading-normal">
          {event.summary}
        </p>
      </div>
    </div>
  );
}
