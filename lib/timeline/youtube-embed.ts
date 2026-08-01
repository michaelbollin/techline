function parseYoutubeStart(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  if (/^\d+$/.test(trimmed)) {
    return Number(trimmed);
  }

  const match = trimmed.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s?)?$/i);
  if (!match) {
    return null;
  }

  const hours = Number(match[1] ?? 0);
  const minutes = Number(match[2] ?? 0);
  const seconds = Number(match[3] ?? 0);
  const total = hours * 3600 + minutes * 60 + seconds;

  return total > 0 ? total : null;
}

/** Convert a YouTube watch/share URL to an embed URL, or null if unsupported. */
export function youtubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");

    const embedId =
      host === "youtu.be"
        ? parsed.pathname.slice(1) || null
        : host === "youtube.com" || host === "m.youtube.com"
          ? parsed.searchParams.get("v")
          : null;

    if (!embedId) {
      return null;
    }

    const start =
      parseYoutubeStart(parsed.searchParams.get("t") ?? "") ??
      parseYoutubeStart(parsed.searchParams.get("start") ?? "");

    if (start) {
      return `https://www.youtube.com/embed/${embedId}?start=${start}`;
    }

    return `https://www.youtube.com/embed/${embedId}`;
  } catch {
    return null;
  }
}
