import { describe, expect, it } from "vitest";

import { COHORT_VISIBILITY_RULES, findThinCohorts } from "./deferred-cohorts";
import { makeTimelineEvent } from "@/test/fixtures/timeline-event";

describe("deferred cohorts", () => {
  it("defers events in thin ORM cohort until a second ORM event exists", () => {
    const events = [
      makeTimelineEvent({ id: "hibernate-released", tags: ["orm", "java"] }),
    ];

    const thin = findThinCohorts(events);
    const orm = thin.find((cohort) => cohort.rule.tag === "orm");

    expect(orm?.events.map((event) => event.id)).toEqual(["hibernate-released"]);
  });

  it("keeps ORM events visible once the cohort minimum is met", () => {
    const events = [
      makeTimelineEvent({ id: "hibernate-released", tags: ["orm", "java"] }),
      makeTimelineEvent({ id: "django-open-sourced", tags: ["orm", "python"] }),
    ];

    expect(findThinCohorts(events).some((cohort) => cohort.rule.tag === "orm")).toBe(false);
  });

  it("defers lone observability and blogging products", () => {
    const events = [
      makeTimelineEvent({ id: "sentry-launched", tags: ["observability", "error-monitoring"] }),
      makeTimelineEvent({ id: "ghost-released", tags: ["blogging", "cms"] }),
      makeTimelineEvent({ id: "metamask-released", tags: ["browser-extension", "wallet"] }),
      makeTimelineEvent({ id: "airtable-launched", tags: ["no-code", "saas"] }),
    ];

    const thin = findThinCohorts(events);
    const deferredIds = new Set(thin.flatMap((cohort) => cohort.events.map((event) => event.id)));

    expect(deferredIds).toEqual(
      new Set(["sentry-launched", "ghost-released", "metamask-released", "airtable-launched"]),
    );
  });

  it("defines a minimum of two for every cohort rule", () => {
    expect(COHORT_VISIBILITY_RULES.every((rule) => rule.minimum >= 2)).toBe(true);
  });
});
