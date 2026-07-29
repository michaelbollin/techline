import { describe, expect, it } from "vitest";

import { categoryLabel, eventPath, formatBucketLabel, formatEventDate } from "./format";

describe("formatEventDate", () => {
  it("formats decade precision", () => {
    expect(formatEventDate("1990", "decade")).toBe("1990s");
  });

  it("returns year as-is", () => {
    expect(formatEventDate("1999", "year")).toBe("1999");
  });

  it("formats month precision", () => {
    expect(formatEventDate("2000-01", "month")).toBe("January 2000");
  });

  it("formats day precision", () => {
    expect(formatEventDate("2000-01-15", "day")).toBe("January 15, 2000");
  });
});

describe("formatBucketLabel", () => {
  it("returns year when month is null", () => {
    expect(formatBucketLabel(1999, null)).toBe("1999");
  });

  it("formats month and year", () => {
    expect(formatBucketLabel(2000, 1)).toBe("January 2000");
  });
});

describe("eventPath", () => {
  it("builds slug path", () => {
    expect(eventPath("react-released")).toBe("/react-released");
  });

  it("appends encoded from query when filter path key is set", () => {
    expect(eventPath("react-released", { filterPathKey: "javascript,web" })).toBe(
      "/react-released?from=javascript%2Cweb",
    );
  });

  it("ignores blank filter path key", () => {
    expect(eventPath("react-released", { filterPathKey: "  " })).toBe("/react-released");
  });
});

describe("categoryLabel", () => {
  it("replaces hyphens with spaces", () => {
    expect(categoryLabel("software")).toBe("software");
  });
});
