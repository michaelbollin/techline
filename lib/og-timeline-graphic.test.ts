import { describe, expect, it } from "vitest";

import { buildOgTimelineSvg } from "./og-timeline-graphic";

describe("buildOgTimelineSvg", () => {
  it("includes axis path, decade bands, and event dots", () => {
    const svg = buildOgTimelineSvg(1040, 140);

    expect(svg).toContain("<svg");
    expect(svg).toContain("og-decade-band");
    expect(svg).toContain(`stroke-width="2.5"`);
    expect(svg).toContain("<circle");
    expect(svg).toContain("90s");
    expect(svg).toContain("0s");
  });
});
