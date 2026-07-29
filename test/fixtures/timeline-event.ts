import type { TimelineEvent } from "@/lib/timeline/schema";

/** Minimal valid timeline event for unit tests — override fields as needed. */
export function makeTimelineEvent(overrides: Partial<TimelineEvent> = {}): TimelineEvent {
  return {
    id: "test-event",
    slug: "test-event",
    date: "2000-01-15",
    datePrecision: "day",
    title: "Test Event",
    summary: "A test summary.",
    about: "About this test event.",
    narrative: {
      whyChosen: "Chosen because testing.",
      whyImportant: "Important for tests.",
      problemSolved: "Solved testing gaps.",
    },
    category: "software",
    tags: ["test"],
    people: [],
    companies: [],
    importance: 3,
    media: [],
    sources: [],
    relatedIds: [],
    ...overrides,
  };
}
