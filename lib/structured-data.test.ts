import { describe, expect, it } from "vitest";

import { makeTimelineEvent } from "@/test/fixtures/timeline-event";

import { SITE_NAME, SITE_URL } from "./site";
import { buildArticleJsonLd, buildWebSiteJsonLd } from "./structured-data";

describe("buildWebSiteJsonLd", () => {
  it("describes the site for search engines", () => {
    const jsonLd = buildWebSiteJsonLd();

    expect(jsonLd).toMatchObject({
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    });
  });
});

describe("buildArticleJsonLd", () => {
  it("maps event fields and strips glossary markup", () => {
    const jsonLd = buildArticleJsonLd(
      makeTimelineEvent({
        slug: "steve-jobs-iphone-introduced",
        title: "Steve Jobs introduces the [iPhone]",
        summary: "Steve unveiled the [iPhone] at Macworld.",
        date: "2007-01-09",
        datePrecision: "day",
      }),
    );

    expect(jsonLd).toMatchObject({
      "@type": "Article",
      headline: "Steve Jobs introduces the iPhone",
      description: "Steve unveiled the iPhone at Macworld.",
      datePublished: "2007-01-09",
      url: `${SITE_URL}/steve-jobs-iphone-introduced`,
    });
  });
});
