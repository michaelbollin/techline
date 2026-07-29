import { describe, expect, it } from "vitest";

import { migrateLegacyImportance, visualImportanceTier } from "./importance";

describe("visualImportanceTier", () => {
  it("maps 0–9 content tiers to 4 visual tiers", () => {
    expect(visualImportanceTier(0)).toBe(0);
    expect(visualImportanceTier(1)).toBe(0);
    expect(visualImportanceTier(2)).toBe(1);
    expect(visualImportanceTier(4)).toBe(1);
    expect(visualImportanceTier(5)).toBe(2);
    expect(visualImportanceTier(7)).toBe(2);
    expect(visualImportanceTier(8)).toBe(3);
    expect(visualImportanceTier(9)).toBe(3);
  });
});

describe("migrateLegacyImportance", () => {
  it("maps legacy 4-tier values", () => {
    expect(migrateLegacyImportance(0)).toBe(0);
    expect(migrateLegacyImportance(1)).toBe(3);
    expect(migrateLegacyImportance(2)).toBe(6);
    expect(migrateLegacyImportance(3)).toBe(9);
  });

  it("passes through current 0–9 values", () => {
    expect(migrateLegacyImportance(5)).toBe(5);
  });

  it("throws for invalid values", () => {
    expect(() => migrateLegacyImportance(12)).toThrow(/Invalid importance/);
  });
});
