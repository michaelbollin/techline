export const LABEL_FONT_SIZE_PX = 13;
export const LABEL_FONT_WEIGHT = 500;
/** Horizontal inset on each side of the label pill (must match rendered SVG text). */
export const LABEL_PADDING_X = 20;
export const LABEL_HORIZONTAL_PADDING = LABEL_PADDING_X * 2;
/** Matches `.timeline-node-label-text { letter-spacing: 0.02em }`. */
export const LABEL_LETTER_SPACING_EM = 0.02;
/** Extra width so canvas measurement stays ahead of Geist / letter-spacing drift. */
export const LABEL_MEASURE_SAFETY_PX = 6;

let measureContext: CanvasRenderingContext2D | null = null;

function getTimelineLabelFontFamily(): string {
  if (typeof document === "undefined") {
    return "sans-serif";
  }

  const family = getComputedStyle(document.documentElement)
    .getPropertyValue("--font-geist-sans")
    .trim();

  return family || "sans-serif";
}

function getCanvasFont(): string {
  return `${LABEL_FONT_WEIGHT} ${LABEL_FONT_SIZE_PX}px ${getTimelineLabelFontFamily()}`;
}

function getMeasureContext(): CanvasRenderingContext2D | null {
  if (typeof document === "undefined") {
    return null;
  }

  if (!measureContext) {
    const canvas = document.createElement("canvas");
    measureContext = canvas.getContext("2d");
  }

  return measureContext;
}

/** Measure rendered label width (auto-sized pill, no truncation). */
export function measureLabelWidth(title: string): number {
  const letterSpacingPx = LABEL_FONT_SIZE_PX * LABEL_LETTER_SPACING_EM;
  const letterSpacingWidth = Math.max(0, title.length - 1) * letterSpacingPx;
  const context = getMeasureContext();

  if (context) {
    context.font = getCanvasFont();
    const textWidth = context.measureText(title).width + letterSpacingWidth;
    return (
      Math.ceil(textWidth) + LABEL_HORIZONTAL_PADDING + LABEL_MEASURE_SAFETY_PX
    );
  }

  return (
    Math.max(64, Math.ceil(title.length * 7.2 + letterSpacingWidth)) +
    LABEL_HORIZONTAL_PADDING +
    LABEL_MEASURE_SAFETY_PX
  );
}
