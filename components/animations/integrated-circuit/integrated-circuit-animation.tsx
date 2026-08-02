"use client";

import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  buildIcScene,
  drawCartoonComponent,
  drawGermaniumChip,
  getOrderedWires,
  PALETTE,
  parseWireGroupId,
  STROKE,
  wireGroupClass,
  wirePathForPhase,
  type IcWire,
  type SvgGroupSelection,
} from "@/lib/animations/integrated-circuit";
import { cn } from "@/lib/cn";

type IntegratedCircuitAnimationProps = {
  className?: string;
};

const SCENE_OPACITY = 0.44;
const WIRE_DURATION_MS = 380;
const WIRE_GAP_MS = 90;
const MOVE_MS = 1000;
const CHIP_FADE_MS = 320;
const HOLD_MS = 1000;
const LOOP_PAUSE_MS = 700;

function appendCartoonWire(group: SvgGroupSelection, wire: IcWire & { d: string }) {
  const wireGroup = group.append("g").attr("class", wireGroupClass(wire.id));

  wireGroup
    .append("path")
    .attr("class", "wire-outline")
    .attr("fill", "none")
    .attr("stroke", STROKE)
    .attr("stroke-linecap", "round")
    .attr("stroke-linejoin", "round")
    .attr("stroke-width", wire.strokeWidth * 1.55)
    .attr("d", wire.d);

  wireGroup
    .append("path")
    .attr("class", "wire")
    .attr("fill", "none")
    .attr("stroke", PALETTE.wire)
    .attr("stroke-linecap", "round")
    .attr("stroke-linejoin", "round")
    .attr("stroke-width", wire.strokeWidth)
    .attr("d", wire.d);
}

function prepareWireDash(path: SVGPathElement) {
  const length = path.getTotalLength();
  d3.select(path).attr("stroke-dasharray", `${length} ${length}`).attr("stroke-dashoffset", length);
  path.parentElement
    ?.querySelector<SVGPathElement>(".wire-outline")
    ?.setAttribute("stroke-dasharray", `${length} ${length}`);
  path.parentElement
    ?.querySelector<SVGPathElement>(".wire-outline")
    ?.setAttribute("stroke-dashoffset", String(length));
}

function resetWireGroup(group: SVGGElement, orderedWires: IcWire[], components: ReturnType<typeof buildIcScene>["components"]) {
  const wireId = parseWireGroupId(group.getAttribute("class"));
  const wire = orderedWires.find((item) => item.id === wireId);
  if (!wire) {
    return;
  }

  const pathD = wirePathForPhase(wire, components, "spread");
  const outline = group.querySelector<SVGPathElement>(".wire-outline");
  const inner = group.querySelector<SVGPathElement>(".wire");
  outline?.setAttribute("d", pathD);
  inner?.setAttribute("d", pathD);

  if (inner) {
    prepareWireDash(inner);
  }
}

