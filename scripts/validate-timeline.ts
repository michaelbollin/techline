import { loadTimeline } from "../lib/timeline/load";

const { events, buckets } = await loadTimeline();

console.log(`Validated ${events.length} events across ${buckets.length} monthly/yearly buckets.`);

for (const event of events) {
  const relatedMissing = event.relatedIds.filter(
    (relatedId) => !events.some((candidate) => candidate.id === relatedId),
  );

  if (relatedMissing.length > 0) {
    throw new Error(
      `Event "${event.id}" references missing relatedIds: ${relatedMissing.join(", ")}`,
    );
  }
}

console.log("All relatedIds resolve. Timeline data is valid.");
