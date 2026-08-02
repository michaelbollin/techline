import { createEventOgImageResponse } from "@/lib/og-images/event-og-image";
import { OG_IMAGE_CONTENT_TYPE, ogImageSize } from "@/lib/og-images/constants";
import { createSiteOgImageResponse } from "@/lib/og-images/site-og-image";
import { getTimeline } from "@/lib/timeline/get-timeline";
import { getEventBySlug, isEventSlug } from "@/lib/timeline/routing";
import { SITE_NAME } from "@/lib/site";

/** Generated on demand — avoids prebuilding 1000+ card images at deploy. */
export const dynamic = "force-dynamic";

type SegmentOgImageProps = {
  params: Promise<{ segment: string }>;
};

export async function generateImageMetadata({ params }: SegmentOgImageProps) {
  const { segment } = await params;
  const { events } = await getTimeline();

  if (!segment || !isEventSlug(segment, events)) {
    return [
      {
        id: "site",
        alt: SITE_NAME,
        size: ogImageSize,
        contentType: OG_IMAGE_CONTENT_TYPE,
      },
    ];
  }

  const event = getEventBySlug(events, segment)!;

  return [
    {
      id: event.id,
      alt: event.title,
      size: ogImageSize,
      contentType: OG_IMAGE_CONTENT_TYPE,
    },
  ];
}

export default async function SegmentOpenGraphImage({ params }: SegmentOgImageProps) {
  const { segment } = await params;
  const { events } = await getTimeline();

  if (!segment || !isEventSlug(segment, events)) {
    return createSiteOgImageResponse();
  }

  const event = getEventBySlug(events, segment)!;
  return createEventOgImageResponse(event);
}