export function IntegratedCircuitAnimation({ className }: IntegratedCircuitAnimationProps) {
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

    const scene = buildIcScene(size.width, size.height);
    const orderedWires = getOrderedWires(scene);
    const svg = d3.select(svgRef.current);
    let cancelled = false;
    let timer = 0;

    svg.selectAll("*").remove();

    const root = svg.append("g").attr("class", "scene").attr("opacity", SCENE_OPACITY);

    const chipGroup = root.append("g").attr("class", "chip-group").attr("opacity", 0);
    drawGermaniumChip(chipGroup, scene);

    const wiresGroup = root.append("g").attr("class", "wires");
    const componentsGroup = root.append("g").attr("class", "components");

    const componentSelection = componentsGroup
      .selectAll<SVGGElement, (typeof scene.components)[number]>("g.component")
      .data(scene.components, (component) => component.id)
      .enter()
      .append("g")
      .attr("class", "component")
      .attr("opacity", 0)
      .attr(
        "transform",
        (component) =>
          `translate(${component.spread.x},${component.spread.y}) scale(${scene.spreadScale})`,
      );

    drawCartoonComponent(componentSelection, scene.strokeWidth);

    for (const wire of orderedWires) {
      appendCartoonWire(wiresGroup, {
        ...wire,
        d: wirePathForPhase(wire, scene.components, "spread"),
      });
    }

    wiresGroup.selectAll<SVGPathElement, unknown>("path.wire").each(function prepareDash(this: SVGPathElement) {
      prepareWireDash(this);
    });

    const stopAll = () => {
      root.interrupt();
      componentSelection.interrupt();
      wiresGroup.interrupt();
      chipGroup.interrupt();
    };

    const resetScene = () => {
      componentSelection
        .attr("opacity", 0)
        .attr(
          "transform",
          (component) =>
            `translate(${component.spread.x},${component.spread.y}) scale(${scene.spreadScale})`,
        );

      wiresGroup.attr("opacity", 1);
      wiresGroup.selectAll<SVGGElement, unknown>("g").each(function resetGroup(this: SVGGElement) {
        resetWireGroup(this, orderedWires, scene.components);
      });

      chipGroup.attr("opacity", 0);
      chipGroup.select(".chip-glow").attr("opacity", 0);
      chipGroup.select(".oscillator-wave").attr("opacity", 0);
    };

    const drawWires = (onDone: () => void) => {
      let wireIndex = 0;

      const drawNext = () => {
        if (cancelled) {
          return;
        }

        if (wireIndex >= orderedWires.length) {
          onDone();
          return;
        }

        const wire = orderedWires[wireIndex]!;
        const wireGroup = wiresGroup.select<SVGGElement>(`g.${wireGroupClass(wire.id)}`);
        const inner = wireGroup.select<SVGPathElement>("path.wire");

        inner
          .transition()
          .duration(WIRE_DURATION_MS)
          .ease(d3.easeLinear)
          .attr("stroke-dashoffset", 0)
          .on("end", () => {
            wireGroup.select("path.wire-outline").attr("stroke-dashoffset", 0);
            if (cancelled) {
              return;
            }

            wireIndex += 1;
            timer = window.setTimeout(drawNext, WIRE_GAP_MS);
          });
      };

      drawNext();
    };

    const moveOntoChip = (onDone: () => void) => {
      chipGroup.transition().duration(CHIP_FADE_MS).attr("opacity", 1);

      componentSelection
        .transition()
        .delay(CHIP_FADE_MS * 0.4)
        .duration(MOVE_MS)
        .ease(d3.easeCubicInOut)
        .attr(
          "transform",
          (component) =>
            `translate(${component.nested.x},${component.nested.y}) scale(${scene.nestedScale})`,
        );

      for (const wire of orderedWires) {
        const wireGroup = wiresGroup.select<SVGGElement>(`g.${wireGroupClass(wire.id)}`);
        const spreadPath = wirePathForPhase(wire, scene.components, "spread");
        const nestedPath = wirePathForPhase(wire, scene.components, "nested");
        const outline = wireGroup.select<SVGPathElement>("path.wire-outline");
        const inner = wireGroup.select<SVGPathElement>("path.wire");

        inner
          .transition()
          .delay(CHIP_FADE_MS * 0.4)
          .duration(MOVE_MS)
          .ease(d3.easeCubicInOut)
          .attrTween("d", () => {
            const interpolator = d3.interpolateString(spreadPath, nestedPath);
            return (t) => {
              const pathD = interpolator(t);
              outline.attr("d", pathD);
              return pathD;
            };
          });
      }

      componentSelection
        .transition()
        .delay(CHIP_FADE_MS * 0.4 + MOVE_MS)
        .duration(1)
        .on("end", () => {
          if (cancelled) {
            return;
          }

          chipGroup
            .select(".chip-glow")
            .transition()
            .duration(280)
            .attr("opacity", 0.28)
            .transition()
            .duration(280)
            .attr("opacity", 0);

          const wave = chipGroup.select<SVGPathElement>(".oscillator-wave");
          const waveLength = wave.node()?.getTotalLength() ?? 0;
          wave
            .attr("stroke-dasharray", `${waveLength} ${waveLength}`)
            .attr("stroke-dashoffset", waveLength)
            .attr("opacity", 1)
            .transition()
            .duration(520)
            .ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0)
            .on("end", () => {
              if (!cancelled) {
                timer = window.setTimeout(onDone, HOLD_MS);
              }
            });
        });
    };

    const runLoop = () => {
      if (cancelled) {
        return;
      }

      stopAll();
      resetScene();

      componentSelection
        .transition()
        .duration(360)
        .ease(d3.easeBackOut.overshoot(1.7))
        .attr("opacity", 1)
        .on("end", () => {
          if (cancelled) {
            return;
          }

          drawWires(() => {
            if (cancelled) {
              return;
            }

            moveOntoChip(() => {
              if (cancelled) {
                return;
              }

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
            });
          });
        });
    };

    runLoop();

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      stopAll();
      svg.selectAll("*").remove();
    };
  }, [prefersReducedMotion, size.width, size.height]);

  if (prefersReducedMotion) {
    return (
      <div
        ref={containerRef}
        className={cn(
          "absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.06),transparent_55%)]",
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
