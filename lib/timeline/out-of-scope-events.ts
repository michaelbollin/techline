/**
 * Events kept in content JSON but hidden from the public timeline.
 * These did not materially shape programming, developer tools, or how software is built.
 *
 * Not listed here: databases (incl. Access), team chat (Slack, Teams, Zoom), devtools.
 * Restore an event when you add a stronger dev-history angle or a related cohort entry.
 */
export const OUT_OF_SCOPE_EVENT_IDS = [
  // Office suites & business spreadsheets — productivity apps, not dev platforms
  "lotus-1-2-3-released",
  "openoffice-1-0-released",
  "ecma-office-open-xml-standard",

  // Consumer media — not developer infrastructure
  "itunes-released",
  "reed-hastings-netflix-streaming",

  // Generic business SaaS — not devtools or work-platform shifts
  "google-calendar-launched",
  "asana-launched",
  "basecamp-launched",
  "monday-com-launched",
  "trello-launched",
  "squarespace-launched",
  "wix-founded",
  "squarespace-ipo",
] as const;

export type OutOfScopeEventId = (typeof OUT_OF_SCOPE_EVENT_IDS)[number];

export const OUT_OF_SCOPE_EVENT_ID_SET = new Set<string>(OUT_OF_SCOPE_EVENT_IDS);
