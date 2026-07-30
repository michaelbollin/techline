export type TooltipAlign = "center" | "start" | "end";

const TOOLTIP_BOUNDARY_PADDING = 12;

export function findTooltipBoundary(element: HTMLElement): HTMLElement {
  const dialog = element.closest("[role=\"dialog\"]");
  if (dialog instanceof HTMLElement) {
    const scrollRegion = dialog.querySelector(".overflow-y-auto");
    if (scrollRegion instanceof HTMLElement) {
      return scrollRegion;
    }

    return dialog;
  }

  const timeline = element.closest("section[aria-label=\"Interactive timeline\"]");
  if (timeline instanceof HTMLElement) {
    return timeline;
  }

  return document.documentElement;
}

export function resolveTooltipAlign(
  triggerRect: DOMRect,
  tooltipWidth: number,
  boundaryRect: DOMRect,
  padding = TOOLTIP_BOUNDARY_PADDING,
): TooltipAlign {
  const triggerCenterX = triggerRect.left + triggerRect.width / 2;
  const spaceLeft = triggerCenterX - boundaryRect.left - padding;
  const spaceRight = boundaryRect.right - triggerCenterX - padding;
  const halfTooltip = tooltipWidth / 2;

  if (halfTooltip <= spaceLeft && halfTooltip <= spaceRight) {
    return "center";
  }

  if (halfTooltip > spaceRight && spaceRight < spaceLeft) {
    return "end";
  }

  if (halfTooltip > spaceLeft && spaceLeft < spaceRight) {
    return "start";
  }

  return halfTooltip > spaceRight ? "end" : "start";
}

export function resolveTooltipAlignForElement(
  trigger: HTMLElement,
  tooltip: HTMLElement,
): TooltipAlign {
  const boundary = findTooltipBoundary(trigger);
  return resolveTooltipAlign(
    trigger.getBoundingClientRect(),
    tooltip.offsetWidth,
    boundary.getBoundingClientRect(),
  );
}
