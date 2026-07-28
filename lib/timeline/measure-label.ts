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
export const LABEL_MEASURE_SAFETY_PX = 6;

/** Max rendered text width inside desktop label bubbles. */
export const DESKTOP_LABEL_MAX_TEXT_WIDTH = 190;

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

function letterSpacingWidth(text: string, fontSizePx: number): number {
  const letterSpacingPx = fontSizePx * LABEL_LETTER_SPACING_EM;
  return Math.max(0, text.length - 1) * letterSpacingPx;
}

export function measureLabelTextWidth(title: string, fontSizePx: number): number {
  const context = getMeasureContext();

  if (context) {
    context.font = `${LABEL_FONT_WEIGHT} ${fontSizePx}px ${getTimelineLabelFontFamily()}`;
    return context.measureText(title).width + letterSpacingWidth(title, fontSizePx);
  }

  return title.length * (fontSizePx * 0.52) + letterSpacingWidth(title, fontSizePx);
}

/** Shorten a title for bubble display so it fits without crowding the icon. */
export function bubbleLabelTitle(
  title: string,
  maxTextWidthPx: number,
  fontSizePx: number = LABEL_FONT_SIZE_PX,
): string {
  const ellipsis = "…";

  if (measureLabelTextWidth(title, fontSizePx) <= maxTextWidthPx) {
    return title;
  }

  if (measureLabelTextWidth(ellipsis, fontSizePx) > maxTextWidthPx) {
    return ellipsis;
  }

  let low = 0;
  let high = title.length;

  while (low < high) {
    const mid = Math.ceil((low + high) / 2);
    const candidate = `${title.slice(0, mid).trimEnd()}${ellipsis}`;

    if (measureLabelTextWidth(candidate, fontSizePx) <= maxTextWidthPx) {
      low = mid;
    } else {
      high = mid - 1;
    }
  }

  const trimmed = title.slice(0, low).trimEnd();
  return trimmed.length > 0 ? `${trimmed}${ellipsis}` : ellipsis;
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
  const context = getMeasureContext();

  if (context) {
    context.font = `${LABEL_FONT_WEIGHT} ${fontSizePx}px ${getTimelineLabelFontFamily()}`;
    const textWidth = measureLabelTextWidth(title, fontSizePx);
    return Math.ceil(textWidth) + horizontalPadding + iconSlotPx + LABEL_MEASURE_SAFETY_PX;
  }

  return (
    Math.max(64, Math.ceil(measureLabelTextWidth(title, fontSizePx))) +
    horizontalPadding +
    iconSlotPx +
    LABEL_MEASURE_SAFETY_PX
  );
}

export function measureTimelineLabelWidth(title: string): number {
  const displayTitle = bubbleLabelTitle(title, DESKTOP_LABEL_MAX_TEXT_WIDTH, LABEL_FONT_SIZE_PX);

  return measureLabelWidth(displayTitle, { iconSlotPx: LABEL_ICON_SLOT });
}
