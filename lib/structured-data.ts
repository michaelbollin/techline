import { stripGlossaryMarkup } from "@/lib/glossary";
import { absoluteSiteUrl } from "@/lib/site-metadata";
import {
  SITE_AUTHOR_NAME,
  SITE_AUTHOR_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";
import { eventToIsoDate } from "@/lib/timeline/plot-data";
import type { TimelineEvent } from "@/lib/timeline/schema";

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    author: {
      "@type": "Person",
      name: SITE_AUTHOR_NAME,
      url: SITE_AUTHOR_URL,
    },
  };
}

export function buildArticleJsonLd(event: TimelineEvent) {
  const headline = stripGlossaryMarkup(event.title);
  const description = stripGlossaryMarkup(event.summary);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    datePublished: eventToIsoDate(event.date, event.datePrecision),
    url: absoluteSiteUrl(`/${event.slug}`),
    author: {
      "@type": "Person",
      name: SITE_AUTHOR_NAME,
      url: SITE_AUTHOR_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}
