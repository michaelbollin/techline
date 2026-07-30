"use client";

import { cloneElement, isValidElement, useCallback, useId, useRef, useState, type ReactElement } from "react";

import { cn } from "@/lib/cn";
import { resolveTooltipAlignForElement, type TooltipAlign } from "@/lib/tooltip-align";

type TooltipSide = "top" | "bottom";

type TooltipProps = {
  label: string;
  side?: TooltipSide;
  align?: TooltipAlign | "auto";
  /** Multi-line tooltip with a max width instead of a single-line pill. */
  wrap?: boolean;
  className?: string;
  children: ReactElement<{ "aria-describedby"?: string }>;
};

const panelPosition: Record<TooltipAlign, Record<TooltipSide, string>> = {
  center: {
    top: "bottom-full left-1/2 mb-4 -translate-x-1/2 translate-y-1 group-hover/tooltip:translate-y-0 group-focus-within/tooltip:translate-y-0",
    bottom:
      "top-full left-1/2 mt-4 -translate-x-1/2 -translate-y-1 group-hover/tooltip:translate-y-0 group-focus-within/tooltip:translate-y-0",
  },
  start: {
    top: "bottom-full left-0 mb-4 translate-y-1 group-hover/tooltip:translate-y-0 group-focus-within/tooltip:translate-y-0",
    bottom:
      "top-full left-0 mt-4 -translate-y-1 group-hover/tooltip:translate-y-0 group-focus-within/tooltip:translate-y-0",
  },
  end: {
    top: "bottom-full right-0 mb-4 translate-y-1 group-hover/tooltip:translate-y-0 group-focus-within/tooltip:translate-y-0",
    bottom:
      "top-full right-0 mt-4 -translate-y-1 group-hover/tooltip:translate-y-0 group-focus-within/tooltip:translate-y-0",
  },
};

export function Tooltip({
  label,
  side = "top",
  align = "center",
  wrap = false,
  className,
  children,
}: TooltipProps) {
  const id = useId();
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const [resolvedAlign, setResolvedAlign] = useState<TooltipAlign>("center");

  const updateAlign = useCallback(() => {
    if (align !== "auto") {
      return;
    }

    const trigger = triggerRef.current;
    const tooltip = tooltipRef.current;
    if (!trigger || !tooltip) {
      return;
    }

    setResolvedAlign(resolveTooltipAlignForElement(trigger, tooltip));
  }, [align]);

  if (!isValidElement(children)) {
    return children;
  }

  const activeAlign = align === "auto" ? resolvedAlign : align;

  return (
    <span
      className={cn("group/tooltip relative inline-flex", className)}
      onMouseEnter={align === "auto" ? updateAlign : undefined}
      onFocus={align === "auto" ? updateAlign : undefined}
    >
      <span ref={triggerRef} className="inline-flex">
        {cloneElement(children, {
          "aria-describedby": id,
        })}
      </span>
      <span
        id={id}
        ref={tooltipRef}
        role="tooltip"
        className={cn(
          "pointer-events-none absolute z-50 border border-black bg-white text-xs font-medium tracking-tight text-black shadow-[0_6px_20px_rgba(0,0,0,0.1)]",
          wrap
            ? "block w-max min-w-[12rem] max-w-[22rem] rounded-xl px-3 py-2 text-left leading-snug whitespace-normal"
            : "rounded-full px-3 py-1.5 whitespace-nowrap",
          "opacity-0 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "group-hover/tooltip:opacity-100 group-focus-within/tooltip:opacity-100",
          panelPosition[activeAlign][side],
        )}
      >
        {label}
      </span>
    </span>
  );
}
