import { JsonLd } from "@/components/seo/json-ld";
import { buildWebSiteJsonLd } from "@/lib/structured-data";
import { SITE_DESCRIPTION, SITE_NAME, SITE_SUBTITLE, SITE_TAGLINE } from "@/lib/site";

/**
 * Crawler-visible home page copy. The interactive timeline is the primary UI.
 */
export function HomeSeoDocument() {
  return (
    <>
      <JsonLd data={buildWebSiteJsonLd()} />
      <article className="sr-only">
        <h1>{SITE_NAME}</h1>
        <p>{SITE_TAGLINE}</p>
        <p>{SITE_SUBTITLE}</p>
        <p>{SITE_DESCRIPTION}</p>
        <p>
          Browse milestones from the 1930s through today — languages, hardware, protocols,
          companies, culture, and AI. Each event has a permanent URL with dates, summaries,
          narrative context, people, companies, tags, and cited sources.
        </p>
      </article>
    </>
  );
}
