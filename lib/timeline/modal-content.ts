import type { Source, TimelineEvent } from "./schema";

function normalizeParagraph(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

function isWikipediaUrl(url: string): boolean {
  try {
    return new URL(url).hostname.replace(/^www\./, "") === "en.wikipedia.org";
  } catch {
    return url.includes("wikipedia.org");
  }
}

function dedupeSourcesByUrl(sources: Source[]): Source[] {
  const seen = new Set<string>();

  return sources.filter((source) => {
    if (seen.has(source.url)) {
      return false;
    }

    seen.add(source.url);
    return true;
  });
}

/** Reader-facing links for the modal — overview first, then official/Wikipedia fallbacks. */
export function referenceSourcesForModal(sources: Source[]): Source[] {
  const overview = sources.filter((source) => source.role === "overview");
  const supplemental = sources.filter(
    (source) => source.role !== "date" && source.role !== "overview",
  );

  if (overview.length > 0) {
    return dedupeSourcesByUrl([...overview, ...supplemental]);
  }

  const dateSources = sources.filter((source) => source.role === "date");
  const official = dateSources.filter((source) => !isWikipediaUrl(source.url));

  if (official.length > 0) {
    return dedupeSourcesByUrl([official[0]!]);
  }

  const wikipedia = dateSources.filter((source) => isWikipediaUrl(source.url));
  if (wikipedia.length > 0) {
    return dedupeSourcesByUrl([wikipedia[0]!]);
  }

  return dedupeSourcesByUrl(supplemental);
}

function dedupeParagraphs(paragraphs: string[]): string[] {
  const seen: string[] = [];

  for (const paragraph of paragraphs) {
    const normalized = normalizeParagraph(paragraph);
    if (!normalized) {
      continue;
    }

    const duplicate = seen.some(
      (existing) =>
        existing === normalized ||
        existing.includes(normalized) ||
        normalized.includes(existing),
    );

    if (!duplicate) {
      seen.push(normalized);
    }
  }

  return seen;
}

/** Combine existing event copy for the simplified modal — no JSON changes required. */
export function buildModalSections(event: TimelineEvent): {
  whatItIs: string[];
  whatItSolved: string;
} {
  const whatItIs = dedupeParagraphs([
    event.quoteText ? `“${normalizeParagraph(event.quoteText)}”` : "",
    event.about,
    event.narrative.whyChosen,
    event.narrative.whyImportant,
  ]);

  return {
    whatItIs,
    whatItSolved: normalizeParagraph(event.narrative.problemSolved),
  };
}
