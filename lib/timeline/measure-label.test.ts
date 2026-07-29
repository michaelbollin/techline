import { describe, expect, it } from "vitest";

import { measureLabelWidth, measureTimelineLabelWidth } from "./measure-label";

describe("measureLabelWidth", () => {
  it("returns wider width for longer titles", () => {
    expect(measureLabelWidth("Go")).toBeLessThan(measureLabelWidth("A much longer event title"));
  });

  it("includes padding and safety margin", () => {
    expect(measureLabelWidth("")).toBeGreaterThan(40);
  });
});

describe("measureTimelineLabelWidth", () => {
  it("includes icon slot for timeline labels", () => {
    expect(measureTimelineLabelWidth("React")).toBeGreaterThan(measureLabelWidth("React"));
  });
});
