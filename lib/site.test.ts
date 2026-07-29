import { describe, expect, it } from "vitest";

import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_SUBTITLE,
  SITE_TAGLINE,
  SITE_WORDMARK,
} from "./site";

describe("site constants", () => {
  it("exports consistent branding strings", () => {
    expect(SITE_NAME).toBe("History of Dev");
    expect(SITE_WORDMARK).toBe("HISTORY OF DEV");
    expect(SITE_TAGLINE).toContain("timeline");
    expect(SITE_SUBTITLE).toContain("Languages");
    expect(SITE_DESCRIPTION).toBe(`${SITE_TAGLINE}. ${SITE_SUBTITLE}`);
  });
});
