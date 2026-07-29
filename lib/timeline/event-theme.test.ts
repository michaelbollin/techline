import { describe, expect, it } from "vitest";

import { makeTimelineEvent } from "@/test/fixtures/timeline-event";
import { resolveEventTheme } from "./event-theme";

describe("resolveEventTheme", () => {
  it("maps categories with fixed themes", () => {
    expect(resolveEventTheme(makeTimelineEvent({ category: "quote" }))).toBe("quotes");
    expect(resolveEventTheme(makeTimelineEvent({ category: "ai" }))).toBe("ai");
    expect(resolveEventTheme(makeTimelineEvent({ category: "company" }))).toBe("companies");
  });

  it("uses tag-based theme filters for software events", () => {
    expect(
      resolveEventTheme(
        makeTimelineEvent({ category: "software", tags: ["javascript", "programming-language"] }),
      ),
    ).toBe("languages");
    expect(
      resolveEventTheme(makeTimelineEvent({ category: "software", tags: ["react", "web-framework"] })),
    ).toBe("web");
  });

  it("falls back to software or culture", () => {
    expect(resolveEventTheme(makeTimelineEvent({ category: "software", tags: [] }))).toBe("software");
    expect(resolveEventTheme(makeTimelineEvent({ category: "invention", tags: [] }))).toBe("invention");
  });
});
