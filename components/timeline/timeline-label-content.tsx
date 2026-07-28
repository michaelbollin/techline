"use client";

import { useId } from "react";

import { ThemeIconGraphic } from "@/components/timeline/theme-icon";
import { bubbleLabelTitle } from "@/lib/timeline/measure-label";
import type { ThemeId } from "@/lib/timeline/event-theme";

type TimelineLabelContentProps = {
  title: string;
  themeId: ThemeId;
  width: number;
  height: number;
  paddingX: number;
  iconSize: number;
  iconGap: number;
  maxTextWidth: number;
  fontSizePx: number;
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
  maxTextWidth,
  fontSizePx,
  textClassName,
  iconClassName,
}: TimelineLabelContentProps) {
  const clipId = useId();
  const displayTitle = bubbleLabelTitle(title, maxTextWidth, fontSizePx);
  const contentLeft = paddingX;
  const iconScale = iconSize / 24;
  const iconY = (height - iconSize) / 2;
  const textX = contentLeft + iconSize + iconGap;
  const textWidth = Math.max(width - textX - paddingX, 0);

  return (
    <>
      <defs>
        <clipPath id={clipId}>
          <rect x={textX} y={0} width={textWidth} height={height} />
        </clipPath>
      </defs>
      <g
        className={iconClassName}
        transform={`translate(${contentLeft}, ${iconY}) scale(${iconScale})`}
      >
        <ThemeIconGraphic themeId={themeId} />
      </g>
      <text
        x={textX}
        y={height / 2}
        textAnchor="start"
        dominantBaseline="central"
        clipPath={`url(#${clipId})`}
        className={textClassName}
      >
        {displayTitle}
      </text>
    </>
  );
}
