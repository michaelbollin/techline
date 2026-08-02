import {
  DECADE_BAND_GRADIENT_OPACITY_END,
  DECADE_BAND_GRADIENT_OPACITY_START,
  formatDecadeLabel,
} from "@/lib/timeline/axis-decades";
import { axisYAt, buildAxisPath, buildDecadeBandPath } from "@/lib/timeline/axis-path";
import { desktopDotRadius } from "@/lib/timeline/dot-metrics";
import { TIMELINE_AXIS_STROKE_WIDTH, TIMELINE_INK } from "@/lib/timeline/constants";
import type { Importance } from "@/lib/timeline/importance";

/** Visible year span for the OG timeline strip. */
const OG_YEAR_MIN = 1975;
const OG_YEAR_MAX = 2025;

/** Depth of the simplified decade band below the axis (px). */
const OG_DECADE_BAND_DEPTH = 52;

type OgDot = {
  year: number;
  filled: boolean;
  importance: Importance;
};

/** Static landmark-ish spread — visual only, not loaded from event data. */
const OG_DOTS: OgDot[] = [
  { year: 1984, filled: true, importance: 0 },
  { year: 1989, filled: false, importance: 1 },
  { year: 1991, filled: true, importance: 0 },
  { year: 1995, filled: true, importance: 0 },
  { year: 1998, filled: false, importance: 2 },
  { year: 2004, filled: false, importance: 1 },
  { year: 2008, filled: true, importance: 0 },
  { year: 2012, filled: false, importance: 2 },
  { year: 2016, filled: true, importance: 1 },
  { year: 2020, filled: false, importance: 2 },
  { year: 2023, filled: true, importance: 0 },
];

function yearToX(year: number, width: number): number {
  return ((year - OG_YEAR_MIN) / (OG_YEAR_MAX - OG_YEAR_MIN)) * width;
}

function decadeStartsInOgRange(): number[] {
  const first = Math.floor(OG_YEAR_MIN / 10) * 10;
  const last = Math.floor(OG_YEAR_MAX / 10) * 10;
  const decades: number[] = [];

  for (let decade = first; decade <= last; decade += 10) {
    decades.push(decade);
  }

  return decades;
}

function dotMarkup(dots: OgDot[], width: number, baseAxisY: number): string {
  return dots
    .map((dot) => {
      const x = yearToX(dot.year, width);
      const y = axisYAt(x, baseAxisY);
      const r = desktopDotRadius(dot.importance, dot.filled);
      const tier = dot.importance;

      if (dot.filled) {
        const strokeWidth = tier === 0 ? 2 : 1.5;
        return `<circle cx="${x}" cy="${y}" r="${r}" fill="${TIMELINE_INK}" stroke="${TIMELINE_INK}" stroke-width="${strokeWidth}"/>`;
      }

      const strokeWidth = tier === 0 ? 1 : 0.75;
      return `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffffff" stroke="${TIMELINE_INK}" stroke-width="${strokeWidth}"/>`;
    })
    .join("");
}

/**
 * SVG markup for the wavy axis, decade bands, and event dots — sized for OG / social cards.
 */
export function buildOgTimelineSvg(width: number, height: number): string {
  const baseAxisY = Math.round(height * 0.38);
  const bandBottom = baseAxisY + OG_DECADE_BAND_DEPTH;
  const axisPath = buildAxisPath(width, baseAxisY);
  const getAxisY = (x: number) => axisYAt(x, baseAxisY);
  const decades = decadeStartsInOgRange();

  const bandPaths = decades
    .map((decadeStart, index) => {
      const left = index === 0 ? 0 : yearToX(decadeStart, width);
      const right = index === decades.length - 1 ? width : yearToX(decadeStart + 10, width);
      return buildDecadeBandPath(left, right, bandBottom, getAxisY);
    })
    .filter(Boolean);

  const decadeLabels = decades
    .map((decadeStart) => {
      const x0 = yearToX(decadeStart, width);
      const x1 = yearToX(decadeStart + 10, width);
      const x = (x0 + x1) / 2;
      const y = bandBottom - 14;
      return `<text x="${x}" y="${y}" text-anchor="middle" fill="${TIMELINE_INK}" fill-opacity="0.35" font-family="ui-monospace, monospace" font-size="13" font-weight="500">${formatDecadeLabel(decadeStart)}</text>`;
    })
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="og-decade-band" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${TIMELINE_INK}" stop-opacity="${DECADE_BAND_GRADIENT_OPACITY_START}"/>
      <stop offset="100%" stop-color="${TIMELINE_INK}" stop-opacity="${DECADE_BAND_GRADIENT_OPACITY_END}"/>
    </linearGradient>
  </defs>
  ${bandPaths.map((path) => `<path d="${path}" fill="url(#og-decade-band)"/>`).join("")}
  <path d="${axisPath}" fill="none" stroke="${TIMELINE_INK}" stroke-width="${TIMELINE_AXIS_STROKE_WIDTH}"/>
  ${dotMarkup(OG_DOTS, width, baseAxisY)}
  ${decadeLabels}
</svg>`;
}

export function ogTimelineGraphicDataUri(width: number, height: number): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(buildOgTimelineSvg(width, height))}`;
}
