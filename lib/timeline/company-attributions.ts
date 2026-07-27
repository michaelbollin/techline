import { COMPANIES, TAG_TO_COMPANY_ID } from "./company-registry";

export type CompanyRef = { id: string; name: string };

/**
 * Manual event → company links when tags alone are insufficient or ambiguous.
 * Merged with tag inference when running `npm run seed:companies`.
 */
export const COMPANY_ATTRIBUTIONS: Record<string, CompanyRef[]> = {
  "blink-engine-announced": [{ id: "google", name: "Google" }],
  "java-announced": [{ id: "sun-microsystems", name: "Sun Microsystems" }],
  "kotlin-unveiled": [{ id: "jetbrains", name: "JetBrains" }],
  "oracle-2-released": [{ id: "oracle", name: "Oracle" }],
  "worldwideweb-browser": [{ id: "cern", name: "CERN" }],
};

export type CompanySource = "manual" | "tag";

export type ResolvedCompany = CompanyRef & { source: CompanySource };

function companyRef(id: string, source: CompanySource): ResolvedCompany {
  const def = COMPANIES[id];
  if (!def) {
    throw new Error(`Unknown company id "${id}"`);
  }
  return { id, name: def.name, source };
}

function mergeResolved(
  existing: ResolvedCompany[],
  incoming: ResolvedCompany[],
): ResolvedCompany[] {
  const byId = new Map<string, ResolvedCompany>();
  for (const company of existing) {
    byId.set(company.id, company);
  }
  for (const company of incoming) {
    if (!byId.has(company.id)) {
      byId.set(company.id, company);
    }
  }
  return [...byId.values()].sort((a, b) => a.name.localeCompare(b.name));
}

export function deriveCompaniesFromTags(tags: string[]): ResolvedCompany[] {
  const ids = new Set<string>();
  for (const tag of tags) {
    const companyId = TAG_TO_COMPANY_ID[tag];
    if (companyId) {
      ids.add(companyId);
    }
  }
  return [...ids].map((id) => companyRef(id, "tag"));
}

type MappableEvent = { id: string; tags: string[] };

export function resolveEventCompanies(event: MappableEvent): ResolvedCompany[] {
  const manual = (COMPANY_ATTRIBUTIONS[event.id] ?? []).map((company) =>
    companyRef(company.id, "manual"),
  );
  const fromTags = deriveCompaniesFromTags(event.tags);
  return mergeResolved(manual, fromTags);
}

export function companiesForEvent(event: MappableEvent): CompanyRef[] {
  return resolveEventCompanies(event).map(({ id, name }) => ({ id, name }));
}
