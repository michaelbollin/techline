import * as d3 from "d3";

import { cn } from "@/lib/cn";
import {
  axisTickInterval,
  axisTicks,
  formatAxisTick,
  isYearZoomTick,
} from "@/lib/timeline/axis-ticks";
import { TIMELINE_EXTENT, TIMELINE_INK } from "@/lib/timeline/constants";
import {
  MOBILE_YEAR_LABEL_X,
} from "@/lib/timeline/vertical/constants";

type MobileTimelineAxisGridProps = {
  yScale: d3.ScaleTime<number, number>;
  height: number;
  getAxisX: (y: number) => number;
  onYearClick: (year: number) => void;
};

const TICK_HIT_WIDTH = 40;
const TICK_HIT_HEIGHT = 28;

export function MobileTimelineAxisGrid({
  yScale,
  height,
  getAxisX,
  onYearClick,
}: MobileTimelineAxisGridProps) {
  const [tMin, tMax] = TIMELINE_EXTENT;
  const interval = axisTickInterval(
    Math.abs(yScale.invert(height).getTime() - yScale.invert(0).getTime()),
  );
  const ticks = axisTicks(yScale, height).filter((tick) => {
    const time = tick.getTime();
    return time >= tMin && time <= tMax;
  });
  const tickLineStart = MOBILE_YEAR_LABEL_X + 6;
  const labelX = MOBILE_YEAR_LABEL_X;

  return (
    <g>
      {ticks.map((tick, index) => {
        const y = yScale(tick);
        if (y < 0 || y > height) {
          return null;
        }

        const tickAxisX = getAxisX(y);
        const label = formatAxisTick(tick, interval, ticks[index - 1]);
        const year = tick.getUTCFullYear();
        const canZoomYear = isYearZoomTick(tick, interval);

        return (
          <g key={tick.getTime()}>
            <line
              x1={tickLineStart}
              x2={Math.max(tickLineStart + 4, tickAxisX)}
              y1={y}
              y2={y}
              stroke={TIMELINE_INK}
              strokeOpacity={0.1}
              strokeWidth={1}
              aria-hidden
            />
            {canZoomYear ? (
              <rect
                className="peer cursor-pointer"
                x={labelX - TICK_HIT_WIDTH + 8}
                y={y - TICK_HIT_HEIGHT / 2}
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
              x={labelX}
              y={y}
              textAnchor="end"
              dominantBaseline="middle"
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
