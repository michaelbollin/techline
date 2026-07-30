import { ImageResponse } from "next/og";

import { SITE_DESCRIPTION, SITE_NAME, SITE_WORDMARK } from "@/lib/site";

export const alt = SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#ffffff",
          padding: "80px",
        }}
      >
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
            marginTop: 28,
            fontSize: 34,
            lineHeight: 1.35,
            color: "#444444",
            maxWidth: 900,
          }}
        >
          {SITE_DESCRIPTION}
        </div>
      </div>
    ),
    { ...size },
  );
}
