import { TIMELINE_INK } from "@/lib/timeline/constants";
import { mobileDotRadius, mobileHitRadius } from "@/lib/timeline/dot-metrics";
import { visualImportanceTier } from "@/lib/timeline/importance";
import type { PlottedEvent } from "@/lib/timeline/plot-data";

type MobileTimelineNodeDotProps = {
  event: PlottedEvent;
  yScale: (timestamp: number) => number;
  getAxisX: (y: number) => number;
  showLabel: boolean;
  onClick: () => void;
};

export function MobileTimelineNodeDot({
  event,
  yScale,
  getAxisX,
  showLabel,
  onClick,
}: MobileTimelineNodeDotProps) {
  const y = yScale(event.timestamp);
  const x = getAxisX(y);
  const filled = showLabel;
  const tier = visualImportanceTier(event.importance);
  const dotR = mobileDotRadius(event.importance, filled);
  const hitR = mobileHitRadius(event.importance);

  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle
        className="cursor-pointer outline-none"
        cx={0}
        cy={0}
        r={hitR}
        fill="transparent"
        onClick={(pointerEvent) => {
          pointerEvent.stopPropagation();
          onClick();
        }}
        tabIndex={0}
        role="button"
        aria-label={`${event.title}, ${event.dateLabel}`}
      />
      <circle
        cx={0}
        cy={0}
        r={dotR}
        fill={TIMELINE_INK}
        stroke={TIMELINE_INK}
        strokeWidth={filled ? (tier === 0 ? 2 : 1.5) : tier === 0 ? 1 : 0.75}
        pointerEvents="none"
      />
    </g>
  );
}
