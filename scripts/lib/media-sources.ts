export const REUSABLE_LICENSE_PREFIXES = [
  "Public domain",
  "CC0",
  "CC BY",
  "CC BY-SA",
  "Attribution",
  "PDM",
  "GPL",
  "Apache",
  "BSD",
  "MIT",
  "LGPL",
  "EPL",
  "EPL-2.0",
  "Copyrighted free use",
];

export const OPENVERSE_LICENSES = ["cc0", "pdm", "by", "by-sa"] as const;

export type CommonsMeta = {
  fileName: string;
  url: string;
  license: string;
  artist: string;
};

export type ResolvedImage = {
  imageUrl: string;
  title: string;
  caption: string;
  source: "wikipedia" | "openverse";
  license: string;
};

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function stripHtml(value?: string) {
  return value?.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim() ?? "";
}

export function isReusableLicense(license: string) {
  const normalized = license.trim();
  return REUSABLE_LICENSE_PREFIXES.some((prefix) =>
    normalized.toLowerCase().startsWith(prefix.toLowerCase()),
  );
}

export function commonsFileNameFromUploadUrl(uploadUrl: string): string | null {
  try {
    const { pathname } = new URL(uploadUrl);
    const decoded = decodeURIComponent(pathname);

    const thumbMatch = decoded.match(/\/commons\/thumb\/(?:[^/]+\/){2}([^/]+)\//);
    if (thumbMatch?.[1]) {
      return thumbMatch[1];
    }

    const directMatch = decoded.match(/\/commons\/(?:[^/]+\/){2}([^/]+)$/);
    return directMatch?.[1] ?? null;
  } catch {
    return null;
  }
}

export function formatCommonsCaption(meta: CommonsMeta) {
  const parts = [meta.artist, meta.license, "via Wikimedia Commons"].filter(Boolean);
  return parts.join(", ");
}

export function formatOpenverseCaption(result: {
  title: string;
  creator: string | null;
  license: string;
  license_version: string;
  source: string;
}) {
  const licenseLabel = `CC ${result.license.toUpperCase()} ${result.license_version}`.replace(
    "CC CC0",
    "CC0",
  );
  const parts = [result.creator, licenseLabel, `via ${result.source}`].filter(Boolean);
  return parts.join(", ");
}

export async function fetchCommonsMeta(
  fileName: string,
  ua: string,
  retries = 4,
): Promise<CommonsMeta | null> {
  for (let attempt = 0; attempt < retries; attempt++) {
    const url = new URL("https://commons.wikimedia.org/w/api.php");
    url.searchParams.set("action", "query");
    url.searchParams.set("format", "json");
    url.searchParams.set("titles", `File:${fileName}`);
    url.searchParams.set("prop", "imageinfo");
    url.searchParams.set("iiprop", "url|extmetadata");
    url.searchParams.set("origin", "*");

    const res = await fetch(url, { headers: { "User-Agent": ua } });
    const text = await res.text();

    if (res.status === 429 || text.toLowerCase().includes("too many requests")) {
      await sleep(4000 * (attempt + 1));
      continue;
    }

    let data: {
      query?: {
        pages?: Record<
          string,
          {
            missing?: string;
            imageinfo?: Array<{
              url: string;
              extmetadata?: Record<string, { value: string }>;
            }>;
          }
        >;
      };
    };

    try {
      data = JSON.parse(text);
    } catch {
      await sleep(4000 * (attempt + 1));
      continue;
    }

    const page = Object.values(data.query?.pages ?? {})[0];
    const info = page?.imageinfo?.[0];
    if (!page || page.missing !== undefined || !info?.url) {
      return null;
    }

    const metadata = info.extmetadata ?? {};
    return {
      fileName,
      url: info.url,
      license: stripHtml(metadata.LicenseShortName?.value) || "?",
      artist: stripHtml(metadata.Artist?.value),
    };
  }

  return null;
}

type WikipediaSummary = {
  title?: string;
  thumbnail?: { source?: string };
  originalimage?: { source?: string };
};

export async function fetchWikipediaLeadImage(
  wikiTitle: string,
  ua: string,
): Promise<{ imageUrl: string; pageTitle: string } | null> {
  const encoded = encodeURIComponent(wikiTitle.replace(/ /g, "_"));
  const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encoded}`, {
    headers: { "User-Agent": ua },
  });

  if (!res.ok) {
    return null;
  }

  const data = (await res.json()) as WikipediaSummary;
  const imageUrl = data.originalimage?.source ?? data.thumbnail?.source;
  if (!imageUrl) {
    return null;
  }

  return { imageUrl, pageTitle: data.title ?? wikiTitle };
}

type OpenverseResult = {
  title: string;
  url: string;
  creator: string | null;
  license: string;
  license_version: string;
  source: string;
};

export async function searchOpenverseImage(
  query: string,
  ua: string,
  preferWikimedia = true,
): Promise<OpenverseResult | null> {
  const url = new URL("https://api.openverse.org/v1/images/");
  url.searchParams.set("q", query);
  url.searchParams.set("license", OPENVERSE_LICENSES.join(","));
  url.searchParams.set("page_size", "10");
  if (preferWikimedia) {
    url.searchParams.set("source", "wikimedia");
  }

  const res = await fetch(url, { headers: { "User-Agent": ua } });
  if (!res.ok) {
    return null;
  }

  const data = (await res.json()) as { results?: OpenverseResult[] };
  const result = data.results?.find(
    (entry) => Boolean(entry.url) && isWebFriendlyImageUrl(entry.url),
  );
  return result ?? null;
}

export async function resolveWikipediaImage(
  wikiTitle: string,
  ua: string,
): Promise<ResolvedImage | null> {
  const lead = await fetchWikipediaLeadImage(wikiTitle, ua);
  if (!lead) {
    return null;
  }

  const fileName = commonsFileNameFromUploadUrl(lead.imageUrl);
  if (!fileName) {
    return null;
  }

  const meta = await fetchCommonsMeta(fileName, ua);
  if (!meta || !isReusableLicense(meta.license)) {
    return null;
  }

  return {
    imageUrl: meta.url,
    title: lead.pageTitle,
    caption: formatCommonsCaption(meta),
    source: "wikipedia",
    license: meta.license,
  };
}

export async function resolveOpenverseImage(
  query: string,
  ua: string,
): Promise<ResolvedImage | null> {
  let result = await searchOpenverseImage(query, ua, true);
  if (!result) {
    result = await searchOpenverseImage(query, ua, false);
  }
  if (!result) {
    return null;
  }

  const licenseLabel = `CC ${result.license.toUpperCase()} ${result.license_version}`.replace(
    "CC CC0",
    "CC0",
  );
  if (!isReusableLicense(licenseLabel) && !OPENVERSE_LICENSES.includes(result.license as never)) {
    return null;
  }

  return {
    imageUrl: result.url,
    title: result.title,
    caption: formatOpenverseCaption(result),
    source: "openverse",
    license: licenseLabel,
  };
}

const WEB_IMAGE_EXTENSIONS = new Set(["jpg", "jpeg", "png", "gif", "webp", "svg"]);

export function extensionFromUrl(url: string) {
  const pathname = new URL(url).pathname;
  const base = pathname.split("/").pop() ?? "";
  const match = base.match(/\.([a-z0-9]+)$/i);
  return match?.[1]?.toLowerCase() ?? "jpg";
}

export function isWebFriendlyImageUrl(url: string) {
  return WEB_IMAGE_EXTENSIONS.has(extensionFromUrl(url));
}

export async function downloadImage(url: string, dest: string, ua: string, retries = 5) {
  const { writeFileSync } = await import("node:fs");

  for (let attempt = 0; attempt < retries; attempt++) {
    const res = await fetch(url, { headers: { "User-Agent": ua } });
    if (res.ok) {
      const buffer = Buffer.from(await res.arrayBuffer());
      writeFileSync(dest, buffer);
      return true;
    }

    if (res.status === 429 && attempt < retries - 1) {
      await sleep(5000 * (attempt + 1));
      continue;
    }

    return false;
  }

  return false;
}
