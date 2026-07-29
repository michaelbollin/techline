import { describe, expect, it } from "vitest";

import {
  companiesForEvent,
  deriveCompaniesFromTags,
  resolveEventCompanies,
} from "./company-attributions";

describe("deriveCompaniesFromTags", () => {
  it("maps known tags to companies", () => {
    const companies = deriveCompaniesFromTags(["microsoft", "dotnet"]);
    expect(companies.some((company) => company.id === "microsoft")).toBe(true);
  });
});

describe("resolveEventCompanies", () => {
  it("merges manual attributions with tag inference", () => {
    const companies = resolveEventCompanies({
      id: "java-announced",
      tags: ["java"],
    });

    expect(companies.some((company) => company.id === "sun-microsystems")).toBe(true);
    expect(companies.some((company) => company.source === "manual")).toBe(true);
  });

  it("dedupes companies by id", () => {
    const companies = companiesForEvent({
      id: "java-announced",
      tags: ["java"],
    });
    expect(new Set(companies.map((company) => company.id)).size).toBe(companies.length);
  });
});
