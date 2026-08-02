import type { TimelineEvent } from "./schema";

export function isEventSlug(segment: string, events: readonly TimelineEvent[]): boolean {
  if (!segment || segment.includes(",")) {
    return false;
  }

  return events.some((event) => event.slug === segment);
}

export function getEventBySlug(
  events: readonly TimelineEvent[],
  slug: string,
): TimelineEvent | undefined {
  return events.find((event) => event.slug === slug);
}

export function getEventById(
  events: readonly TimelineEvent[],
  id: string,
): TimelineEvent | undefined {
  return events.find((event) => event.id === id);
}

export function getRelatedEvents(
  events: readonly TimelineEvent[],
  event: Pick<TimelineEvent, "relatedIds">,
): TimelineEvent[] {
  return event.relatedIds
    .map((id) => getEventById(events, id))
    .filter((item): item is TimelineEvent => Boolean(item));
}
