import { describe, expect, it } from "vitest";

import { makeTimelineEvent } from "@/test/fixtures/timeline-event";
import {
  buildPersonFilterDefs,
  companyFilterId,
  filterIdLabel,
  isCompanyFilterId,
  isLanguageFilterId,
  isPersonFilterId,
  isSearchFilterId,
  isTechnologyFilterId,
  personFilterId,
  searchFilterKind,
} from "./filter-options";

describe("filter id helpers", () => {
  it("builds person and company ids", () => {
    expect(personFilterId("linus-torvalds")).toBe("person-linus-torvalds");
    expect(companyFilterId("microsoft")).toBe("company-microsoft");
  });

  it("detects filter id kinds", () => {
    expect(isPersonFilterId("person-linus-torvalds")).toBe(true);
    expect(isCompanyFilterId("company-microsoft")).toBe(true);
    expect(isLanguageFilterId("lang-javascript")).toBe(true);
    expect(isTechnologyFilterId("tech-docker")).toBe(true);
    expect(isSearchFilterId("web")).toBe(false);
    expect(isSearchFilterId("person-linus-torvalds")).toBe(true);
  });

  it("returns search filter kind", () => {
    expect(searchFilterKind("person-linus-torvalds")).toBe("person");
    expect(searchFilterKind("company-microsoft")).toBe("company");
    expect(searchFilterKind("lang-javascript")).toBe("language");
    expect(searchFilterKind("tech-docker")).toBe("technology");
    expect(searchFilterKind("web")).toBeNull();
  });

  it("derives labels from dynamic ids", () => {
    expect(filterIdLabel("person-linus-torvalds")).toBe("Linus Torvalds");
    expect(filterIdLabel("company-microsoft")).toBe("Microsoft");
    expect(filterIdLabel("lang-javascript")).toBe("javascript");
    expect(filterIdLabel("tech-docker")).toBe("docker");
  });
});

describe("buildPersonFilterDefs", () => {
  it("creates one filter per unique person", () => {
    const events = [
      makeTimelineEvent({
        people: [{ id: "linus-torvalds", name: "Linus Torvalds", role: "creator" }],
      }),
      makeTimelineEvent({
        id: "other",
        slug: "other",
        people: [{ id: "linus-torvalds", name: "Linus Torvalds", role: "creator" }],
      }),
    ];

    const defs = buildPersonFilterDefs(events);
    expect(defs).toHaveLength(1);
    expect(defs[0]?.label).toBe("Linus Torvalds");
    expect(defs[0]?.matches(events[0]!)).toBe(true);
  });
});
