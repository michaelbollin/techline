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

  it("defaults to site name and description without explicit OG images", () => {
    const metadata = buildPageMetadata();
    expect(metadata.title).toBe(SITE_NAME);
    expect(metadata.description).toContain("timeline");
    expect(metadata.openGraph && "images" in metadata.openGraph ? metadata.openGraph.images : undefined).toBeUndefined();
  });

  it("strips glossary markup from titles and descriptions", () => {
    const metadata = buildPageMetadata({
      title: "The [iPhone] arrives",
      description: "Steve unveiled the [iPhone] at Macworld.",
      path: "/steve-jobs-iphone-introduced",
    });

    expect(metadata.title).toBe("The iPhone arrives");
    expect(metadata.description).toBe("Steve unveiled the iPhone at Macworld.");
  });

  it("includes the default OG image when omitImage is false", () => {
    const metadata = buildPageMetadata({ omitImage: false });
    const images = metadata.openGraph && "images" in metadata.openGraph ? metadata.openGraph.images : undefined;

    expect(images).toEqual([
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ]);
  });
});
