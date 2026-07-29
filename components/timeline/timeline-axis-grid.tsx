import * as d3 from "d3";

import { cn } from "@/lib/cn";
import {
  DECADE_BAND_GRADIENT_OPACITY_END,
  DECADE_BAND_GRADIENT_OPACITY_END_HOVER,
  DECADE_BAND_GRADIENT_OPACITY_START,
  DECADE_BAND_GRADIENT_OPACITY_START_HOVER,
  DECADE_BAND_VERTICAL_FADE_START,
  decadeBandBottomY,
  decadeLabelY,
  formatDecadeLabel,
  shouldShowDecadeBands,
  visibleDecadeStarts,
} from "@/lib/timeline/axis-decades";
import { buildDecadeBandPath } from "@/lib/timeline/axis-path";
import {
  axisTickInterval,
  axisTicks,
  formatAxisTick,
  isYearZoomTick,
  visibleTimeSpanMs,
} from "@/lib/timeline/axis-ticks";
import { TIMELINE_EXTENT, TIMELINE_INK, TIMELINE_YEAR_LABEL_OFFSET } from "@/lib/timeline/constants";

type TimelineAxisGridProps = {
  xScale: d3.ScaleTime<number, number>;
  width: number;
  getAxisY: (x: number) => number;
  onYearClick: (year: number) => void;
  onDecadeClick: (decadeStart: number) => void;
};

const TICK_HIT_WIDTH = 36;
const TICK_HIT_HEIGHT = 28;
/** Space between grid line end and year label baseline (px). */
const YEAR_GRID_LINE_LABEL_GAP = 14;

