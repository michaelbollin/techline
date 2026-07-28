import { bubbleLabelTitle, measureLabelWidth } from "@/lib/timeline/measure-label";

/** Mobile label pill height (smaller than desktop). */
export const MOBILE_LABEL_BOX_HEIGHT = 30;

export const MOBILE_LABEL_RADIUS = MOBILE_LABEL_BOX_HEIGHT / 2;

export const MOBILE_LABEL_FONT_SIZE_PX = 12;

export const MOBILE_LABEL_PADDING_X = 14;

export const MOBILE_LABEL_ICON_SIZE = 12;

export const MOBILE_LABEL_ICON_GAP = 8;

export const MOBILE_LABEL_ICON_SLOT = MOBILE_LABEL_ICON_SIZE + MOBILE_LABEL_ICON_GAP;

/** Max rendered text width inside mobile label bubbles. */
export const MOBILE_LABEL_MAX_TEXT_WIDTH = 130;

export function measureMobileLabelWidth(title: string): number {
  const displayTitle = bubbleLabelTitle(title, MOBILE_LABEL_MAX_TEXT_WIDTH, MOBILE_LABEL_FONT_SIZE_PX);

  return measureLabelWidth(displayTitle, {
    fontSizePx: MOBILE_LABEL_FONT_SIZE_PX,
    paddingX: MOBILE_LABEL_PADDING_X,
    iconSlotPx: MOBILE_LABEL_ICON_SLOT,
  });
}
