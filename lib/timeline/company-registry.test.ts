import { describe, expect, it } from "vitest";

import { COMPANIES, TAG_TO_COMPANY_ID } from "./company-registry";

describe("company registry", () => {
  it("maps tags to known companies", () => {
    expect(TAG_TO_COMPANY_ID.microsoft).toBe("microsoft");
    expect(COMPANIES.microsoft?.name).toBe("Microsoft");
  });

  it("uses unique company ids", () => {
    const ids = Object.keys(COMPANIES);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
