import { describe, expect, it } from "vitest";

import { isValidEventId, parseWrongEventImageIds } from "./wrong-images";

describe("wrong-images", () => {
  it("validates event ids", () => {
    expect(isValidEventId("git-created")).toBe(true);
    expect(isValidEventId("Git-created")).toBe(false);
    expect(isValidEventId("")).toBe(false);
  });

  it("parseWrongEventImageIds uses shared id-list format", () => {
    expect([...parseWrongEventImageIds("rust-released\n")]).toEqual(["rust-released"]);
  });
});
