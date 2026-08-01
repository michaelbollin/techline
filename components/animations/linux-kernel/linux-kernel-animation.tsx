"use client";

import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  blinkCursor,
  buildLinuxScene,
  appendTuxImage,
  drawTerminalChrome,
  drawTerminalCursor,
  drawTerminalLine,
  measureLineEndX,
} from "@/lib/animations/linux-kernel";
import { cn } from "@/lib/cn";

type LinuxKernelAnimationProps = {
  className?: string;
};

const LINE_DELAY_MS = 520;
const LOOP_PAUSE_MS = 1200;
const CURSOR_BLINKS = 5;
const SCENE_OPACITY = 0.38;

export function LinuxKernelAnimation({ className }: LinuxKernelAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      setSize({ width, height });
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || size.width <= 0 || size.height <= 0 || !svgRef.current) {
      return;
    }

    const scene = buildLinuxScene(size.width, size.height);
    const svg = d3.select(svgRef.current);
    let cancelled = false;
    let lineTimer = 0;
    let loopTimer = 0;

    svg.selectAll("*").remove();

    const root = svg.append("g").attr("class", "scene").attr("opacity", SCENE_OPACITY);

    const terminalCenterX = scene.terminal.x + scene.terminal.width / 2;
    const terminalCenterY = scene.terminal.y + scene.terminal.height / 2;

    const terminalWrap = root
      .append("g")
      .attr("class", "terminal-wrap")
      .attr("transform", `translate(${terminalCenterX},${terminalCenterY}) scale(0)`)
      .attr("opacity", 0);

    const terminalGroup = terminalWrap
      .append("g")
      .attr("class", "terminal")
      .attr("transform", `translate(${-terminalCenterX},${-terminalCenterY})`);
    const penguinGroup = root
      .append("g")
      .attr("class", "penguin")
      .attr("transform", `translate(${scene.penguin.x},${scene.penguin.y}) scale(0)`)
      .attr("opacity", 0);

    const textLayout = drawTerminalChrome(terminalGroup, scene.terminal, scene.strokeWidth);
    const linesGroup = terminalGroup.append("g").attr("class", "lines").attr("opacity", 0);

    appendTuxImage(penguinGroup, scene.penguin.width, scene.penguin.height);

    const stopAll = () => {
      root.interrupt();
      terminalWrap.interrupt();
      penguinGroup.interrupt();
      linesGroup.interrupt();
      terminalGroup.selectAll(".terminal-cursor").interrupt();
    };

    const typeLines = (onDone: () => void) => {
      linesGroup.selectAll("*").remove();
      linesGroup.attr("opacity", 1);

      let lineIndex = 0;

      const typeNext = () => {
        if (cancelled) {
          return;
        }

        if (lineIndex >= scene.terminalLines.length) {
          const lastLineGroup = linesGroup.select<SVGGElement>("g:last-child");
          const textNode = lastLineGroup.select<SVGTextElement>("text").node();
          const cursorY = textLayout.textY + (scene.terminalLines.length - 1) * scene.lineHeight;
          const cursorX = textNode
            ? measureLineEndX(textNode, scene.fontSize * 0.15)
            : textLayout.textX;
          const cursorGroup = linesGroup.append("g");
          drawTerminalCursor(cursorGroup, cursorX, cursorY, scene.fontSize);
          const cursor = cursorGroup.select<SVGRectElement>(".terminal-cursor");
          if (!cursor.empty()) {
            blinkCursor(cursor, () => cancelled, CURSOR_BLINKS, () => {
              if (!cancelled) {
                onDone();
              }
            });
          } else {
            onDone();
          }
          return;
        }

        const lineGroup = linesGroup.append("g").attr("opacity", 0);
        drawTerminalLine(
          lineGroup,
          scene.terminalLines[lineIndex]!,
          textLayout.textX,
          textLayout.textY + lineIndex * scene.lineHeight,
          scene.fontSize,
        );

        lineGroup
          .transition()
          .duration(180)
          .ease(d3.easeBackOut.overshoot(1.4))
          .attr("opacity", 1);

        lineIndex += 1;
        lineTimer = window.setTimeout(typeNext, LINE_DELAY_MS);
      };

      typeNext();
    };

    const runLoop = () => {
      if (cancelled) {
        return;
      }

      stopAll();
      linesGroup.selectAll("*").remove();
      linesGroup.attr("opacity", 0);

      terminalWrap
        .attr("transform", `translate(${terminalCenterX},${terminalCenterY}) scale(0)`)
        .attr("opacity", 0)
        .transition()
        .duration(420)
        .ease(d3.easeBackOut.overshoot(1.5))
        .attr("transform", `translate(${terminalCenterX},${terminalCenterY}) scale(1)`)
        .attr("opacity", 1)
        .on("end", () => {
          if (cancelled) {
            return;
          }

          penguinGroup
            .attr("transform", `translate(${scene.penguin.x},${scene.penguin.y}) scale(0)`)
            .attr("opacity", 0)
            .transition()
            .delay(120)
            .duration(480)
            .ease(d3.easeBackOut.overshoot(1.8))
            .attr("transform", `translate(${scene.penguin.x},${scene.penguin.y}) scale(1)`)
            .attr("opacity", 1)
            .on("end", () => {
              if (cancelled) {
                return;
              }

              const waddle = () => {
                if (cancelled) {
                  return;
                }

                penguinGroup
                  .transition()
                  .duration(600)
                  .ease(d3.easeSinInOut)
                  .attr(
                    "transform",
                    `translate(${scene.penguin.x + scene.penguin.width * 0.04},${scene.penguin.y}) scale(1) rotate(3)`,
                  )
                  .transition()
                  .duration(600)
                  .ease(d3.easeSinInOut)
                  .attr(
                    "transform",
                    `translate(${scene.penguin.x - scene.penguin.width * 0.04},${scene.penguin.y}) scale(1) rotate(-3)`,
                  )
                  .on("end", () => {
                    if (!cancelled) {
                      waddle();
                    }
                  });
              };

              waddle();
              typeLines(() => {
                if (cancelled) {
                  return;
                }

                loopTimer = window.setTimeout(() => {
                  root
                    .transition()
                    .duration(LOOP_PAUSE_MS)
                    .attr("opacity", 0)
                    .on("end", () => {
                      if (!cancelled) {
                        root.attr("opacity", SCENE_OPACITY);
                        runLoop();
                      }
                    });
                }, 400);
              });
            });
        });
    };

    runLoop();

    return () => {
      cancelled = true;
      window.clearTimeout(lineTimer);
      window.clearTimeout(loopTimer);
      stopAll();
      svg.selectAll("*").remove();
    };
  }, [prefersReducedMotion, size.width, size.height]);

  if (prefersReducedMotion) {
    return (
      <div
        ref={containerRef}
        className={cn(
          "absolute inset-0 bg-[radial-gradient(circle_at_45%_55%,rgba(74,222,128,0.07),transparent_55%)]",
          className,
        )}
        aria-hidden
      />
    );
  }

  return (
    <div ref={containerRef} className={cn("absolute inset-0", className)} aria-hidden>
      <svg ref={svgRef} className="h-full w-full" width={size.width} height={size.height} />
    </div>
  );
}
