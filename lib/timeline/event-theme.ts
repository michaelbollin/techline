import { TIMELINE_FILTER_GROUPS } from "./filter-definitions";
import type { TimelineCategory, TimelineEvent } from "./schema";

const TOPIC_FILTERS = TIMELINE_FILTER_GROUPS.find((group) => group.id === "theme")!.filters;

/** Theme ids from filter sidebar plus category fallbacks for untagged events. */
export type ThemeId =
  | "languages"
  | "web"
  | "browser"
  | "mobile"
  | "ai"
  | "database"
  | "infrastructure"
  | "networking"
  | "hardware"
  | "security"
  | "open-source"
  | "standards"
  | "companies"
  | "culture"
  | "quotes"
  | "software"
  | "invention";

const CATEGORY_THEME: Partial<Record<TimelineCategory, ThemeId>> = {
  quote: "quotes",
  ai: "ai",
  company: "companies",
  culture: "culture",
  invention: "invention",
  hardware: "hardware",
  protocol: "networking",
};

/** Pick the primary theme icon for a timeline event. */
export function resolveEventTheme(event: TimelineEvent): ThemeId {
  const fromCategory = CATEGORY_THEME[event.category];
  if (fromCategory) {
    return fromCategory;
  }

  for (const filter of TOPIC_FILTERS) {
    if (filter.matches(event)) {
      return filter.id as ThemeId;
    }
  }

  return event.category === "software" ? "software" : "culture";
}
