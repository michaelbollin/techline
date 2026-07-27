import * as d3 from "d3";

import { TIMELINE_EXTENT, TIMELINE_INK, TIMELINE_YEAR_LABEL_OFFSET } from "@/lib/timeline/constants";

type TimelineAxisGridProps = {
  xScale: d3.ScaleTime<number, number>;
  width: number;
  axisY: number;
};

export function TimelineAxisGrid({ xScale, width, axisY }: TimelineAxisGridProps) {
  const [tMin, tMax] = TIMELINE_EXTENT;
  const ticks = xScale
    .ticks(Math.max(4, Math.floor(width / 100)))
    .filter((tick) => {
      const time = tick.getTime();
      return time >= tMin && time <= tMax;
    });
  const gridLineEnd = TIMELINE_YEAR_LABEL_OFFSET - 8;

  return (
    <g aria-hidden>
      {ticks.map((tick) => {
        const x = xScale(tick);
        if (x < 0 || x > width) {
          return null;
        }

        return (
          <g key={tick.getTime()}>
            <line
              x1={x}
              x2={x}
              y1={axisY}
              y2={axisY + gridLineEnd}
              stroke={TIMELINE_INK}
              strokeOpacity={0.1}
              strokeWidth={1}
            />
            <text
              x={x}
              y={axisY + TIMELINE_YEAR_LABEL_OFFSET}
              textAnchor="middle"
              fill={TIMELINE_INK}
              className="timeline-axis-year"
            >
              {d3.timeFormat("%Y")(tick)}
            </text>
          </g>
        );
      })}
    </g>
  );
}
