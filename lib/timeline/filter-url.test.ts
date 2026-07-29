import { describe, expect, it } from "vitest";

import { makeTimelineEvent } from "@/test/fixtures/timeline-event";
import {
  filterIdToSlug,
  filterIdsToPath,
  filterLabels,
  parseFilterSegment,
  slugToFilterId,
  timelinePathFromFilterSegment,
} from "./filter-url";

describe("filterIdToSlug", () => {
  it("strips lang- and tech- prefixes", () => {
    expect(filterIdToSlug("lang-javascript")).toBe("javascript");
    expect(filterIdToSlug("tech-docker")).toBe("docker");
  });

  it("keeps person and company ids intact", () => {
    expect(filterIdToSlug("person-linus-torvalds")).toBe("person-linus-torvalds");
    expect(filterIdToSlug("company-microsoft")).toBe("company-microsoft");
  });

  it("passes through theme ids", () => {
    expect(filterIdToSlug("web")).toBe("web");
  });
});

describe("slugToFilterId", () => {
  it("resolves static filter slugs", () => {
    expect(slugToFilterId("javascript")).toBe("lang-javascript");
    expect(slugToFilterId("web")).toBe("web");
  });

  it("accepts dynamic person and company slugs", () => {
    expect(slugToFilterId("person-linus-torvalds")).toBe("person-linus-torvalds");
    expect(slugToFilterId("company-microsoft")).toBe("company-microsoft");
  });

  it("returns null for unknown slugs", () => {
    expect(slugToFilterId("not-a-filter")).toBeNull();
    expect(slugToFilterId("")).toBeNull();
  });
});

describe("parseFilterSegment", () => {
  it("parses comma-separated filter slugs", () => {
    const ids = parseFilterSegment("javascript,web");
    expect([...ids].sort()).toEqual(["lang-javascript", "web"]);
  });

  it("ignores unknown slugs", () => {
    const ids = parseFilterSegment("javascript,unknown-slug");
    expect([...ids]).toEqual(["lang-javascript"]);
  });

  it("decodes URI-encoded segments", () => {
    const ids = parseFilterSegment(encodeURIComponent("javascript,web"));
    expect([...ids].sort()).toEqual(["lang-javascript", "web"]);
  });
});

describe("filterIdsToPath", () => {
  it("returns root path when empty", () => {
    expect(filterIdsToPath(new Set())).toBe("/");
  });

  it("builds sorted slug path", () => {
    expect(filterIdsToPath(new Set(["web", "lang-javascript"]))).toBe("/javascript,web");
  });
});

describe("timelinePathFromFilterSegment", () => {
  it("returns root for blank segment", () => {
    expect(timelinePathFromFilterSegment(undefined)).toBe("/");
    expect(timelinePathFromFilterSegment("  ")).toBe("/");
  });

  it("round-trips through parse and serialize", () => {
    const ids = new Set(["web", "lang-javascript"]);
    const path = filterIdsToPath(ids);
    const segment = path.slice(1);
    expect(timelinePathFromFilterSegment(segment)).toBe(path);
  });
});

describe("filterLabels", () => {
  it("returns labels for static filters", () => {
    expect(filterLabels(new Set(["web", "ai"]))).toEqual(["Web", "AI"]);
  });

  it("uses registry labels for dynamic person filters", () => {
    const events = [
      makeTimelineEvent({
        people: [{ id: "linus-torvalds", name: "Linus Torvalds", role: "creator" }],
      }),
    ];

    expect(filterLabels(new Set(["person-linus-torvalds"]), events)).toEqual(["Linus Torvalds"]);
  });
});
