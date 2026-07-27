import * as d3 from "d3";

const MS_PER_DAY = 86_400_000;
const MS_PER_YEAR = 365.25 * MS_PER_DAY;

/** Minimum horizontal space between axis labels (px). */
const MIN_TICK_SPACING_PX = 52;

/** Switch to month labels when less than ~14 months are visible. */
const MONTH_LABEL_MAX_SPAN_MS = MS_PER_YEAR * 1.2;

export type AxisTickInterval = "year" | "month";

export function visibleTimeSpanMs(
  xScale: d3.ScaleTime<number, number>,
  width: number,
): number {
  return Math.abs(xScale.invert(width).getTime() - xScale.invert(0).getTime());
}

export function axisTickInterval(spanMs: number): AxisTickInterval {
  if (spanMs > MONTH_LABEL_MAX_SPAN_MS) {
    return "year";
  }

  return "month";
}

function thinTimeTicks(
  ticks: Date[],
  xScale: d3.ScaleTime<number, number>,
  minSpacingPx: number,
): Date[] {
  const thinned: Date[] = [];
  let lastX = Number.NEGATIVE_INFINITY;

  for (const tick of ticks) {
    const x = xScale(tick);
    if (x - lastX >= minSpacingPx) {
      thinned.push(tick);
      lastX = x;
    }
  }

  return thinned;
}

export function axisTicks(
  xScale: d3.ScaleTime<number, number>,
  width: number,
): Date[] {
  const spanMs = visibleTimeSpanMs(xScale, width);
  const interval = axisTickInterval(spanMs);

  if (interval === "year") {
    // One label per calendar year; thin when zoomed out so labels don't overlap.
    return thinTimeTicks(
      xScale.ticks(d3.timeYear.every(1)!),
      xScale,
      MIN_TICK_SPACING_PX,
    );
  }

  return thinTimeTicks(
    xScale.ticks(d3.timeMonth.every(1)!),
    xScale,
    MIN_TICK_SPACING_PX,
  );
}

export function formatAxisTick(date: Date, interval: AxisTickInterval): string {
  if (interval === "year") {
    return d3.timeFormat("%Y")(date);
  }

  return d3.timeFormat("%b")(date);
}

export function isYearZoomTick(_date: Date, interval: AxisTickInterval): boolean {
  return interval === "year";
}

export { MS_PER_YEAR };
