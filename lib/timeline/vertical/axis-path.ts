/** Subtle sine offset on the vertical axis (px). */
export const MOBILE_AXIS_WAVE_AMPLITUDE = 12;

/** Vertical wavelength of the axis wave (px). */
export const MOBILE_AXIS_WAVE_LENGTH = 360;

export function axisWaveOffset(y: number): number {
  return Math.sin((y / MOBILE_AXIS_WAVE_LENGTH) * Math.PI * 2) * MOBILE_AXIS_WAVE_AMPLITUDE;
}

export function axisXAt(y: number, baseAxisX: number): number {
  return baseAxisX + axisWaveOffset(y);
}

export function buildVerticalAxisPath(height: number, baseAxisX: number): string {
  const step = 6;
  let path = `M ${axisXAt(0, baseAxisX)} 0`;

  for (let y = step; y < height; y += step) {
    path += ` L ${axisXAt(y, baseAxisX)} ${y}`;
  }

  path += ` L ${axisXAt(height, baseAxisX)} ${height}`;
  return path;
}
