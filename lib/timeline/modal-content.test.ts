import { describe, expect, it } from "vitest";

import { makeTimelineEvent } from "@/test/fixtures/timeline-event";
import { buildModalSections, referenceSourcesForModal } from "./modal-content";

describe("referenceSourcesForModal", () => {
  it("prefers overview sources first", () => {
    const sources = referenceSourcesForModal([
      { title: "Date source", url: "https://example.com/date", role: "date" },
      { title: "Overview", url: "https://example.com/overview", role: "overview" },
      { title: "Extra", url: "https://example.com/extra" },
    ]);

    expect(sources.map((source) => source.title)).toEqual(["Overview", "Extra"]);
  });

  it("falls back to first non-wikipedia date source", () => {
    const sources = referenceSourcesForModal([
      {
        title: "Official",
        url: "https://example.com/official",
        role: "date",
      },
      {
        title: "Wiki",
        url: "https://en.wikipedia.org/wiki/Test",
        role: "date",
      },
    ]);

    expect(sources).toHaveLength(1);
    expect(sources[0]?.title).toBe("Official");
  });

  it("dedupes by url", () => {
    const sources = referenceSourcesForModal([
      { title: "One", url: "https://example.com/same", role: "overview" },
      { title: "Two", url: "https://example.com/same" },
    ]);

    expect(sources).toHaveLength(1);
  });
});

describe("buildModalSections", () => {
  it("combines quote, about, and narrative copy", () => {
    const event = makeTimelineEvent({
      quoteText: "Hello, world.",
      about: "About text.",
      narrative: {
        whyChosen: "About text.",
        whyImportant: "Important detail.",
        problemSolved: "  Problem   solved.  ",
      },
    });

    const sections = buildModalSections(event);
    expect(sections.whatItIs).toEqual(['“Hello, world.”', "About text.", "Important detail."]);
    expect(sections.whatItSolved).toBe("Problem solved.");
  });
});
