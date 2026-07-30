import { describe, expect, it } from "vitest";

import { parseIdListFile } from "./id-list-file";

describe("parseIdListFile", () => {
  it("parses ids and ignores comments and blanks", () => {
    expect([...parseIdListFile("# flagged\nlinux-created\n\n")]).toEqual(["linux-created"]);
  });
});
