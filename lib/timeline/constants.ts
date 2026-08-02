/** Horizontal inset so edge labels are not clipped by the viewport. */
export const TIMELINE_EDGE_MARGIN = 120;

export const TIMELINE_YEAR_MIN = 1936;
export const TIMELINE_YEAR_MAX = 2030;

const TIMELINE_START = Date.parse(`${TIMELINE_YEAR_MIN}-01-01T00:00:00Z`);
const TIMELINE_END = Date.parse(`${TIMELINE_YEAR_MAX}-12-31T23:59:59.999Z`);

export const TIMELINE_EXTENT: [number, number] = [TIMELINE_START, TIMELINE_END];

/** SVG stroke/fill for timeline chrome. */
export const TIMELINE_INK = "#000000";
export const TIMELINE_PAPER = "#ffffff";

/** Main timeline axis stroke width (px). */
export const TIMELINE_AXIS_STROKE_WIDTH = 2.5;

/** Label stem from axis to pill (px). */
export const TIMELINE_STEM_STROKE_WIDTH = 1.5;
export const TIMELINE_STEM_HOVER_STROKE_WIDTH = 2.5;

/** Vertical position of the axis as a fraction of viewport height. */
export const TIMELINE_AXIS_Y_RATIO = 0.3;

/** Push the axis lower on short viewports so labels and expanded bubbles fit above. */
export function timelineAxisYRatio(viewportHeight: number): number {
  if (viewportHeight < 520) {
    return 0.5;
  }

  if (viewportHeight < 680) {
    return 0.42;
  }

  if (viewportHeight < 860) {
    return 0.36;
  }

  return TIMELINE_AXIS_Y_RATIO;
}

/** Animated zoom/pan duration in ms. */
export const TIMELINE_TRANSITION_MS = 400;

/** Distance from axis to year labels. */
export const TIMELINE_YEAR_LABEL_OFFSET = 80;

export const TIMELINE_ZOOM_MAX_SCALE = 180;
/** Step factor for programmatic zoom in/out (keyboard, buttons). */
export const TIMELINE_ZOOM_STEP = 1.35;

/** Clamp label pills inside the viewport. */
export const TIMELINE_LABEL_EDGE_INSET = 12;
