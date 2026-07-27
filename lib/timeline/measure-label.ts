export const LABEL_FONT_SIZE_PX = 13;
export const LABEL_FONT_WEIGHT = 500;
export const LABEL_HORIZONTAL_PADDING = 34;

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
  const context = getMeasureContext();

  if (context) {
    context.font = getCanvasFont();
    return Math.ceil(context.measureText(title).width) + LABEL_HORIZONTAL_PADDING;
  }

  return Math.max(64, Math.ceil(title.length * 6.6) + LABEL_HORIZONTAL_PADDING);
}
