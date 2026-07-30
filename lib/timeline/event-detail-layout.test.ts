import { describe, expect, it } from "vitest";

import { SITE_FOOTER_RESERVED_HEIGHT } from "@/lib/site";

import { TIMELINE_DECADE_BAND_HEIGHT } from "./axis-decades";
import {
  TIMELINE_EVENT_DETAIL_MIN_HEIGHT,
  TIMELINE_EVENT_DETAIL_TOP_GAP,
  timelineEventDetailLayout,
} from "./event-detail-layout";

describe("timelineEventDetailLayout", () => {
  const axisY = 200;
  const labelBandBottom = axisY + TIMELINE_DECADE_BAND_HEIGHT;
  const detailTop = labelBandBottom + TIMELINE_EVENT_DETAIL_TOP_GAP;

  it("places detail just below the year/decade label band by default", () => {
    const viewportHeight = detailTop + SITE_FOOTER_RESERVED_HEIGHT + TIMELINE_EVENT_DETAIL_MIN_HEIGHT;
    const layout = timelineEventDetailLayout(axisY, viewportHeight, SITE_FOOTER_RESERVED_HEIGHT);

    expect(layout.top).toBe(detailTop);
    expect(layout.maxHeight).toBe(TIMELINE_EVENT_DETAIL_MIN_HEIGHT);
    expect(layout.show).toBe(true);
  });

  it("pushes hover detail lower when more space exists below the band than above", () => {
    const layout = timelineEventDetailLayout(axisY, 900, SITE_FOOTER_RESERVED_HEIGHT);

    expect(layout.top).toBeGreaterThan(detailTop);
    expect(layout.show).toBe(true);
  });

  it("hides detail when the band below labels is too short", () => {
    const layout = timelineEventDetailLayout(
      axisY,
      detailTop + SITE_FOOTER_RESERVED_HEIGHT + TIMELINE_EVENT_DETAIL_MIN_HEIGHT - 1,
      SITE_FOOTER_RESERVED_HEIGHT,
    );

    expect(layout.show).toBe(false);
    expect(layout.maxHeight).toBe(TIMELINE_EVENT_DETAIL_MIN_HEIGHT - 1);
  });

  it("shows detail when the band meets the minimum height", () => {
    const layout = timelineEventDetailLayout(
      axisY,
      detailTop + SITE_FOOTER_RESERVED_HEIGHT + TIMELINE_EVENT_DETAIL_MIN_HEIGHT,
      SITE_FOOTER_RESERVED_HEIGHT,
    );

    expect(layout.show).toBe(true);
    expect(layout.maxHeight).toBe(TIMELINE_EVENT_DETAIL_MIN_HEIGHT);
  });
});
