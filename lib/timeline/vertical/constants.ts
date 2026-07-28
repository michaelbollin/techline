import { MOBILE_AXIS_WAVE_AMPLITUDE } from "./axis-path";

/** Horizontal inset for the mobile vertical timeline. */
export const MOBILE_TIMELINE_EDGE_MARGIN = 16;

/** Left padding before year labels. */
export const MOBILE_YEAR_LABEL_INSET = 12;

/** Space reserved for year label text (e.g. "2025"). */
export const MOBILE_YEAR_LABEL_WIDTH = 36;

/** x-position for year labels (textAnchor end). */
export const MOBILE_YEAR_LABEL_X = MOBILE_YEAR_LABEL_INSET + MOBILE_YEAR_LABEL_WIDTH;

/** Gap between year labels and the axis at its leftmost wave point. */
export const MOBILE_AXIS_GAP = 12;

/**
 * Base x-position of the vertical axis spine.
 * Wave swing is added on top of MOBILE_AXIS_GAP so labels never overlap.
 */
export const MOBILE_TIMELINE_AXIS_X =
  MOBILE_YEAR_LABEL_X + MOBILE_AXIS_GAP + MOBILE_AXIS_WAVE_AMPLITUDE;

/** Distance from axis to first event label column. */
export const MOBILE_LABEL_OFFSET = 40;

/** Minimum horizontal space per label column. */
export const MOBILE_LABEL_LANE_STEP = 120;
