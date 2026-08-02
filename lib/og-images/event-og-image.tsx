import { ImageResponse } from "next/og";

import { stripGlossaryMarkup } from "@/lib/glossary";
import { formatEventDate } from "@/lib/timeline/format";
import { getEventCoverImageUrl } from "@/lib/timeline/event-image";
import type { TimelineEvent } from "@/lib/timeline/schema";
import { SITE_WORDMARK } from "@/lib/site";

import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, ogImageSize } from "./constants";
import { loadOgImageSrc } from "./load-og-image-src";
import { truncateOgText } from "./truncate-og-text";

const CARD_PADDING = 52;
const HORIZONTAL_PADDING = 56;
const IMAGE_SIZE = 200;

export async function createEventOgImageResponse(event: TimelineEvent): Promise<ImageResponse> {
  const dateLabel = formatEventDate(event.date, event.datePrecision);
  const title = truncateOgText(stripGlossaryMarkup(event.title), 100);
  const summary = truncateOgText(stripGlossaryMarkup(event.summary), 220);
  const imageSrc = await loadOgImageSrc(getEventCoverImageUrl(event.media));

  return new ImageResponse(
    (
      <div
        style={{
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          padding: HORIZONTAL_PADDING,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            background: "#000000",
            borderRadius: 28,
            padding: CARD_PADDING,
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(255, 255, 255, 0.65)",
            }}
          >
            {dateLabel}
          </div>

          <div
            style={{
              display: "flex",
              flex: 1,
              marginTop: 28,
              gap: 40,
              alignItems: "flex-start",
            }}
          >
            {imageSrc ? (
              // eslint-disable-next-line @next/next/no-img-element -- ImageResponse requires <img>
              <img
                src={imageSrc}
                width={IMAGE_SIZE}
                height={IMAGE_SIZE}
                alt=""
                style={{
                  width: IMAGE_SIZE,
                  height: IMAGE_SIZE,
                  objectFit: "contain",
                  borderRadius: 12,
                  flexShrink: 0,
                }}
              />
            ) : null}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                minWidth: 0,
              }}
            >
              <div
                style={{
                  fontSize: 46,
                  fontWeight: 600,
                  lineHeight: 1.15,
                  color: "#ffffff",
                }}
              >
                {title}
              </div>
              <div
                style={{
                  marginTop: 22,
                  fontSize: 26,
                  lineHeight: 1.4,
                  color: "rgba(255, 255, 255, 0.88)",
                }}
              >
                {summary}
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: 28,
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: "0.18em",
              color: "rgba(255, 255, 255, 0.32)",
              fontFamily: "ui-monospace, monospace",
            }}
          >
            {SITE_WORDMARK}
          </div>
        </div>
      </div>
    ),
    { ...ogImageSize },
  );
}
