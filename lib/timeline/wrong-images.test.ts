import { describe, expect, it } from "vitest";

import { isValidEventId } from "./wrong-images";

describe("wrong-images", () => {
  it("validates event ids", () => {
    expect(isValidEventId("git-created")).toBe(true);
    expect(isValidEventId("Git-created")).toBe(false);
    expect(isValidEventId("")).toBe(false);
  });
});
