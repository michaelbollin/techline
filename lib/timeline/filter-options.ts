import { companiesForEvent } from "./company-attributions";
import { TIMELINE_FILTER_GROUPS } from "./filter-definitions";
import { eventInvolvesPerson } from "./people-attributions";
import type { TimelineFilterDef } from "./filter-definitions";
import type { TimelineEvent } from "./schema";

export type SearchFilterKind = "person" | "company" | "language" | "technology";

export const SEARCH_FILTER_KIND_LABELS: Record<SearchFilterKind, string> = {
  person: "Person",
  company: "Company",
  language: "Language",
  technology: "Technology",
};

export function personFilterId(personId: string): string {
  return `person-${personId}`;
}

export function companyFilterId(companyId: string): string {
  return `company-${companyId}`;
}

export function isPersonFilterId(filterId: string): boolean {
  return filterId.startsWith("person-");
}

export function isCompanyFilterId(filterId: string): boolean {
  return filterId.startsWith("company-");
}

export function isLanguageFilterId(filterId: string): boolean {
  return filterId.startsWith("lang-");
}

export function isTechnologyFilterId(filterId: string): boolean {
  return filterId.startsWith("tech-");
}

export function isSearchFilterId(filterId: string): boolean {
  return (
    isPersonFilterId(filterId) ||
    isCompanyFilterId(filterId) ||
    isLanguageFilterId(filterId) ||
    isTechnologyFilterId(filterId)
  );
}

export function buildPersonFilterDefs(events: TimelineEvent[]): TimelineFilterDef[] {
  const people = new Map<string, string>();

  for (const event of events) {
    for (const person of event.people ?? []) {
      people.set(person.id, person.name);
    }
  }

  return [...people.entries()]
    .sort(([, nameA], [, nameB]) => nameA.localeCompare(nameB))
    .map(([personId, name]) => ({
      id: personFilterId(personId),
      label: name,
      matches: (event) => eventInvolvesPerson(event, personId),
    }));
}

export function buildCompanyFilterDefs(events: TimelineEvent[]): TimelineFilterDef[] {
  const companies = new Map<string, string>();

  for (const event of events) {
    for (const company of companiesForEvent(event)) {
      companies.set(company.id, company.name);
    }
  }

  return [...companies.entries()]
    .sort(([, nameA], [, nameB]) => nameA.localeCompare(nameB))
    .map(([companyId, name]) => ({
      id: companyFilterId(companyId),
      label: name,
      matches: (event) => companiesForEvent(event).some((company) => company.id === companyId),
    }));
}

export function buildLanguageFilterDefs(): TimelineFilterDef[] {
  return TIMELINE_FILTER_GROUPS.find((group) => group.id === "languages")!.filters;
}

export function buildTechnologyFilterDefs(): TimelineFilterDef[] {
  return TIMELINE_FILTER_GROUPS.find((group) => group.id === "technologies")!.filters;
}

export function buildSearchFilterDefs(events: TimelineEvent[]): TimelineFilterDef[] {
  return [
    ...buildPersonFilterDefs(events),
    ...buildCompanyFilterDefs(events),
    ...buildLanguageFilterDefs(),
    ...buildTechnologyFilterDefs(),
  ];
}

export function searchFilterKind(filterId: string): SearchFilterKind | null {
  if (isPersonFilterId(filterId)) {
    return "person";
  }

  if (isCompanyFilterId(filterId)) {
    return "company";
  }

  if (isLanguageFilterId(filterId)) {
    return "language";
  }

  if (isTechnologyFilterId(filterId)) {
    return "technology";
  }

  return null;
}

export function filterIdLabel(filterId: string): string | null {
  if (isPersonFilterId(filterId)) {
    return filterId
      .slice("person-".length)
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }

  if (isCompanyFilterId(filterId)) {
    return filterId
      .slice("company-".length)
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }

  if (isLanguageFilterId(filterId)) {
    return filterId.slice("lang-".length).replace(/-/g, " ");
  }

  if (isTechnologyFilterId(filterId)) {
    return filterId.slice("tech-".length).replace(/-/g, " ");
  }

  return null;
}
