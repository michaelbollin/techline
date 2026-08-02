import type { MetadataRoute } from "next";

import { KNOWN_FILTER_SLUGS } from "@/lib/timeline/filter-url";
import { getTimeline } from "@/lib/timeline/get-timeline";
import { eventToTimestamp } from "@/lib/timeline/plot-data";

import { absoluteSiteUrl } from "./site-metadata";
import {
  SITE_AUTHOR_EMAIL,
  SITE_AUTHOR_NAME,
  SITE_AUTHOR_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "./site";

/** Paths that should not be indexed or used by agents. */
export const DISALLOWED_DISCOVERY_PATHS = ["/review-images", "/api/"] as const;

export async function buildSiteSitemap(): Promise<MetadataRoute.Sitemap> {
  const { events } = await getTimeline();
  const now = new Date();

  const homeEntry: MetadataRoute.Sitemap[number] = {
    url: absoluteSiteUrl("/"),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1,
  };

  const filterEntries: MetadataRoute.Sitemap = KNOWN_FILTER_SLUGS.map((slug) => ({
    url: absoluteSiteUrl(`/${slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const eventEntries: MetadataRoute.Sitemap = events.map((event) => ({
    url: absoluteSiteUrl(`/${event.slug}`),
    lastModified: new Date(eventToTimestamp(event.date, event.datePrecision)),
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  return [homeEntry, ...filterEntries, ...eventEntries];
}

export function buildSiteRobots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [...DISALLOWED_DISCOVERY_PATHS],
    },
    sitemap: absoluteSiteUrl("/sitemap.xml"),
    host: SITE_URL,
  };
}

export function buildLlmsTxt(): string {
  return `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

${SITE_NAME} is an interactive timeline of programming history from the 1930s through today. Each milestone has a permanent URL with a date, summary, narrative context, people and companies, tags, and cited sources.

Use the sitemap for a complete list of event URLs. Event slugs are kebab-case and stable, for example \`${absoluteSiteUrl("steve-jobs-iphone-introduced")}\`.

## Start here

- [Timeline home](${absoluteSiteUrl("/")}): browsable axis with category filters and full-text search

## Discovery

- [Sitemap](${absoluteSiteUrl("/sitemap.xml")}): indexable event and filter URLs
- [Robots](${absoluteSiteUrl("/robots.txt")}): crawl policy
- [Agent guidelines](${absoluteSiteUrl("/.well-known/agentic-guidance.json")}): how automated agents should use this site
- [agents.txt](${absoluteSiteUrl("/agents.txt")}): agent capability index

## Content model

- Event pages live at \`/{slug}\` and open in the timeline UI with title, date, summary, about text, narrative fields, media, and sources.
- Filter views combine category, language, technology, person, and company filters in the path, for example \`${absoluteSiteUrl("javascript")}\` or \`${absoluteSiteUrl("javascript,web")}\`.

## Optional

- [Author — ${SITE_AUTHOR_NAME}](${SITE_AUTHOR_URL}): site creator
- Contact: ${SITE_AUTHOR_EMAIL}
`;
}

export function buildAgentsTxt(): string {
  return `# agents.txt
# Standard: https://agents-txt.com
# JSON: ${absoluteSiteUrl("/agents.json")}

# ${SITE_NAME} is a read-only reference timeline. No payments, authentication, or write APIs.
# See agents.json and /.well-known/agentic-guidance.json for discovery URLs and usage guidelines.
`;
}

export type AgenticGuidance = {
  version: "1";
  site: {
    name: string;
    url: string;
    description: string;
    contact: string;
    author: {
      name: string;
      url: string;
    };
  };
  capabilities: {
    read: boolean;
    write: boolean;
    authenticate: boolean;
    payment: boolean;
  };
  discovery: {
    sitemap: string;
    llmsTxt: string;
    robotsTxt: string;
    agentsTxt: string;
  };
  disallowedPaths: readonly string[];
  guidelines: string[];
  content: {
    eventUrlPattern: string;
    filterUrlPattern: string;
    fields: string[];
  };
};

export function buildAgenticGuidance(): AgenticGuidance {
  return {
    version: "1",
    site: {
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      contact: SITE_AUTHOR_EMAIL,
      author: {
        name: SITE_AUTHOR_NAME,
        url: SITE_AUTHOR_URL,
      },
    },
    capabilities: {
      read: true,
      write: false,
      authenticate: false,
      payment: false,
    },
    discovery: {
      sitemap: absoluteSiteUrl("/sitemap.xml"),
      llmsTxt: absoluteSiteUrl("/llms.txt"),
      robotsTxt: absoluteSiteUrl("/robots.txt"),
      agentsTxt: absoluteSiteUrl("/agents.txt"),
    },
    disallowedPaths: DISALLOWED_DISCOVERY_PATHS,
    guidelines: [
      "This site is read-only. Do not attempt to POST, PUT, PATCH, or DELETE.",
      `Use canonical event URLs at ${SITE_URL}/{slug} when citing or linking.`,
      'Attribute quoted summaries to "History of Dev" with a link to the event page.',
      "Discover URLs from /sitemap.xml rather than enumerating filter combinations.",
      "Respect /robots.txt. Do not access /review-images or /api/.",
      "Cache responses; avoid aggressive parallel crawling.",
      "Event pages share one timeline shell; metadata and Open Graph images are per slug.",
    ],
    content: {
      eventUrlPattern: `${SITE_URL}/{slug}`,
      filterUrlPattern: `${SITE_URL}/{filter-slug} or ${SITE_URL}/{slug-a},{slug-b}`,
      fields: [
        "title",
        "date",
        "datePrecision",
        "summary",
        "about",
        "narrative",
        "category",
        "tags",
        "people",
        "companies",
        "media",
        "sources",
      ],
    },
  };
}

export function buildAgentsJson(): {
  spec: string;
  site: string;
  guidance: string;
  llmsTxt: string;
  sitemap: string;
  capabilities: AgenticGuidance["capabilities"];
} {
  const guidance = buildAgenticGuidance();

  return {
    spec: "https://agents-txt.com",
    site: SITE_URL,
    guidance: absoluteSiteUrl("/.well-known/agentic-guidance.json"),
    llmsTxt: guidance.discovery.llmsTxt,
    sitemap: guidance.discovery.sitemap,
    capabilities: guidance.capabilities,
  };
}

const TEXT_PLAIN = "text/plain; charset=utf-8";
const JSON_UTF8 = "application/json; charset=utf-8";

export const discoveryCacheControl = "public, max-age=3600, s-maxage=86400";

export function discoveryTextResponse(body: string): Response {
  return new Response(body, {
    headers: {
      "Content-Type": TEXT_PLAIN,
      "Cache-Control": discoveryCacheControl,
    },
  });
}

export function discoveryJsonResponse(body: unknown): Response {
  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      "Content-Type": JSON_UTF8,
      "Cache-Control": discoveryCacheControl,
    },
  });
}
