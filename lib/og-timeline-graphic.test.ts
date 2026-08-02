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

  it("adds a highlighted dot when highlightYear is provided", () => {
    const baseSvg = buildOgTimelineSvg(1040, 140);
    const highlightedSvg = buildOgTimelineSvg(1040, 140, { highlightYear: 2007.5 });

    expect(highlightedSvg.match(/<circle/g)?.length).toBeGreaterThan(
      baseSvg.match(/<circle/g)?.length ?? 0,
    );
    expect(highlightedSvg).toContain('stroke="#ffffff"');
  });
});
