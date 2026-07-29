import { describe, expect, it } from "vitest";

import { makeTimelineEvent } from "@/test/fixtures/timeline-event";
import {
  enrichEventWithPeople,
  eventInvolvesPerson,
  PEOPLE_ATTRIBUTIONS,
} from "./people-attributions";

describe("enrichEventWithPeople", () => {
  it("merges overlay people onto event people", () => {
    const enriched = enrichEventWithPeople(
      makeTimelineEvent({
        id: "git-created",
        people: [{ id: "existing", name: "Existing", role: "maintainer" }],
      }),
    );

    expect(enriched.people.some((person) => person.id === "linus-torvalds")).toBe(true);
    expect(enriched.people.some((person) => person.id === "existing")).toBe(true);
  });

  it("returns original event when no people exist", () => {
    const event = makeTimelineEvent({ id: "no-people", people: [] });
    expect(enrichEventWithPeople(event)).toBe(event);
  });
});

describe("eventInvolvesPerson", () => {
  it("checks event people list", () => {
    const event = makeTimelineEvent({
      people: [{ id: "linus-torvalds", name: "Linus Torvalds", role: "creator" }],
    });
    expect(eventInvolvesPerson(event, "linus-torvalds")).toBe(true);
    expect(eventInvolvesPerson(event, "missing")).toBe(false);
  });
});

describe("PEOPLE_ATTRIBUTIONS", () => {
  it("uses valid person roles", () => {
    for (const people of Object.values(PEOPLE_ATTRIBUTIONS)) {
      for (const person of people) {
        expect(person.id.length).toBeGreaterThan(0);
        expect(person.name.length).toBeGreaterThan(0);
      }
    }
  });
});
