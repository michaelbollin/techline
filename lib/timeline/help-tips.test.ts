import { describe, expect, it } from "vitest";

import {
  DESKTOP_TIMELINE_HELP_TIPS,
  getTimelineHelpTips,
  MOBILE_TIMELINE_HELP_TIPS,
} from "./help-tips";

describe("getTimelineHelpTips", () => {
  it("returns desktop tips on wide layouts", () => {
    expect(getTimelineHelpTips(true)).toBe(DESKTOP_TIMELINE_HELP_TIPS);
    expect(getTimelineHelpTips(true).some((tip) => tip.text.includes("Scroll"))).toBe(true);
  });

  it("returns mobile tips on narrow layouts", () => {
    expect(getTimelineHelpTips(false)).toBe(MOBILE_TIMELINE_HELP_TIPS);
    expect(getTimelineHelpTips(false).some((tip) => tip.text.includes("Pinch"))).toBe(true);
  });
});
