/** Canonical site URL for metadata and absolute asset links. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://historyof.dev";

export const SITE_NAME = "History of Dev";

/** Uppercase wordmark shown in the header. */
export const SITE_WORDMARK = "HISTORY OF DEV";

/** Short line beside the logo in the header. */
export const SITE_TAGLINE = "A timeline of programming history";

/** Supporting line — what the timeline actually covers. */
export const SITE_SUBTITLE =
  "Languages, compilers, runtimes, and the tools developers build with";

/** Default meta description (tagline + subtitle). */
export const SITE_DESCRIPTION = `${SITE_TAGLINE}. ${SITE_SUBTITLE}`;

export const SITE_AUTHOR_NAME = "Michael Bollin";
export const SITE_AUTHOR_EMAIL = "michael@bollin.dev";
export const SITE_AUTHOR_URL = "https://bollin.dev";

/** Min height of the fixed footer row (px) — shared with timeline hover-detail layout. */
export const SITE_FOOTER_RESERVED_HEIGHT = 56;

export const SITE_BMC_USERNAME = "michaelbollin";
