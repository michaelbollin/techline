import { describe, expect, it } from "vitest";

import { measureMobileLabelWidth } from "./label-metrics";

describe("measureMobileLabelWidth", () => {
  it("returns positive widths", () => {
    expect(measureMobileLabelWidth("Kubernetes")).toBeGreaterThan(40);
  });
});
