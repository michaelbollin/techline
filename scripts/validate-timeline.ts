import { loadTimeline } from "../lib/timeline/load";
import { PEOPLE_ATTRIBUTIONS } from "../lib/timeline/people-attributions";

const { events, buckets } = await loadTimeline();

console.log(`Validated ${events.length} events across ${buckets.length} monthly/yearly buckets.`);

const eventIds = new Set(events.map((event) => event.id));

for (const event of events) {
  const relatedMissing = event.relatedIds.filter(
    (relatedId) => !eventIds.has(relatedId),
  );

  if (relatedMissing.length > 0) {
    throw new Error(
      `Event "${event.id}" references missing relatedIds: ${relatedMissing.join(", ")}`,
    );
  }
}

for (const attributionEventId of Object.keys(PEOPLE_ATTRIBUTIONS)) {
  if (!eventIds.has(attributionEventId)) {
    throw new Error(
      `PEOPLE_ATTRIBUTIONS references missing event id: ${attributionEventId}`,
    );
  }
}

console.log("All relatedIds resolve. Timeline data is valid.");
