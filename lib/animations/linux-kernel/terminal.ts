import type { Selection } from "d3";

import type { LinuxScene } from "./scene";

const STROKE = "#111827";

type DrawGroup = Selection<SVGGElement, unknown, null, undefined>;

export function drawTerminalChrome(
  group: DrawGroup,
  terminal: LinuxScene["terminal"],
  strokeWidth: number,
) {
  const { x, y, width, height, rx, paddingX } = terminal;
  const titleHeight = height * 0.16;

  group.selectAll("*").remove();

  group
    .append("rect")
    .attr("class", "terminal-body")
    .attr("x", x)
    .attr("y", y)
    .attr("width", width)
    .attr("height", height)
    .attr("rx", rx)
    .attr("fill", "#0f172a")
    .attr("stroke", STROKE)
    .attr("stroke-width", strokeWidth);

  group
    .append("rect")
    .attr("x", x)
    .attr("y", y)
    .attr("width", width)
    .attr("height", titleHeight)
    .attr("rx", rx)
    .attr("fill", "#334155")
    .attr("stroke", STROKE)
    .attr("stroke-width", strokeWidth * 0.85);

  const dotY = y + titleHeight * 0.5;
  const dotX = x + paddingX;

  for (const [index, color] of ["#f87171", "#fbbf24", "#4ade80"].entries()) {
    group
      .append("circle")
      .attr("cx", dotX + index * strokeWidth * 3.2)
      .attr("cy", dotY)
      .attr("r", strokeWidth * 0.75)
      .attr("fill", color)
      .attr("stroke", STROKE)
      .attr("stroke-width", strokeWidth * 0.35);
  }

  return {
    textX: x + paddingX,
    textY: y + titleHeight + height * 0.14,
    titleHeight,
  };
}

export function drawTerminalLine(
  group: DrawGroup,
  text: string,
  x: number,
  y: number,
  fontSize: number,
) {
  group
    .append("text")
    .attr("class", "terminal-line")
    .attr("x", x)
    .attr("y", y)
    .attr("font-size", fontSize)
    .attr("font-family", "ui-monospace, SFMono-Regular, Menlo, monospace")
    .attr("font-weight", 600)
    .attr("fill", "#4ade80")
    .attr("stroke", "none")
    .text(text);
}

export function measureLineEndX(textNode: SVGTextElement, gap: number): number {
  const bbox = textNode.getBBox();
  return bbox.x + bbox.width + gap;
}

export function drawTerminalCursor(
  group: DrawGroup,
  x: number,
  y: number,
  fontSize: number,
) {
  group
    .append("rect")
    .attr("class", "terminal-cursor")
    .attr("x", x)
    .attr("y", y - fontSize * 0.85)
    .attr("width", fontSize * 0.45)
    .attr("height", fontSize)
    .attr("fill", "#4ade80")
    .attr("opacity", 0.9);
}

export function blinkCursor(
  selection: Selection<SVGRectElement, unknown, null, undefined>,
  cancelled: () => boolean,
  blinks: number,
  onComplete?: () => void,
) {
  let remaining = blinks;

  const pulse = () => {
    if (cancelled()) {
      selection.interrupt().attr("opacity", 0);
      return;
    }

    if (remaining <= 0) {
      selection.attr("opacity", 0);
      onComplete?.();
      return;
    }

    selection
      .transition()
      .duration(220)
      .attr("opacity", 0.12)
      .transition()
      .duration(220)
      .attr("opacity", 0.95)
      .on("end", () => {
        remaining -= 1;
        pulse();
      });
  };

  pulse();
}
