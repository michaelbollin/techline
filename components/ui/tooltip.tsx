"use client";

import {
  cloneElement,
  isValidElement,
  useCallback,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactElement,
} from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/cn";
import { resolveTooltipAlignForElement, type TooltipAlign } from "@/lib/tooltip-align";
import {
  needsFixedTooltipPosition,
  resolveTooltipFixedLeft,
  resolveTooltipFixedTop,
  tooltipMaxWidth,
  type TooltipSide,
} from "@/lib/tooltip-position";

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

const panelClassName =
  "pointer-events-none border border-black bg-white text-xs font-medium tracking-tight text-black shadow-[0_6px_20px_rgba(0,0,0,0.1)] max-w-[min(22rem,calc(100vw-1.5rem))]";

type FixedCoords = {
  top: number;
  left: number;
  maxWidth: number;
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
  const fixedActiveRef = useRef(false);
  const [resolvedAlign, setResolvedAlign] = useState<TooltipAlign>("center");
  const [fixedOpen, setFixedOpen] = useState(false);
  const [fixedCoords, setFixedCoords] = useState<FixedCoords | null>(null);

  const updateInlineAlign = useCallback(() => {
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

  const updateFixedPosition = useCallback(() => {
    const trigger = triggerRef.current;
    const tooltip = tooltipRef.current;
    if (!trigger || !tooltip) {
      return;
    }

    const maxWidth = tooltipMaxWidth(window.innerWidth);
    tooltip.style.maxWidth = `${maxWidth}px`;

    const triggerRect = trigger.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const left = resolveTooltipFixedLeft(triggerRect, tooltipRect.width, window.innerWidth);
    const top = resolveTooltipFixedTop(triggerRect, tooltipRect.height, side);

    setFixedCoords({ top, left, maxWidth });
  }, [side]);

  const handleShow = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) {
      return;
    }

    if (needsFixedTooltipPosition(trigger)) {
      fixedActiveRef.current = true;
      setFixedOpen(true);
      return;
    }

    fixedActiveRef.current = false;
    updateInlineAlign();
  }, [updateInlineAlign]);

  const handleHide = useCallback(() => {
    if (!fixedActiveRef.current) {
      return;
    }

    fixedActiveRef.current = false;
    setFixedOpen(false);
    setFixedCoords(null);
  }, []);

  useLayoutEffect(() => {
    if (!fixedOpen) {
      return;
    }

    updateFixedPosition();

    const onLayoutChange = () => updateFixedPosition();
    window.addEventListener("scroll", onLayoutChange, true);
    window.addEventListener("resize", onLayoutChange);

    return () => {
      window.removeEventListener("scroll", onLayoutChange, true);
      window.removeEventListener("resize", onLayoutChange);
    };
  }, [fixedOpen, label, wrap, updateFixedPosition]);

  if (!isValidElement(children)) {
    return children;
  }

  const activeAlign = align === "auto" ? resolvedAlign : align;
  const tooltipBodyClassName = cn(
    panelClassName,
    wrap
      ? "block w-max min-w-[12rem] rounded-xl px-3 py-2 text-left leading-snug whitespace-normal"
      : "rounded-full px-3 py-1.5 whitespace-nowrap sm:whitespace-nowrap max-sm:whitespace-normal",
  );

  const fixedTooltip =
    fixedOpen && typeof document !== "undefined"
      ? createPortal(
          <span
            id={id}
            ref={tooltipRef}
            role="tooltip"
            className={cn(
              tooltipBodyClassName,
              "fixed z-[100] transition-opacity duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
              fixedCoords ? "opacity-100" : "opacity-0",
            )}
            style={{
              top: fixedCoords?.top ?? 0,
              left: fixedCoords?.left ?? 0,
              maxWidth: fixedCoords?.maxWidth ?? tooltipMaxWidth(window.innerWidth),
            }}
          >
            {label}
          </span>,
          document.body,
        )
      : null;

  return (
    <span
      className={cn("group/tooltip relative inline-flex", className)}
      onMouseEnter={handleShow}
      onMouseLeave={handleHide}
      onFocus={handleShow}
      onBlur={handleHide}
    >
      <span ref={triggerRef} className="inline-flex">
        {cloneElement(children, {
          "aria-describedby": id,
        })}
      </span>
      {!fixedOpen && (
        <span
          id={id}
          ref={tooltipRef}
          role="tooltip"
          className={cn(
            tooltipBodyClassName,
            "absolute z-50",
            "opacity-0 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
            "group-hover/tooltip:opacity-100 group-focus-within/tooltip:opacity-100",
            panelPosition[activeAlign][side],
          )}
        >
          {label}
        </span>
      )}
      {fixedTooltip}
    </span>
  );
}
