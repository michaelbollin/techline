"use client";

import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { buildGitGraph, getOrderedLinks, PALETTE } from "@/lib/animations/git-branches/graph";
import { cn } from "@/lib/cn";

type GitBranchesAnimationProps = {
  className?: string;
};

const STROKE_OPACITY = 0.28;
const MAIN_DURATION_MS = 1400;
const BRANCH_DURATION_MS = 520;
const BRANCH_GAP_MS = 120;
const LOOP_PAUSE_MS = 900;

export function GitBranchesAnimation({ className }: GitBranchesAnimationProps) {
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

    const graph = buildGitGraph(size.width, size.height);
    const orderedLinks = getOrderedLinks(graph);
    const svg = d3.select(svgRef.current);
    const scene = svg.select<SVGGElement>("g.scene");

    scene.selectAll("text.master-label").remove();
    scene
      .append("text")
      .attr("class", "master-label")
      .attr("x", graph.masterLabel.x)
      .attr("y", graph.masterLabel.y)
      .attr("fill", PALETTE[0])
      .attr("opacity", 0.45)
      .attr("font-size", 11)
      .attr("font-family", "ui-monospace, SFMono-Regular, Menlo, monospace")
      .attr("font-weight", 600)
      .text("master");

    const linkSelection = scene
      .selectAll<SVGPathElement, (typeof orderedLinks)[number]>("path.link")
      .data(orderedLinks, (link) => link.id);

    linkSelection.exit().remove();

    const links = linkSelection
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .merge(linkSelection)
      .attr("d", (link) => link.d)
      .attr("stroke", (link) => link.stroke)
      .attr("stroke-width", (link) => link.strokeWidth)
      .attr("opacity", STROKE_OPACITY);

    const nodeSelection = scene
      .selectAll<SVGGElement, (typeof graph.nodes)[number]>("g.node")
      .data(graph.nodes, (node) => node.id);

    nodeSelection.exit().remove();

    const nodeEnter = nodeSelection.enter().append("g").attr("class", "node").attr("opacity", 0);

    nodeEnter.append("circle").attr("class", "node-core");
    nodeEnter.append("circle").attr("class", "node-ring").attr("fill", "none");

    const nodes = nodeEnter.merge(nodeSelection);

    nodes
      .select(".node-core")
      .attr("fill", (node) => PALETTE[node.colorIndex % PALETTE.length] ?? PALETTE[0]);

    nodes
      .select(".node-ring")
      .attr("stroke", (node) => PALETTE[node.colorIndex % PALETTE.length] ?? PALETTE[0])
      .attr("stroke-width", (node) => (node.role === "merge" ? 2.5 : 1.5));

    links.each(function prepareDash() {
      const length = this.getTotalLength();
      d3.select(this).attr("stroke-dasharray", `${length} ${length}`).attr("stroke-dashoffset", length);
    });

    let linkIndex = 0;
    let gapTimer = 0;
    let cancelled = false;
    const visibleNodeIds = new Set<string>();

    const showNode = (nodeId: string) => {
      if (visibleNodeIds.has(nodeId)) {
        return;
      }

      visibleNodeIds.add(nodeId);

      const node = graph.nodes.find((item) => item.id === nodeId);
      if (!node) {
        return;
      }

      const selection = nodes.filter((item) => item.id === nodeId);
      const coreOpacity = node.role === "merge" ? 0.55 : node.role === "fork" ? 0.48 : 0.4;
      const ringOpacity = node.role === "merge" ? 0.7 : 0.45;

      selection
        .select(".node-core")
        .attr("cx", node.cx)
        .attr("cy", node.cy)
        .attr("r", node.r);

      selection
        .select(".node-ring")
        .attr("cx", node.cx)
        .attr("cy", node.cy)
        .attr("r", node.r + (node.role === "merge" ? 4 : 2))
        .attr("opacity", 0);

      selection
        .transition()
        .duration(160)
        .attr("opacity", 1);

      selection
        .select(".node-core")
        .transition()
        .duration(160)
        .attr("opacity", coreOpacity);

      selection
        .select(".node-ring")
        .transition()
        .duration(200)
        .attr("opacity", ringOpacity);
    };

    const restart = () => {
      linkIndex = 0;
      visibleNodeIds.clear();
      nodes.interrupt().attr("opacity", 0);
      links.interrupt();
      links.each(function resetDash() {
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

      if (linkIndex >= orderedLinks.length) {
        scene
          .transition()
          .duration(LOOP_PAUSE_MS)
          .attr("opacity", 0)
          .on("end", () => {
            if (!cancelled) {
              restart();
            }
          });
        return;
      }

      const link = orderedLinks[linkIndex];
      const path = links.filter((item) => item.id === link.id);

      const duration = link.kind === "main" ? MAIN_DURATION_MS : BRANCH_DURATION_MS;
      const gap = link.kind === "main" ? BRANCH_GAP_MS : BRANCH_GAP_MS;

      path
        .transition()
        .duration(duration)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0)
        .on("end", () => {
          if (cancelled) {
            return;
          }

          if (link.kind === "main") {
            graph.nodes
              .filter((node) => node.lane === 0)
              .forEach((node) => showNode(node.id));
          } else {
            showNode(link.source.id);
            showNode(link.target.id);
          }

          linkIndex += 1;
          gapTimer = window.setTimeout(drawNext, gap);
        });
    };

    drawNext();

    return () => {
      cancelled = true;
      window.clearTimeout(gapTimer);
      svg.selectAll("*").interrupt();
    };
  }, [prefersReducedMotion, size.width, size.height]);

  if (prefersReducedMotion) {
    return (
      <div
        ref={containerRef}
        className={cn(
          "absolute inset-0 bg-[linear-gradient(90deg,rgba(148,163,184,0.04)_1px,transparent_1px)] bg-size-[8%_100%]",
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
