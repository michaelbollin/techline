import { describe, expect, it } from "vitest";

import { COMPANY_ATTRIBUTIONS } from "@/lib/timeline/company-attributions";
import { loadTimeline } from "@/lib/timeline/load";
import { PEOPLE_ATTRIBUTIONS } from "@/lib/timeline/people-attributions";

describe("timeline data integrity", () => {
  it("loads production timeline content", async () => {
    const { events, buckets } = await loadTimeline(undefined, { includeDeferred: true });

    expect(events.length).toBeGreaterThan(0);
    expect(buckets.length).toBeGreaterThan(0);
  });

  it("resolves all relatedIds", async () => {
    const { events } = await loadTimeline(undefined, { includeDeferred: true });
    const eventIds = new Set(events.map((event) => event.id));

    for (const event of events) {
      const missing = event.relatedIds.filter((relatedId) => !eventIds.has(relatedId));
      expect(missing, `event "${event.id}" has missing relatedIds`).toEqual([]);
    }
  });

  it("references only existing events in people attributions", async () => {
    const { events } = await loadTimeline(undefined, { includeDeferred: true });
    const eventIds = new Set(events.map((event) => event.id));

    for (const eventId of Object.keys(PEOPLE_ATTRIBUTIONS)) {
      expect(eventIds.has(eventId), `PEOPLE_ATTRIBUTIONS missing event ${eventId}`).toBe(true);
    }
  });

  it("references only existing events in company attributions", async () => {
    const { events } = await loadTimeline(undefined, { includeDeferred: true });
    const eventIds = new Set(events.map((event) => event.id));

    for (const eventId of Object.keys(COMPANY_ATTRIBUTIONS)) {
      expect(eventIds.has(eventId), `COMPANY_ATTRIBUTIONS missing event ${eventId}`).toBe(true);
    }
  });

  it("hides thin-cohort events from the default timeline load", async () => {
    const [visible, all] = await Promise.all([
      loadTimeline(undefined, { includeDeferred: false }),
      loadTimeline(undefined, { includeDeferred: true }),
    ]);

    expect(visible.events.length).toBeLessThan(all.events.length);
    expect(visible.events.some((event) => event.id === "sentry-launched")).toBe(false);
    expect(all.events.some((event) => event.id === "sentry-launched")).toBe(true);
  });
});
