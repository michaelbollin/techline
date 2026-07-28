import { ThemeIconGraphic } from "@/components/timeline/theme-icon";
import type { ThemeId } from "@/lib/timeline/event-theme";

type TimelineLabelContentProps = {
  title: string;
  themeId: ThemeId;
  width: number;
  height: number;
  paddingX: number;
  iconSize: number;
  iconGap: number;
  textClassName: string;
  iconClassName: string;
};

export function TimelineLabelContent({
  title,
  themeId,
  width,
  height,
  paddingX,
  iconSize,
  iconGap,
  textClassName,
  iconClassName,
}: TimelineLabelContentProps) {
  const contentLeft = paddingX;
  const iconScale = iconSize / 24;
  const iconY = (height - iconSize) / 2;
  const textX = contentLeft + iconSize + iconGap;
  const textWidth = Math.max(width - textX - paddingX, 0);

  return (
    <>
      <g
        className={iconClassName}
        transform={`translate(${contentLeft}, ${iconY}) scale(${iconScale})`}
      >
        <ThemeIconGraphic themeId={themeId} />
      </g>
      <text
        x={textX + textWidth / 2}
        y={height / 2}
        textAnchor="middle"
        dominantBaseline="central"
        className={textClassName}
      >
        {title}
      </text>
    </>
  );
}
