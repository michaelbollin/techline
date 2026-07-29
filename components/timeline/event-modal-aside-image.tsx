import Image from "next/image";

import { getEventCoverImage } from "@/lib/timeline/event-image";
import { cn } from "@/lib/cn";
import type { MediaItem } from "@/lib/timeline/schema";

type EventModalAsideImageProps = {
  media: MediaItem[];
  className?: string;
};

export function EventModalAsideImage({ media, className }: EventModalAsideImageProps) {
  const image = getEventCoverImage(media);

  if (!image) {
    return null;
  }

  return (
    <aside className={cn("w-full shrink-0 sm:w-[min(46%,18rem)]", className)}>
      <Image
        src={image.url}
        alt={image.title ?? ""}
        width={640}
        height={640}
        className="h-auto w-full object-contain"
        unoptimized={image.url.endsWith(".svg")}
      />
      {image.caption && (
        <p className="mt-2 text-xs leading-snug opacity-30">{image.caption}</p>
      )}
    </aside>
  );
}
