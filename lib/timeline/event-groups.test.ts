import { describe, expect, it } from "vitest";

import { makeTimelineEvent } from "@/test/fixtures/timeline-event";
import { groupEventsByDate } from "./event-groups";

describe("groupEventsByDate", () => {
  it("groups day, month, year, and decade events separately", () => {
    const groups = groupEventsByDate([
      makeTimelineEvent({ id: "day-a", slug: "day-a", date: "2000-01-15", datePrecision: "day" }),
      makeTimelineEvent({ id: "day-b", slug: "day-b", date: "2000-01-20", datePrecision: "day" }),
      makeTimelineEvent({
        id: "month",
        slug: "month",
        date: "2000-02",
        datePrecision: "month",
        title: "Month event",
      }),
      makeTimelineEvent({
        id: "year",
        slug: "year",
        date: "1999",
        datePrecision: "year",
        title: "Year event",
      }),
      makeTimelineEvent({
        id: "decade",
        slug: "decade",
        date: "1990",
        datePrecision: "decade",
        title: "Decade event",
      }),
    ]);

    const byKey = Object.fromEntries(groups.map((group) => [group.key, group.events.length]));

    expect(byKey["month-2000-01"]).toBe(2);
    expect(byKey["month-2000-02"]).toBe(1);
    expect(byKey["year-1999"]).toBe(1);
    expect(byKey["decade-1990"]).toBe(1);
    expect(groups.find((group) => group.key === "month-2000-01")?.label).toBe("January 2000");
    expect(groups.find((group) => group.key === "decade-1990")?.label).toBe("1990s");
  });
});
