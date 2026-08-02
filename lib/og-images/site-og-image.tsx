import { ImageResponse } from "next/og";

import { ogTimelineGraphicDataUri } from "@/lib/og-timeline-graphic";
import { SITE_DESCRIPTION, SITE_WORDMARK } from "@/lib/site";

import { ogImageSize } from "./constants";
import {
  OG_CONTENT_WIDTH,
  OG_TIMELINE_STRIP_HEIGHT,
  ogDescriptionStyle,
  ogShellStyle,
  ogWordmarkStyle,
} from "./layout";

export function createSiteOgImageResponse(): ImageResponse {
  const timelineGraphicSrc = ogTimelineGraphicDataUri(OG_CONTENT_WIDTH, OG_TIMELINE_STRIP_HEIGHT);

  return new ImageResponse(
    (
      <div style={ogShellStyle}>
        <div style={{ display: "flex", flexDirection: "column", width: OG_CONTENT_WIDTH }}>
          <div style={ogWordmarkStyle}>{SITE_WORDMARK}</div>
          <div style={ogDescriptionStyle}>{SITE_DESCRIPTION}</div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse requires <img> */}
        <img
          src={timelineGraphicSrc}
          width={OG_CONTENT_WIDTH}
          height={OG_TIMELINE_STRIP_HEIGHT}
          alt=""
          style={{
            width: OG_CONTENT_WIDTH,
            height: OG_TIMELINE_STRIP_HEIGHT,
            display: "block",
          }}
        />
      </div>
    ),
    { ...ogImageSize },
  );
}
