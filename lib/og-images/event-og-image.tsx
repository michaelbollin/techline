import { ImageResponse } from "next/og";

import { stripGlossaryMarkup } from "@/lib/glossary";
import { ogTimelineGraphicDataUri } from "@/lib/og-timeline-graphic";
import { formatEventDate } from "@/lib/timeline/format";
import { eventToFractionalYear } from "@/lib/timeline/plot-data";
import type { TimelineEvent } from "@/lib/timeline/schema";
import { SITE_WORDMARK } from "@/lib/site";

import { ogImageSize } from "./constants";
import {
  OG_CONTENT_WIDTH,
  OG_TIMELINE_STRIP_HEIGHT,
  ogDateLabelStyle,
  ogEventTitleStyle,
  ogShellStyle,
  ogWordmarkStyle,
} from "./layout";
import { clampOgTextAtWords } from "./truncate-og-text";

/** ~3 lines at 52px on a 1040px-wide card. */
const EVENT_TITLE_MAX_CHARS = 132;

export function createEventOgImageResponse(event: TimelineEvent): ImageResponse {
  const dateLabel = formatEventDate(event.date, event.datePrecision);
  const title = clampOgTextAtWords(stripGlossaryMarkup(event.title), EVENT_TITLE_MAX_CHARS);
  const highlightYear = eventToFractionalYear(event.date, event.datePrecision);
  const timelineGraphicSrc = ogTimelineGraphicDataUri(OG_CONTENT_WIDTH, OG_TIMELINE_STRIP_HEIGHT, {
    highlightYear,
  });

  return new ImageResponse(
    (
      <div style={ogShellStyle}>
        <div style={{ display: "flex", flexDirection: "column", width: OG_CONTENT_WIDTH }}>
          <div style={ogWordmarkStyle}>{SITE_WORDMARK}</div>
          <div style={ogDateLabelStyle}>{dateLabel}</div>
          <div style={ogEventTitleStyle}>{title}</div>
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
