import type { TimelineEvent } from "./schema";

/** Product verticals where a lone timeline entry reads like promotion. */
export type CohortVisibilityRule = {
  tag: string;
  minimum: number;
  label: string;
};

export const COHORT_VISIBILITY_RULES: CohortVisibilityRule[] = [
  { tag: "orm", label: "ORM frameworks", minimum: 2 },
  { tag: "observability", label: "Observability tools", minimum: 2 },
  { tag: "error-monitoring", label: "Error monitoring tools", minimum: 2 },
  { tag: "blogging", label: "Blogging platforms", minimum: 2 },
  { tag: "browser-extension", label: "Browser extensions", minimum: 2 },
  { tag: "wallet", label: "Crypto wallets", minimum: 2 },
  { tag: "no-code", label: "No-code platforms", minimum: 2 },
  { tag: "spreadsheet-database", label: "Spreadsheet databases", minimum: 2 },
  { tag: "status-page", label: "Status pages", minimum: 2 },
  { tag: "feature-flags", label: "Feature flag services", minimum: 2 },
];

export type ThinCohort = {
  rule: CohortVisibilityRule;
  events: TimelineEvent[];
};

export function findThinCohorts(events: TimelineEvent[]): ThinCohort[] {
  const thin: ThinCohort[] = [];

  for (const rule of COHORT_VISIBILITY_RULES) {
    const matched = events.filter((event) => event.tags.includes(rule.tag));
    if (matched.length > 0 && matched.length < rule.minimum) {
      thin.push({ rule, events: matched });
    }
  }

  return thin.sort((a, b) => a.rule.label.localeCompare(b.rule.label));
}

export function deferredIdsFromThinCohorts(events: TimelineEvent[]): Set<string> {
  const ids = new Set<string>();

  for (const { events: cohortEvents } of findThinCohorts(events)) {
    for (const event of cohortEvents) {
      ids.add(event.id);
    }
  }

  return ids;
}
