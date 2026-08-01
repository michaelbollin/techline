import { describe, expect, it } from "vitest";

import { SITE_NAME, SITE_URL } from "./site";
import { absoluteSiteUrl, buildPageMetadata } from "./site-metadata";

describe("site metadata", () => {
  it("builds absolute URLs from site root", () => {
    expect(absoluteSiteUrl("/javascript")).toBe(`${SITE_URL}/javascript`);
    expect(absoluteSiteUrl("react-released")).toBe(`${SITE_URL}/react-released`);
  });

  it("includes open graph and twitter fields", () => {
    const metadata = buildPageMetadata({
      title: "React released",
      description: "Open-sourced at JSConf.",
      path: "/react-released",
      type: "article",
    });

    const openGraph = metadata.openGraph;
    const twitter = metadata.twitter;

    expect(metadata.title).toBe("React released");
    expect(metadata.description).toBe("Open-sourced at JSConf.");
    expect(openGraph && "title" in openGraph ? openGraph.title : undefined).toBe("React released");
    expect(openGraph && "type" in openGraph ? openGraph.type : undefined).toBe("article");
    expect(twitter && "card" in twitter ? twitter.card : undefined).toBe("summary_large_image");
    expect(metadata.alternates?.canonical).toBe(`${SITE_URL}/react-released`);
  });

  it("supports noindex pages", () => {
    const metadata = buildPageMetadata({ title: "Review", noIndex: true });
    expect(metadata.robots).toEqual({ index: false, follow: false });
  });

  it("defaults to site name and description", () => {
    const metadata = buildPageMetadata();
    expect(metadata.title).toBe(SITE_NAME);
    expect(metadata.description).toContain("timeline");
  });
});
