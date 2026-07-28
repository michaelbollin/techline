import { cn } from "@/lib/cn";
import { TIMELINE_INK } from "@/lib/timeline/constants";
import { visualImportanceTier } from "@/lib/timeline/importance";
import type { PlottedEvent } from "@/lib/timeline/plot-data";

type MobileTimelineNodeDotProps = {
  event: PlottedEvent;
  yScale: (timestamp: number) => number;
  getAxisX: (y: number) => number;
  showLabel: boolean;
  onClick: () => void;
};

function hitRadius(importance: PlottedEvent["importance"]): number {
  const tier = visualImportanceTier(importance);

  if (tier === 0) {
    return 10;
  }

  if (tier === 1) {
    return 8;
  }

  return 6;
}

function dotRadius(importance: PlottedEvent["importance"], filled: boolean): number {
  const tier = visualImportanceTier(importance);

  if (filled) {
    if (tier === 0) {
      return 7;
    }

    if (tier === 1) {
      return 5.5;
    }

    return 4;
  }

  if (tier === 0) {
    return 3.5;
  }

  if (tier === 1) {
    return 3;
  }

  return 2.25;
}

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
  const dotR = dotRadius(event.importance, filled);
  const hitR = hitRadius(event.importance);

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
