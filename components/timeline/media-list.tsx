import { youtubeEmbedUrl } from "@/lib/timeline/youtube-embed";
import type { MediaItem } from "@/lib/timeline/schema";

type MediaListProps = {
  media: MediaItem[];
  variant?: "page" | "modal";
};

const typeLabels: Record<MediaItem["type"], string> = {
  youtube: "YouTube",
  link: "Link",
  meme: "Meme",
  image: "Image",
};

export function MediaList({ media, variant = "page" }: MediaListProps) {
  return (
    <ul className="space-y-4">
      {media.map((item) => {
        const embedUrl = item.type === "youtube" ? youtubeEmbedUrl(item.url) : null;

        return (
          <li
            key={`${item.type}-${item.url}`}
            className={
              variant === "modal" ? "space-y-2" : "overflow-hidden rounded-2xl border border-border bg-surface"
            }
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

            <div className={variant === "modal" ? "space-y-2" : "space-y-2 p-4"}>
              <div className="flex items-center gap-2">
                {variant === "page" && (
                  <span className="rounded-full bg-background px-2 py-0.5 font-mono text-xs tracking-wide text-muted uppercase">
                    {typeLabels[item.type]}
                  </span>
                )}
                {variant === "modal" && (
                  <span className="font-mono text-xs tracking-wide text-muted uppercase">
                    {typeLabels[item.type]}
                  </span>
                )}
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
                  className="inline-block text-sm text-foreground underline decoration-black/15 underline-offset-4 hover:decoration-black/40"
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
