import type { MediaItem } from "@/lib/timeline/schema";

type MediaListProps = {
  media: MediaItem[];
};

const typeLabels: Record<MediaItem["type"], string> = {
  youtube: "YouTube",
  link: "Link",
  meme: "Meme",
  image: "Image",
};

function youtubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = parsed.pathname.slice(1);
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      const id = parsed.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
  } catch {
    return null;
  }

  return null;
}

export function MediaList({ media }: MediaListProps) {
  return (
    <ul className="space-y-4">
      {media.map((item) => {
        const embedUrl = item.type === "youtube" ? youtubeEmbedUrl(item.url) : null;

        return (
          <li
            key={`${item.type}-${item.url}`}
            className="overflow-hidden rounded-2xl border border-border bg-surface"
          >
            {embedUrl && (
              <div className="aspect-video bg-black">
                <iframe
                  src={embedUrl}
                  title={item.title ?? "YouTube video"}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            <div className="space-y-2 p-4">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-background px-2 py-0.5 font-mono text-[10px] tracking-wide text-muted uppercase">
                  {typeLabels[item.type]}
                </span>
                {item.title && (
                  <span className="text-sm font-medium text-foreground">{item.title}</span>
                )}
              </div>

              {item.caption && (
                <p className="text-sm leading-relaxed text-muted">{item.caption}</p>
              )}

              {!embedUrl && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm text-accent hover:underline"
                >
                  Open link
                </a>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
