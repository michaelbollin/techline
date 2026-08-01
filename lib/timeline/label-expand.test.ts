import { describe, expect, it } from "vitest";

import { TIMELINE_AXIS_Y_RATIO, timelineAxisYRatio } from "./constants";
import { clampExpandedBubbleHeight } from "./label-expand";
import { LABEL_BOX_HEIGHT } from "./label-layout";

describe("timelineAxisYRatio", () => {
  it("uses the default ratio on tall viewports", () => {
    expect(timelineAxisYRatio(1000)).toBe(TIMELINE_AXIS_Y_RATIO);
  });

  it("pushes the axis lower on short viewports", () => {
    expect(timelineAxisYRatio(500)).toBeGreaterThan(TIMELINE_AXIS_Y_RATIO);
    expect(timelineAxisYRatio(400)).toBeGreaterThan(timelineAxisYRatio(700));
  });
});

describe("clampExpandedBubbleHeight", () => {
  it("returns desired height when there is room above", () => {
    expect(clampExpandedBubbleHeight(300, 180)).toBe(180);
  });

  it("caps height so the bubble top stays inside the viewport", () => {
    expect(clampExpandedBubbleHeight(120, 250)).toBe(108);
  });

  it("never shrinks below the collapsed label height", () => {
    expect(clampExpandedBubbleHeight(20, 250)).toBe(LABEL_BOX_HEIGHT);
  });
});
