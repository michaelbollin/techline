import type * as d3 from "d3";
import { MS_PER_YEAR } from "./axis-ticks";
import { TIMELINE_YEAR_LABEL_OFFSET, TIMELINE_YEAR_MAX, TIMELINE_YEAR_MIN } from "./constants";

/** Vertical gap between year labels and decade labels (px). */
export const TIMELINE_YEAR_TO_DECADE_LABEL_GAP = 52;

/** Distance from axis reference to decade label baseline (px). */
export const TIMELINE_DECADE_LABEL_Y_OFFSET =
  TIMELINE_YEAR_LABEL_OFFSET + 14 + TIMELINE_YEAR_TO_DECADE_LABEL_GAP;

/** Padding below decade labels inside the grey band (px). */
export const TIMELINE_DECADE_BAND_BOTTOM_PAD = 32;

/** Total depth of the grey decade band measured from the axis reference line (px). */
export const TIMELINE_DECADE_BAND_HEIGHT = TIMELINE_DECADE_LABEL_Y_OFFSET + TIMELINE_DECADE_BAND_BOTTOM_PAD;

export function decadeBandBottomY(baseAxisY: number): number {
  return baseAxisY + TIMELINE_DECADE_BAND_HEIGHT;
}

export function decadeLabelY(bandBottomY: number): number {
  return bandBottomY - TIMELINE_DECADE_BAND_BOTTOM_PAD;
}

/** Show decade bands when viewing roughly two or more years at once. */
export const DECADE_BAND_MIN_SPAN_MS = MS_PER_YEAR * 2;

/** Horizontal gradient stops shared by every decade band (left → right). */
export const DECADE_BAND_GRADIENT_OPACITY_START = 0.03;
export const DECADE_BAND_GRADIENT_OPACITY_END = 0.06;
export const DECADE_BAND_GRADIENT_OPACITY_START_HOVER = 0.04;
export const DECADE_BAND_GRADIENT_OPACITY_END_HOVER = 0.08;

/** Object-bbox fraction (0–1) where the vertical fade to white begins. */
export const DECADE_BAND_VERTICAL_FADE_START = 0.42;

export function decadeStartsInRange(minYear: number, maxYear: number): number[] {
  const first = Math.floor(minYear / 10) * 10;
  const last = Math.floor(maxYear / 10) * 10;
  const decades: number[] = [];

  for (let decade = first; decade <= last; decade += 10) {
    decades.push(decade);
  }

  return decades;
}

export function visibleDecadeStarts(
  xScale: d3.ScaleTime<number, number>,
  width: number,
  extentMinYear = TIMELINE_YEAR_MIN,
  extentMaxYear = TIMELINE_YEAR_MAX,
): number[] {
  const visibleStartYear = xScale.invert(0).getUTCFullYear();
  const visibleEndYear = xScale.invert(width).getUTCFullYear();
  const minYear = Math.max(extentMinYear, Math.min(visibleStartYear, visibleEndYear) - 1);
  const maxYear = Math.min(extentMaxYear, Math.max(visibleStartYear, visibleEndYear) + 1);

  return decadeStartsInRange(minYear, maxYear);
}

/** Short decade label: 1990 → "90s", 2000 → "0s". */
export function formatDecadeLabel(decadeStart: number): string {
  return `${decadeStart % 100}s`;
}

export function shouldShowDecadeBands(spanMs: number, interval: "year" | "month"): boolean {
  return interval === "year" && spanMs >= DECADE_BAND_MIN_SPAN_MS;
}
