/** Subtle sine offset on the timeline axis (px). */
export const TIMELINE_AXIS_WAVE_AMPLITUDE = 16;

/** Horizontal wavelength of the axis wave (px). */
export const TIMELINE_AXIS_WAVE_LENGTH = 480;

export function axisWaveOffset(x: number): number {
  return Math.sin((x / TIMELINE_AXIS_WAVE_LENGTH) * Math.PI * 2) * TIMELINE_AXIS_WAVE_AMPLITUDE;
}

export function axisYAt(x: number, baseAxisY: number): number {
  return baseAxisY + axisWaveOffset(x);
}

const AXIS_PATH_STEP = 6;

export function buildAxisPath(width: number, baseAxisY: number): string {
  let path = `M 0 ${axisYAt(0, baseAxisY)}`;

  for (let x = AXIS_PATH_STEP; x < width; x += AXIS_PATH_STEP) {
    path += ` L ${x} ${axisYAt(x, baseAxisY)}`;
  }

  path += ` L ${width} ${axisYAt(width, baseAxisY)}`;
  return path;
}

/** Closed path: curvy top along the axis, flat bottom at a fixed y. */
export function buildDecadeBandPath(
  left: number,
  right: number,
  bandBottomY: number,
  getAxisY: (x: number) => number,
  step = AXIS_PATH_STEP,
): string {
  if (right <= left) {
    return "";
  }

  let path = `M ${left} ${bandBottomY} L ${left} ${getAxisY(left)}`;

  for (let x = left + step; x < right; x += step) {
    path += ` L ${x} ${getAxisY(x)}`;
  }

  path += ` L ${right} ${getAxisY(right)} L ${right} ${bandBottomY} Z`;
  return path;
}
