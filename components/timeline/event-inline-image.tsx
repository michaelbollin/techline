import Image from "next/image";

import { cn } from "@/lib/cn";
import { getEventCoverImage } from "@/lib/timeline/event-image";
import type { MediaItem } from "@/lib/timeline/schema";

type EventInlineImageProps = {
  media: MediaItem[];
  className?: string;
  size?: "sm" | "md";
};

const sizeClasses = {
  sm: "h-20 w-20",
  md: "h-28 w-28",
};

export function EventInlineImage({ media, className, size = "md" }: EventInlineImageProps) {
  const image = getEventCoverImage(media);

  if (!image) {
    return null;
  }

  return (
    <Image
      src={image.url}
      alt={image.title ?? ""}
      width={112}
      height={112}
      className={cn(
        "float-left mr-4 mb-2 block rounded-lg border border-black/10 object-cover",
        sizeClasses[size],
        className,
      )}
      unoptimized={image.url.endsWith(".svg")}
    />
  );
}
