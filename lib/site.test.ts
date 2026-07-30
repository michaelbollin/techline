import { describe, expect, it } from "vitest";

import {
  SITE_AUTHOR_EMAIL,
  SITE_AUTHOR_NAME,
  SITE_AUTHOR_URL,
  SITE_BMC_USERNAME,
  SITE_DESCRIPTION,
  SITE_FOOTER_RESERVED_HEIGHT,
  SITE_NAME,
  SITE_SUBTITLE,
  SITE_TAGLINE,
  SITE_URL,
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

  it("exports author, URL, and layout constants", () => {
    expect(SITE_AUTHOR_NAME).toBe("Michael Bollin");
    expect(SITE_AUTHOR_EMAIL).toBe("michael@bollin.dev");
    expect(SITE_AUTHOR_URL).toBe("https://bollin.dev");
    expect(SITE_FOOTER_RESERVED_HEIGHT).toBe(56);
    expect(SITE_BMC_USERNAME).toBe("michaelbollin");
    expect(SITE_URL).toBe("https://historyof.dev");
  });
});
