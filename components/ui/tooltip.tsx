"use client";

import { cloneElement, isValidElement, useId, type ReactElement } from "react";

import { cn } from "@/lib/cn";

type TooltipSide = "top" | "bottom";
type TooltipAlign = "center" | "start" | "end";

type TooltipProps = {
  label: string;
  side?: TooltipSide;
  align?: TooltipAlign;
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
    top: "bottom-full right-2 mb-4 translate-y-1 group-hover/tooltip:translate-y-0 group-focus-within/tooltip:translate-y-0",
    bottom:
      "top-full right-2 mt-4 -translate-y-1 group-hover/tooltip:translate-y-0 group-focus-within/tooltip:translate-y-0",
  },
};

export function Tooltip({
  label,
  side = "top",
  align = "center",
  className,
  children,
}: TooltipProps) {
  const id = useId();

  if (!isValidElement(children)) {
    return children;
  }

  return (
    <span className={cn("group/tooltip relative inline-flex", className)}>
      {cloneElement(children, {
        "aria-describedby": id,
      })}
      <span
        id={id}
        role="tooltip"
        className={cn(
          "pointer-events-none absolute z-50 whitespace-nowrap rounded-full border border-black bg-white px-3 py-1.5 text-xs font-medium tracking-tight text-black shadow-[0_6px_20px_rgba(0,0,0,0.1)]",
          "opacity-0 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "group-hover/tooltip:opacity-100 group-focus-within/tooltip:opacity-100",
          panelPosition[align][side],
        )}
      >
        {label}
      </span>
    </span>
  );
}
