export const LABEL_FONT_SIZE_PX = 14;
export const LABEL_FONT_WEIGHT = 500;
/** Horizontal inset on each side of the label pill (must match rendered SVG text). */
export const LABEL_PADDING_X = 20;
export const LABEL_ICON_SIZE = 14;
export const LABEL_ICON_GAP = 8;
export const LABEL_ICON_SLOT = LABEL_ICON_SIZE + LABEL_ICON_GAP;
export const LABEL_HORIZONTAL_PADDING = LABEL_PADDING_X * 2;
/** Matches timeline node label `text-sm tracking-wide`. */
export const LABEL_LETTER_SPACING_EM = 0.025;
/** Extra width so canvas measurement stays ahead of Geist / letter-spacing drift. */
export const LABEL_MEASURE_SAFETY_PX = 10;

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

export function measureLabelWidth(
  title: string,
  options?: {
    fontSizePx?: number;
    paddingX?: number;
    iconSlotPx?: number;
  },
): number {
  const fontSizePx = options?.fontSizePx ?? LABEL_FONT_SIZE_PX;
  const paddingX = options?.paddingX ?? LABEL_PADDING_X;
  const iconSlotPx = options?.iconSlotPx ?? 0;
  const horizontalPadding = paddingX * 2;
  const letterSpacingPx = fontSizePx * LABEL_LETTER_SPACING_EM;
  const letterSpacingWidth = Math.max(0, title.length - 1) * letterSpacingPx;
  const context = getMeasureContext();

  if (context) {
    context.font = `${LABEL_FONT_WEIGHT} ${fontSizePx}px ${getTimelineLabelFontFamily()}`;
    const textWidth = context.measureText(title).width + letterSpacingWidth;
    return Math.ceil(textWidth) + horizontalPadding + iconSlotPx + LABEL_MEASURE_SAFETY_PX;
  }

  return (
    Math.max(64, Math.ceil(title.length * (fontSizePx * 0.52) + letterSpacingWidth)) +
    horizontalPadding +
    iconSlotPx +
    LABEL_MEASURE_SAFETY_PX
  );
}

export function measureTimelineLabelWidth(title: string): number {
  return measureLabelWidth(title, { iconSlotPx: LABEL_ICON_SLOT });
}
