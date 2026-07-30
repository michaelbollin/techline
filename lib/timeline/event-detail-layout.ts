import { decadeBandBottomY } from "./axis-decades";

/** Gap between the decade/year label band and hover detail content (px). */
export const TIMELINE_EVENT_DETAIL_TOP_GAP = 16;

/** Minimum vertical band before attempting to show hover detail (px). */
export const TIMELINE_EVENT_DETAIL_MIN_HEIGHT = 80;

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
  const top = decadeBandBottomY(axisY) + TIMELINE_EVENT_DETAIL_TOP_GAP;
  const maxHeight = viewportHeight - top - footerReservedHeight;

  return {
    top,
    maxHeight: Math.max(0, maxHeight),
    show: maxHeight >= TIMELINE_EVENT_DETAIL_MIN_HEIGHT,
  };
}
