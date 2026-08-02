import { decadeBandBottomY } from "./axis-decades";

/**
 * Hover detail mode: expanded label bubble (default) vs axis-band detail panel (legacy).
 * When false, hover shows the growing black bubble on the label stem instead of
 * `TimelineEventDetail` above/below the decade band.
 */
export const TIMELINE_USE_HOVER_DETAIL_PANEL = false;

/** Gap between the decade/year label band and hover detail content (px). */
export const TIMELINE_EVENT_DETAIL_TOP_GAP = 16;

/** Minimum vertical band before attempting to show hover detail (px). */
export const TIMELINE_EVENT_DETAIL_MIN_HEIGHT = 80;

/** Header inset when comparing space above the axis (px). */
const TIMELINE_DETAIL_ABOVE_INSET = 96;

export type TimelineEventDetailLayout = {
  top: number;
  maxHeight: number;
  /** False when the axis-to-footer band is too short to show detail. */
  show: boolean;
};

export function timelineEventDetailLayout(
  axisY: number,
  viewportHeight: number,
  footerReservedHeight: number,
): TimelineEventDetailLayout {
  const bandBottom = decadeBandBottomY(axisY);
  const minTop = bandBottom + TIMELINE_EVENT_DETAIL_TOP_GAP;
  const belowBandSpace = viewportHeight - bandBottom - footerReservedHeight;
  const aboveSpace = axisY - TIMELINE_DETAIL_ABOVE_INSET;

  let top = minTop;

  if (
    belowBandSpace > aboveSpace &&
    belowBandSpace >= TIMELINE_EVENT_DETAIL_MIN_HEIGHT
  ) {
    const spare = belowBandSpace - TIMELINE_EVENT_DETAIL_MIN_HEIGHT;
    const push = Math.min(spare, (belowBandSpace - aboveSpace) * 0.45);
    top = minTop + push;
  }

  const maxHeight = viewportHeight - top - footerReservedHeight;

  return {
    top,
    maxHeight: Math.max(0, maxHeight),
    show: maxHeight >= TIMELINE_EVENT_DETAIL_MIN_HEIGHT,
  };
}
