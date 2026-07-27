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

export function buildAxisPath(width: number, baseAxisY: number): string {
  const step = 6;
  let path = `M 0 ${axisYAt(0, baseAxisY)}`;

  for (let x = step; x < width; x += step) {
    path += ` L ${x} ${axisYAt(x, baseAxisY)}`;
  }

  path += ` L ${width} ${axisYAt(width, baseAxisY)}`;
  return path;
}
