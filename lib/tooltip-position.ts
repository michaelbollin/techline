export const TOOLTIP_VIEWPORT_PADDING = 12;
export const TOOLTIP_MAX_WIDTH_WRAP = 352;

export type TooltipSide = "top" | "bottom";

/** True when the tooltip must escape clipping ancestors (mobile / SVG foreignObject). */
export function needsFixedTooltipPosition(trigger: HTMLElement): boolean {
  if (trigger.closest("foreignObject")) {
    return true;
  }

  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia("(max-width: 640px)").matches;
}

export function tooltipMaxWidth(
  viewportWidth: number,
  padding = TOOLTIP_VIEWPORT_PADDING,
): number {
  return Math.min(TOOLTIP_MAX_WIDTH_WRAP, viewportWidth - padding * 2);
}

export function resolveTooltipFixedLeft(
  triggerRect: DOMRect,
  tooltipWidth: number,
  viewportWidth: number,
  padding = TOOLTIP_VIEWPORT_PADDING,
): number {
  const centered = triggerRect.left + triggerRect.width / 2 - tooltipWidth / 2;

  return Math.max(padding, Math.min(centered, viewportWidth - tooltipWidth - padding));
}

export function resolveTooltipFixedTop(
  triggerRect: DOMRect,
  tooltipHeight: number,
  side: TooltipSide,
  gap = 8,
): number {
  if (side === "top") {
    return triggerRect.top - tooltipHeight - gap;
  }

  return triggerRect.bottom + gap;
}
