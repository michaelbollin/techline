import type { PlottedEvent } from "@/lib/timeline/plot-data";

type TimelineTooltipProps = {
  event: PlottedEvent;
  anchor: { x: number; y: number };
};

export function TimelineTooltip({ event, anchor }: TimelineTooltipProps) {
  return (
    <div
      className="timeline-tooltip pointer-events-none absolute z-20 max-w-sm -translate-x-1/2 -translate-y-full px-4 py-3"
      style={{
        left: anchor.x,
        top: anchor.y,
      }}
    >
      <p className="timeline-tooltip-date">{event.dateLabel}</p>
      <p className="timeline-tooltip-title">{event.title}</p>
      <p className="timeline-tooltip-summary">{event.summary}</p>
    </div>
  );
}
