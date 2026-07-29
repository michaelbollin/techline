import type { PlottedEvent } from "@/lib/timeline/plot-data";

export function makePlottedEvent(overrides: Partial<PlottedEvent> = {}): PlottedEvent {
  return {
    id: "test-event",
    slug: "test-event",
    title: "Test Event",
    summary: "Summary",
    importance: 3,
    timestamp: Date.parse("2000-01-15T12:00:00Z"),
    dateLabel: "January 15, 2000",
    themeId: "software",
    ...overrides,
  };
}
