import { OG_IMAGE_WIDTH } from "./constants";

export const OG_HORIZONTAL_PADDING = 72;
export const OG_CONTENT_WIDTH = OG_IMAGE_WIDTH - OG_HORIZONTAL_PADDING * 2;
export const OG_TIMELINE_STRIP_HEIGHT = 148;

export const ogShellStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "space-between",
  background: "#ffffff",
  padding: `52px ${OG_HORIZONTAL_PADDING}px 40px`,
};

export const ogWordmarkStyle = {
  fontSize: 68,
  fontWeight: 800 as const,
  letterSpacing: "0.16em",
  color: "#000000",
  fontFamily: "ui-monospace, monospace",
  width: OG_CONTENT_WIDTH,
};

export const ogDescriptionStyle = {
  marginTop: 28,
  fontSize: 38,
  fontWeight: 700 as const,
  lineHeight: 1.32,
  color: "#1a1a1a",
  width: OG_CONTENT_WIDTH,
};

export const ogDateLabelStyle = {
  marginTop: 28,
  fontSize: 28,
  fontWeight: 700 as const,
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  color: "#444444",
  width: OG_CONTENT_WIDTH,
};

export const ogEventTitleStyle = {
  marginTop: 18,
  fontSize: 52,
  fontWeight: 800 as const,
  lineHeight: 1.22,
  color: "#000000",
  width: OG_CONTENT_WIDTH,
};
