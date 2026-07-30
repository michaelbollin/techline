"use client";

import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  buildTransistorSchematic,
  getOrderedPaths,
  PALETTE,
  type TransistorElectron,
} from "@/lib/animations/transistor";
import { cn } from "@/lib/cn";

type TransistorAnimationProps = {
  className?: string;
};

const STROKE_OPACITY = 0.38;
const PATH_DURATION_MS = 380;
const PATH_GAP_MS = 80;
const LOOP_PAUSE_MS = 700;

function strokeColor(kind: "body" | "lead" | "arrow"): string {
  if (kind === "body") {
    return PALETTE.body;
  }

  return PALETTE.lead;
}

function animateElectron(
  selection: d3.Selection<SVGCircleElement, TransistorElectron, SVGGElement, unknown>,
  onComplete: () => void,
): void {
  selection.each(function animate(this: SVGCircleElement, electron) {
    const pathNode = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathNode.setAttribute("d", electron.d);
    const length = pathNode.getTotalLength();

    const circle = d3.select(this);
    circle
      .attr("opacity", 0)
      .transition()
      .delay(electron.delayMs)
      .duration(120)
      .attr("opacity", 0.75)
      .transition()
      .duration(electron.durationMs)
      .ease(d3.easeCubicInOut)
      .attrTween("cx", () => {
        return (t) => String(pathNode.getPointAtLength(t * length).x);
      })
      .attrTween("cy", () => {
        return (t) => String(pathNode.getPointAtLength(t * length).y);
      })
      .transition()
      .duration(180)
      .attr("opacity", 0)
      .on("end", onComplete);
  });
}

export function TransistorAnimation({ className }: TransistorAnimationProps) {
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

    const schematic = buildTransistorSchematic(size.width, size.height);
    const orderedPaths = getOrderedPaths(schematic);
    const svg = d3.select(svgRef.current);
    const scene = svg.select<SVGGElement>("g.scene");

    scene.selectAll("rect.slab").remove();
    scene
      .append("rect")
      .attr("class", "slab")
      .attr("x", schematic.slab.x)
      .attr("y", schematic.slab.y)
      .attr("width", schematic.slab.width)
      .attr("height", schematic.slab.height)
      .attr("rx", schematic.slab.rx)
      .attr("fill", PALETTE.slab)
      .attr("opacity", 0);

    const pathSelection = scene
      .selectAll<SVGPathElement, (typeof orderedPaths)[number]>("path.lead")
      .data(orderedPaths, (path) => path.id);

    pathSelection.exit().remove();

    const paths = pathSelection
      .enter()
      .append("path")
      .attr("class", "lead")
      .attr("fill", "none")
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .merge(pathSelection)
      .attr("d", (path) => path.d)
      .attr("stroke", (path) => strokeColor(path.kind))
      .attr("stroke-width", (path) => path.strokeWidth)
      .attr("opacity", STROKE_OPACITY);

    scene.selectAll("circle.junction").remove();
    const junction = scene
      .append("circle")
      .attr("class", "junction")
      .attr("cx", schematic.junction.x)
      .attr("cy", schematic.junction.y)
      .attr("r", schematic.junctionRadius)
      .attr("fill", PALETTE.junction)
      .attr("opacity", 0);

    const electronSelection = scene
      .selectAll<SVGCircleElement, TransistorElectron>("circle.electron")
      .data(schematic.electrons, (electron) => electron.id);

    electronSelection.exit().remove();

    const electrons = electronSelection
      .enter()
      .append("circle")
      .attr("class", "electron")
      .attr("r", schematic.electronRadius)
      .attr("fill", PALETTE.electron)
      .merge(electronSelection);

    paths.each(function prepareDash() {
      const length = this.getTotalLength();
      d3.select(this).attr("stroke-dasharray", `${length} ${length}`).attr("stroke-dashoffset", length);
    });

    let pathIndex = 0;
    let gapTimer = 0;
    let loopTimer = 0;
    let cancelled = false;
    let electronCompletions = 0;

    const resetElectrons = () => {
      electronCompletions = 0;
      electrons.interrupt().attr("opacity", 0);
    };

    const runElectrons = () => {
      resetElectrons();

      const onElectronEnd = () => {
        if (cancelled) {
          return;
        }

        electronCompletions += 1;
        if (electronCompletions >= schematic.electrons.length) {
          loopTimer = window.setTimeout(() => {
            if (!cancelled) {
              restart();
            }
          }, LOOP_PAUSE_MS);
        }
      };

      animateElectron(electrons, onElectronEnd);
    };

    const restart = () => {
      pathIndex = 0;
      resetElectrons();
      junction.interrupt().attr("opacity", 0);
      scene.select("rect.slab").interrupt().attr("opacity", 0);
      paths.interrupt();
      paths.each(function resetDash() {
        const length = this.getTotalLength();
        d3.select(this).attr("stroke-dashoffset", length);
      });
      scene.interrupt().attr("opacity", 1);
      drawNext();
    };

    const drawNext = () => {
      if (cancelled) {
        return;
      }

      if (pathIndex >= orderedPaths.length) {
        scene
          .select("rect.slab")
          .transition()
          .duration(280)
          .attr("opacity", 1);

        junction
          .transition()
          .duration(220)
          .attr("opacity", 0.55)
          .on("end", () => {
            if (!cancelled) {
              loopTimer = window.setTimeout(runElectrons, 120);
            }
          });
        return;
      }

      const path = orderedPaths[pathIndex];
      const selection = paths.filter((item) => item.id === path.id);

      selection
        .transition()
        .duration(PATH_DURATION_MS)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0)
        .on("end", () => {
          if (cancelled) {
            return;
          }

          pathIndex += 1;
          gapTimer = window.setTimeout(drawNext, PATH_GAP_MS);
        });
    };

    drawNext();

    return () => {
      cancelled = true;
      window.clearTimeout(gapTimer);
      window.clearTimeout(loopTimer);
      svg.selectAll("*").interrupt();
    };
  }, [prefersReducedMotion, size.width, size.height]);

  if (prefersReducedMotion) {
    return (
      <div
        ref={containerRef}
        className={cn(
          "absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.05),transparent_55%)]",
          className,
        )}
        aria-hidden
      />
    );
  }

  return (
    <div ref={containerRef} className={cn("absolute inset-0", className)} aria-hidden>
      <svg ref={svgRef} className="h-full w-full" width={size.width} height={size.height}>
        <g className="scene" />
      </svg>
    </div>
  );
}
