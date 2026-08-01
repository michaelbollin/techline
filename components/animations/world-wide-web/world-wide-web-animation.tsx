"use client";

import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  buildWebGraph,
  drawWebIcon,
  getNodeById,
  getOrderedLinks,
} from "@/lib/animations/world-wide-web";
import { cn } from "@/lib/cn";

type WorldWideWebAnimationProps = {
  className?: string;
};

const LINK_DURATION_MS = 420;
const LINK_GAP_MS = 70;
const LOOP_PAUSE_MS = 650;

export function WorldWideWebAnimation({ className }: WorldWideWebAnimationProps) {
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

    const graph = buildWebGraph(size.width, size.height);
    const orderedLinks = getOrderedLinks(graph);
    const strokeWidth = graph.links[0]?.strokeWidth ?? 5;
    const svg = d3.select(svgRef.current);

    svg.selectAll("*").remove();

    const scene = svg.append("g").attr("class", "scene");

    const defs = svg.append("defs");
    const shadow = defs
      .append("filter")
      .attr("id", "www-cartoon-shadow")
      .attr("x", "-30%")
      .attr("y", "-30%")
      .attr("width", "160%")
      .attr("height", "160%");

    shadow.append("feDropShadow").attr("dx", 0).attr("dy", 4).attr("stdDeviation", 5).attr("flood-opacity", 0.18);

    const dots = scene.append("g").attr("class", "dots").attr("opacity", 0.12);
    const step = Math.max(28, Math.min(size.width, size.height) * 0.05);

    for (let x = step; x < size.width; x += step) {
      for (let y = step; y < size.height; y += step) {
        dots.append("circle").attr("cx", x).attr("cy", y).attr("r", 2).attr("fill", "#111827");
      }
    }

    const links = scene
      .selectAll<SVGPathElement, (typeof orderedLinks)[number]>("path.link")
      .data(orderedLinks, (link) => link.id)
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke-linecap", "round")
      .attr("d", (link) => link.d)
      .attr("stroke", (link) => link.stroke)
      .attr("stroke-width", (link) => link.strokeWidth)
      .attr("opacity", 0.85);

    const nodeEnter = scene
      .selectAll<SVGGElement, (typeof graph.nodes)[number]>("g.node")
      .data(graph.nodes, (node) => node.id)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("opacity", 0)
      .attr("transform", (node) => `translate(${node.cx},${node.cy}) scale(0)`);

    nodeEnter
      .append("rect")
      .attr("class", "node-box")
      .attr("x", (node) => -node.size / 2)
      .attr("y", (node) => -node.size / 2)
      .attr("width", (node) => node.size)
      .attr("height", (node) => node.size)
      .attr("rx", (node) => node.size * 0.18)
      .attr("fill", (node) => node.fill)
      .attr("stroke", (node) => node.stroke)
      .attr("stroke-width", (node) => (node.role === "hub" ? strokeWidth : strokeWidth * 0.85))
      .attr("filter", "url(#www-cartoon-shadow)");

    const iconLayer = nodeEnter.append("g").attr("class", "node-icon");

    iconLayer.each(function drawIcon(node) {
      drawWebIcon(d3.select(this), node.icon, node.size * 0.72, strokeWidth);
    });

    const nodes = nodeEnter;
    const hubNode = getNodeById(graph, "info-cern");

    if (hubNode) {
      nodes
        .filter((node) => node.id === hubNode.id)
        .attr("opacity", 1)
        .attr("transform", `translate(${hubNode.cx},${hubNode.cy}) scale(1)`);

      const hubSelection = nodes.filter((node) => node.id === hubNode.id);

      const pulseHub = () => {
        hubSelection
          .transition()
          .duration(900)
          .ease(d3.easeSinInOut)
          .attr("transform", `translate(${hubNode.cx},${hubNode.cy}) scale(1.06)`)
          .transition()
          .duration(900)
          .ease(d3.easeSinInOut)
          .attr("transform", `translate(${hubNode.cx},${hubNode.cy}) scale(1)`)
          .on("end", pulseHub);
      };

      pulseHub();
    }

    const cursor = scene
      .append("g")
      .attr("class", "cursor")
      .attr("opacity", 0.9);

    cursor
      .append("path")
      .attr("d", "M0,0 L0,18 L5,14 L9,22 L12,20 L8,12 L14,12 Z")
      .attr("fill", "#111827")
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 2)
      .attr("transform", "translate(-2,-2)");

    if (hubNode) {
      cursor.attr("transform", `translate(${hubNode.cx},${hubNode.cy})`);
    }

    links.each(function prepareDash() {
      const length = this.getTotalLength();
      d3.select(this).attr("stroke-dasharray", `${length} ${length}`).attr("stroke-dashoffset", length);
    });

    let linkIndex = 0;
    let gapTimer = 0;
    let cancelled = false;

    const popNode = (nodeId: string) => {
      const node = getNodeById(graph, nodeId);
      if (!node) {
        return;
      }

      nodes
        .filter((item) => item.id === nodeId)
        .interrupt()
        .attr("opacity", 1)
        .attr("transform", `translate(${node.cx},${node.cy}) scale(0)`)
        .transition()
        .duration(380)
        .ease(d3.easeBackOut.overshoot(1.65))
        .attr("transform", `translate(${node.cx},${node.cy}) scale(1)`);
    };

    const restart = () => {
      linkIndex = 0;
      nodes
        .filter((node) => node.role === "page")
        .interrupt()
        .attr("opacity", 0)
        .attr("transform", (node) => `translate(${node.cx},${node.cy}) scale(0)`);
      links.interrupt();
      links.each(function resetDash() {
        const length = this.getTotalLength();
        d3.select(this).attr("stroke-dashoffset", length);
      });
      scene.interrupt().attr("opacity", 1);

      if (hubNode) {
        cursor.interrupt().attr("transform", `translate(${hubNode.cx},${hubNode.cy})`);
      }

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
      const pathNode = path.node();

      path
        .transition()
        .duration(LINK_DURATION_MS)
        .ease(d3.easeCubicOut)
        .attr("stroke-dashoffset", 0);

      if (pathNode) {
        const length = pathNode.getTotalLength();

        cursor
          .interrupt()
          .transition()
          .duration(LINK_DURATION_MS)
          .ease(d3.easeCubicOut)
          .attrTween("transform", () => (t) => {
            const point = pathNode.getPointAtLength(t * length);
            return `translate(${point.x},${point.y})`;
          })
          .on("end", () => {
            if (cancelled) {
              return;
            }

            popNode(link.targetId);
            linkIndex += 1;
            gapTimer = window.setTimeout(drawNext, LINK_GAP_MS);
          });
      } else {
        linkIndex += 1;
        gapTimer = window.setTimeout(drawNext, LINK_GAP_MS);
      }
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
          "absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(37,99,235,0.08),transparent_60%)] opacity-30",
          className,
        )}
        aria-hidden
      />
    );
  }

  return (
    <div ref={containerRef} className={cn("absolute inset-0 opacity-30", className)} aria-hidden>
      <svg ref={svgRef} className="h-full w-full" width={size.width} height={size.height} />
    </div>
  );
}
