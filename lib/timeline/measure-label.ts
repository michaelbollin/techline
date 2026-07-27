export const LABEL_FONT_SIZE_PX = 11;
export const LABEL_FONT_WEIGHT = 500;
export const LABEL_HORIZONTAL_PADDING = 20;
export const LABEL_FONT_FAMILY = '"Roboto Condensed", sans-serif';

const CANVAS_FONT = `${LABEL_FONT_WEIGHT} ${LABEL_FONT_SIZE_PX}px ${LABEL_FONT_FAMILY}`;

let measureContext: CanvasRenderingContext2D | null = null;

function getMeasureContext(): CanvasRenderingContext2D | null {
  if (typeof document === "undefined") {
    return null;
  }

  if (!measureContext) {
    const canvas = document.createElement("canvas");
    measureContext = canvas.getContext("2d");
    if (measureContext) {
      measureContext.font = CANVAS_FONT;
    }
  }

  return measureContext;
}

/** Measure rendered label width (auto-sized pill, no truncation). */
export function measureLabelWidth(title: string): number {
  const context = getMeasureContext();

  if (context) {
    context.font = CANVAS_FONT;
    return Math.ceil(context.measureText(title).width) + LABEL_HORIZONTAL_PADDING;
  }

  return Math.max(56, Math.ceil(title.length * 5.6) + LABEL_HORIZONTAL_PADDING);
}
