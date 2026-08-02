import { describe, expect, it } from "vitest";

import { makeTimelineEvent } from "@/test/fixtures/timeline-event";
import { parseTimelineRoute } from "./timeline-route";

describe("parseTimelineRoute", () => {
  const events = [
    makeTimelineEvent({ slug: "bittorrent-released", id: "bittorrent-released" }),
  ];

  it("parses home", () => {
    expect(parseTimelineRoute("/", null, events)).toEqual({
      filterPathKey: "",
      eventSlug: null,
    });
  });

  it("parses filter segment", () => {
    expect(parseTimelineRoute("/javascript,web", null, events)).toEqual({
      filterPathKey: "javascript,web",
      eventSlug: null,
    });
  });

  it("parses event slug with from filter context", () => {
    expect(parseTimelineRoute("/bittorrent-released", "javascript,web", events)).toEqual({
      filterPathKey: "javascript,web",
      eventSlug: "bittorrent-released",
    });
  });

  it("falls back to raw segment when path decoding fails", () => {
    expect(parseTimelineRoute("/%E0%A4%A", null, events)).toEqual({
      filterPathKey: "%E0%A4%A",
      eventSlug: null,
    });
  });
});