export function TimelineAxisGrid({
  xScale,
  width,
  getAxisY,
  onYearClick,
  onDecadeClick,
}: TimelineAxisGridProps) {
  const [tMin, tMax] = TIMELINE_EXTENT;
  const spanMs = visibleTimeSpanMs(xScale, width);
  const interval = axisTickInterval(spanMs);
  const showDecades = shouldShowDecadeBands(spanMs, interval);
  const ticks = axisTicks(xScale, width).filter((tick) => {
    const time = tick.getTime();
    return time >= tMin && time <= tMax;
  });
  const baseAxisY = getAxisY(0);
  const bandBottomY = decadeBandBottomY(baseAxisY);
  const yearLabelY = baseAxisY + TIMELINE_YEAR_LABEL_OFFSET;
  const gridLineEndY = yearLabelY - YEAR_GRID_LINE_LABEL_GAP;
  const decades = showDecades ? visibleDecadeStarts(xScale, width) : [];

  return (
    <g>
      {showDecades ? (
        <defs>
          <linearGradient id="timeline-decade-band-fill" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={TIMELINE_INK} stopOpacity={DECADE_BAND_GRADIENT_OPACITY_START} />
            <stop offset="100%" stopColor={TIMELINE_INK} stopOpacity={DECADE_BAND_GRADIENT_OPACITY_END} />
          </linearGradient>
          <linearGradient id="timeline-decade-band-fill-hover" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={TIMELINE_INK} stopOpacity={DECADE_BAND_GRADIENT_OPACITY_START_HOVER} />
            <stop offset="100%" stopColor={TIMELINE_INK} stopOpacity={DECADE_BAND_GRADIENT_OPACITY_END_HOVER} />
          </linearGradient>
          <linearGradient
            id="timeline-decade-band-vertical-fade"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset={`${DECADE_BAND_VERTICAL_FADE_START * 100}%`} stopColor="#ffffff" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>
          <mask id="timeline-decade-band-mask" maskContentUnits="objectBoundingBox">
            <rect x="0" y="0" width="1" height="1" fill="url(#timeline-decade-band-vertical-fade)" />
          </mask>
        </defs>
      ) : null}

      {decades.map((decadeStart, index) => {
        const decadeStartDate = new Date(Date.UTC(decadeStart, 0, 1));
        const decadeEndDate = new Date(Date.UTC(decadeStart + 10, 0, 1));
        const x0 = xScale(decadeStartDate);
        const x1 = xScale(decadeEndDate);
        const decadeLeft = Math.max(x0, 0);
        const decadeRight = Math.min(x1, width);
        const isFirstBand = index === 0;
        const isLastBand = index === decades.length - 1;
        const left = isFirstBand ? 0 : decadeLeft;
        const right = isLastBand ? width : decadeRight;

        if (right - left < 8) {
          return null;
        }

        const labelX = (x0 + x1) / 2;
        const bandPath = buildDecadeBandPath(left, right, bandBottomY, getAxisY);

        return (
          <g key={decadeStart}>
            <path
              className="timeline-decade-band cursor-pointer"
              d={bandPath}
              mask="url(#timeline-decade-band-mask)"
              onClick={(event) => {
                event.stopPropagation();
                const visibleStartYear = xScale.invert(0).getUTCFullYear();
                const visibleEndYear = xScale.invert(width).getUTCFullYear();
                // #region agent log
                fetch("http://127.0.0.1:7352/ingest/5bfcc10a-fce2-49b9-8546-76ee58c2e162", {
                  method: "POST",
                  headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "db8903" },
                  body: JSON.stringify({
                    sessionId: "db8903",
                    runId: "post-fix",
                    hypothesisId: "A-D",
                    location: "timeline-axis-grid.tsx:decadeClick",
                    message: "decade band clicked",
                    data: {
                      decadeStart,
                      spanMs,
                      spanYears: spanMs / (365.25 * 86_400_000),
                      visibleStartYear,
                      visibleEndYear,
                      bandLeft: left,
                      bandRight: right,
                      decadeLeft,
                      decadeRight,
                      isFirstBand,
                      isLastBand,
                    },
                    timestamp: Date.now(),
                  }),
                }).catch(() => {});
                // #endregion
                onDecadeClick(decadeStart);
              }}
            />
            <text
              x={labelX}
              y={decadeLabelY(bandBottomY)}
              textAnchor="middle"
              fill={TIMELINE_INK}
              className="pointer-events-none font-sans text-2xl font-medium tracking-wide opacity-20"
            >
              {formatDecadeLabel(decadeStart)}
            </text>
          </g>
        );
      })}

      {ticks.map((tick, index) => {
        const x = xScale(tick);
        if (x < 0 || x > width) {
          return null;
        }

        const tickAxisY = getAxisY(x);

        const label = formatAxisTick(tick, interval, ticks[index - 1]);
        const year = tick.getUTCFullYear();
        const canZoomYear = isYearZoomTick(tick, interval);

        return (
          <g key={tick.getTime()}>
            <line
              x1={x}
              x2={x}
              y1={tickAxisY}
              y2={gridLineEndY}
              stroke={TIMELINE_INK}
              strokeOpacity={0.1}
              strokeWidth={1}
              aria-hidden
            />
            {canZoomYear ? (
              <rect
                className="peer cursor-pointer"
                x={x - TICK_HIT_WIDTH / 2}
                y={yearLabelY - TICK_HIT_HEIGHT + 6}
                width={TICK_HIT_WIDTH}
                height={TICK_HIT_HEIGHT}
                fill="transparent"
                onClick={(event) => {
                  event.stopPropagation();
                  onYearClick(year);
                }}
              />
            ) : null}
            <text
              x={x}
              y={yearLabelY}
              textAnchor="middle"
              fill={TIMELINE_INK}
              className={cn(
                "pointer-events-none font-sans font-medium",
                canZoomYear
                  ? "text-xs tracking-wider opacity-50 peer-hover:opacity-100"
                  : "text-xs tracking-wide",
              )}
              pointerEvents="none"
            >
              {label}
            </text>
          </g>
        );
      })}
    </g>
  );
}
