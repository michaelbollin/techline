/** Horizontal inset so edge labels are not clipped by the viewport. */
export const TIMELINE_EDGE_MARGIN = 120;

export const TIMELINE_YEAR_MIN = 1936;
export const TIMELINE_YEAR_MAX = 2040;

const TIMELINE_START = Date.parse(`${TIMELINE_YEAR_MIN}-01-01T00:00:00Z`);
const TIMELINE_END = Date.parse(`${TIMELINE_YEAR_MAX}-12-31T23:59:59.999Z`);

export const TIMELINE_EXTENT: [number, number] = [TIMELINE_START, TIMELINE_END];

/** SVG stroke/fill for timeline chrome. */
export const TIMELINE_INK = "#000000";
export const TIMELINE_PAPER = "#ffffff";

/** Vertical position of the axis as a fraction of viewport height. */
export const TIMELINE_AXIS_Y_RATIO = 0.4;

/** Animated zoom/pan duration in ms. */
export const TIMELINE_TRANSITION_MS = 400;

/** Distance from axis to year labels. */
export const TIMELINE_YEAR_LABEL_OFFSET = 80;

/** Extra space below year labels before hover detail text. */
export const TIMELINE_EVENT_DETAIL_GAP = 96;

/** Distance from axis to hover detail text (below year labels). */
export const TIMELINE_EVENT_DETAIL_OFFSET = TIMELINE_YEAR_LABEL_OFFSET + TIMELINE_EVENT_DETAIL_GAP;

export const TIMELINE_ZOOM_MAX_SCALE = 180;
export const TIMELINE_ZOOM_STEP = 1.35;

/** Clamp label pills inside the viewport. */
export const TIMELINE_LABEL_EDGE_INSET = 12;
