import type { PlottedEvent } from "@/lib/timeline/plot-data";

export function makePlottedEvent(overrides: Partial<PlottedEvent> = {}): PlottedEvent {
  const title = overrides.title ?? "Test Event";

  return {
    id: "test-event",
    slug: "test-event",
    title,
    bubbleTitle: overrides.bubbleTitle ?? title,
    category: "software",
    summary: "Summary",
    importance: 3,
    timestamp: Date.parse("2000-01-15T12:00:00Z"),
    dateLabel: "January 15, 2000",
    imageUrl: null,
    ...overrides,
  };
}
