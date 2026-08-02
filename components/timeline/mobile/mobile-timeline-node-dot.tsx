import { TIMELINE_INK } from "@/lib/timeline/constants";
import { mobileDotRadius, mobileHitRadius } from "@/lib/timeline/dot-metrics";
import { visualImportanceTier } from "@/lib/timeline/importance";
import type { PlottedEvent } from "@/lib/timeline/plot-data";

type MobileTimelineNodeDotProps = {
  event: PlottedEvent;
  yScale: (timestamp: number) => number;
  axisOffset?: number;
  getAxisX: (y: number) => number;
  showLabel: boolean;
  isOpening?: boolean;
  onClick: () => void;
};

export function MobileTimelineNodeDot({
  event,
  yScale,
  axisOffset = 0,
  getAxisX,
  showLabel,
  isOpening = false,
  onClick,
}: MobileTimelineNodeDotProps) {
  const y = yScale(event.timestamp) + axisOffset;
  const x = getAxisX(y);
  const filled = showLabel;
  const tier = visualImportanceTier(event.importance);
  const dotR = mobileDotRadius(event.importance, filled);
  const hitR = mobileHitRadius(event.importance);
  const spinR = dotR * 1.45;
  const spinCircumference = 2 * Math.PI * spinR;
  const spinStrokeWidth = tier === 0 ? 1.5 : 1.25;

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
      {isOpening && (
        <circle
          className="animate-timeline-dot-spin"
          cx={0}
          cy={0}
          r={spinR}
          fill="none"
          stroke={TIMELINE_INK}
          strokeWidth={spinStrokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${spinCircumference * 0.22} ${spinCircumference * 0.78}`}
          pointerEvents="none"
        />
      )}
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
