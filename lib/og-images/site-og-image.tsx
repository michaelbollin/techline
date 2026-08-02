import { ImageResponse } from "next/og";

import { ogTimelineGraphicDataUri } from "@/lib/og-timeline-graphic";
import { SITE_DESCRIPTION, SITE_WORDMARK } from "@/lib/site";

import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, ogImageSize } from "./constants";

const HORIZONTAL_PADDING = 80;
const TIMELINE_STRIP_WIDTH = OG_IMAGE_WIDTH - HORIZONTAL_PADDING * 2;
const TIMELINE_STRIP_HEIGHT = 148;

export function createSiteOgImageResponse(): ImageResponse {
  const timelineGraphicSrc = ogTimelineGraphicDataUri(TIMELINE_STRIP_WIDTH, TIMELINE_STRIP_HEIGHT);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: `56px ${HORIZONTAL_PADDING}px 44px`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              letterSpacing: "0.18em",
              color: "#000000",
              fontFamily: "ui-monospace, monospace",
            }}
          >
            {SITE_WORDMARK}
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 30,
              lineHeight: 1.35,
              color: "#444444",
              maxWidth: 900,
            }}
          >
            {SITE_DESCRIPTION}
          </div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse requires <img> */}
        <img
          src={timelineGraphicSrc}
          width={TIMELINE_STRIP_WIDTH}
          height={TIMELINE_STRIP_HEIGHT}
          alt=""
          style={{
            width: TIMELINE_STRIP_WIDTH,
            height: TIMELINE_STRIP_HEIGHT,
            display: "block",
          }}
        />
      </div>
    ),
    { ...ogImageSize },
  );
}
