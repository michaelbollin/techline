import * as d3 from "d3";

import { cn } from "@/lib/cn";
import {
  axisTickInterval,
  axisTicks,
  formatAxisTick,
  isYearZoomTick,
} from "@/lib/timeline/axis-ticks";
import { TIMELINE_EXTENT, TIMELINE_INK, TIMELINE_YEAR_LABEL_OFFSET } from "@/lib/timeline/constants";

type TimelineAxisGridProps = {
  xScale: d3.ScaleTime<number, number>;
  width: number;
  getAxisY: (x: number) => number;
  onYearClick: (year: number) => void;
};

const TICK_HIT_WIDTH = 36;
const TICK_HIT_HEIGHT = 28;

export function TimelineAxisGrid({ xScale, width, getAxisY, onYearClick }: TimelineAxisGridProps) {
  const [tMin, tMax] = TIMELINE_EXTENT;
  const interval = axisTickInterval(
    Math.abs(xScale.invert(width).getTime() - xScale.invert(0).getTime()),
  );
  const ticks = axisTicks(xScale, width).filter((tick) => {
    const time = tick.getTime();
    return time >= tMin && time <= tMax;
  });
  const gridLineEnd = TIMELINE_YEAR_LABEL_OFFSET - 8;
  const baseAxisY = getAxisY(0);
  const labelY = baseAxisY + TIMELINE_YEAR_LABEL_OFFSET;

  return (
    <g>
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
              y2={tickAxisY + gridLineEnd}
              stroke={TIMELINE_INK}
              strokeOpacity={0.1}
              strokeWidth={1}
              aria-hidden
            />
            {canZoomYear ? (
              <rect
                className="peer cursor-pointer"
                x={x - TICK_HIT_WIDTH / 2}
                y={labelY - TICK_HIT_HEIGHT + 6}
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
              y={labelY}
              textAnchor="middle"
              fill={TIMELINE_INK}
              className={cn(
                "pointer-events-none font-sans font-medium",
                canZoomYear
                  ? "text-xs tracking-wider peer-hover:opacity-55"
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
