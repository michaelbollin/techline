const REUSABLE_LICENSE_PREFIXES = [
  "Public domain",
  "CC0",
  "CC BY",
  "CC BY-SA",
  "Attribution",
];

export type CommonsMeta = {
  fileName: string;
  url: string;
  license: string;
  artist: string;
};

function stripHtml(value?: string) {
  return value?.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim() ?? "";
}

export function isReusableLicense(license: string) {
  return REUSABLE_LICENSE_PREFIXES.some((prefix) => license.startsWith(prefix));
}

export function formatCaption(meta: CommonsMeta) {
  const parts = [meta.artist, meta.license, "via Wikimedia Commons"].filter(Boolean);
  return parts.join(", ");
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchCommonsMeta(
  fileName: string,
  ua: string,
  retries = 5,
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

    if (res.status === 429 || text.includes("too many requests")) {
      await sleep(3000 * (attempt + 1));
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
      await sleep(3000 * (attempt + 1));
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
