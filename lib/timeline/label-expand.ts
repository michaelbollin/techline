import { TIMELINE_LABEL_EDGE_INSET } from "./constants";
import { LABEL_BOX_HEIGHT } from "./label-layout";

/** Keep expanded bubbles inside the SVG viewport top edge. */
export const EXPANDED_BUBBLE_TOP_INSET = TIMELINE_LABEL_EDGE_INSET;

/** Cap bubble height so its top edge stays at or below `topInset`. */
export function clampExpandedBubbleHeight(
  anchorBottom: number,
  desiredHeight: number,
  topInset = EXPANDED_BUBBLE_TOP_INSET,
): number {
  const maxHeight = anchorBottom - topInset;

  if (maxHeight <= 0) {
    return LABEL_BOX_HEIGHT;
  }

  return Math.min(desiredHeight, Math.max(LABEL_BOX_HEIGHT, maxHeight));
}
