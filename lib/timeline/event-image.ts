import type { MediaItem } from "./schema";

/** First image attachment for an event — used as cover/thumbnail. */
export function getEventCoverImage(media: MediaItem[]): MediaItem | null {
  return media.find((item) => item.type === "image") ?? null;
}

export function getEventCoverImageUrl(media: MediaItem[]): string | null {
  return getEventCoverImage(media)?.url ?? null;
}

export function getEventCoverImageCaption(media: MediaItem[]): string | null {
  return getEventCoverImage(media)?.caption ?? null;
}
