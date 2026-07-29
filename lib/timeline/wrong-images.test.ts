import { describe, expect, it } from "vitest";

import { isValidEventId, parseWrongEventImageIds } from "./wrong-images";

describe("wrong-images", () => {
  it("validates event ids", () => {
    expect(isValidEventId("git-created")).toBe(true);
    expect(isValidEventId("Git-created")).toBe(false);
    expect(isValidEventId("")).toBe(false);
  });

  it("parses ids and ignores comments and blanks", () => {
    expect([...parseWrongEventImageIds("# flagged\nlinux-created\n\n")]).toEqual(["linux-created"]);
  });
});
