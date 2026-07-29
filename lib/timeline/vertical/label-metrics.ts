import { measureLabelWidth } from "@/lib/timeline/measure-label";

/** Mobile label pill height (smaller than desktop). */
export const MOBILE_LABEL_BOX_HEIGHT = 30;

export const MOBILE_LABEL_RADIUS = MOBILE_LABEL_BOX_HEIGHT / 2;

export const MOBILE_LABEL_FONT_SIZE_PX = 12;

export const MOBILE_LABEL_PADDING_X = 14;

export function measureMobileLabelWidth(title: string): number {
  return measureLabelWidth(title, {
    fontSizePx: MOBILE_LABEL_FONT_SIZE_PX,
    paddingX: MOBILE_LABEL_PADDING_X,
  });
}
