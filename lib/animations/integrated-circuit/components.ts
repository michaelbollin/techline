import * as d3 from "d3";
import type { Selection } from "d3";

import { STROKE, type IcComponent, type IcComponentKind } from "./scene";

type DrawGroup = Selection<SVGGElement, IcComponent, SVGGElement, unknown>;

function resistorSymbol(size: number): string[] {
  const w = size * 0.48;
  const h = size * 0.18;
  const lead = size * 0.2;
  const steps = 4;
  const step = w / steps;
  let zigzag = `M ${-w / 2} 0`;
  for (let index = 1; index <= steps; index += 1) {
    const x = -w / 2 + step * index;
    const y = index % 2 === 0 ? 0 : index % 4 === 1 ? -h : h;
    zigzag += ` L ${x} ${y}`;
  }

  return [
    `M ${-w / 2 - lead} 0 L ${-w / 2} 0`,
    zigzag,
    `M ${w / 2} 0 L ${w / 2 + lead} 0`,
  ];
}

function capacitorSymbol(size: number): string[] {
  const gap = size * 0.08;
  const plate = size * 0.24;
  const lead = size * 0.2;
  return [
    `M ${-gap - lead} 0 L ${-gap} 0`,
    `M ${-gap} ${-plate / 2} L ${-gap} ${plate / 2}`,
    `M ${gap} ${-plate / 2} L ${gap} ${plate / 2}`,
    `M ${gap} 0 L ${gap + lead} 0`,
  ];
}

function transistorSymbol(size: number): string[] {
  const body = size * 0.11;
  const leg = size * 0.18;
  const spread = size * 0.16;
  return [
    `M 0 ${-leg} L 0 ${-body}`,
    `M 0 ${body} L 0 ${leg}`,
    `M ${body * 0.15} 0 L ${spread} ${-spread * 0.7}`,
    `M ${body * 0.15} 0 L ${spread} ${spread * 0.7}`,
  ];
}

function symbolPaths(kind: IcComponentKind, size: number): string[] {
  if (kind === "resistor") {
    return resistorSymbol(size);
  }

  if (kind === "capacitor") {
    return capacitorSymbol(size);
  }

  return transistorSymbol(size);
}

export function drawCartoonComponent(group: DrawGroup, strokeWidth: number) {
  group.each(function draw(this: SVGGElement, component) {
    const node = d3.select(this);
    node.selectAll("*").remove();

    const bubble = component.size * 0.72;

    node
      .append("rect")
      .attr("class", "bubble")
      .attr("x", -bubble / 2)
      .attr("y", -bubble / 2)
      .attr("width", bubble)
      .attr("height", bubble)
      .attr("rx", bubble * 0.22)
      .attr("fill", component.fill)
      .attr("stroke", STROKE)
      .attr("stroke-width", strokeWidth);

    node
      .append("circle")
      .attr("class", "accent-dot")
      .attr("cx", bubble * 0.3)
      .attr("cy", -bubble * 0.3)
      .attr("r", bubble * 0.14)
      .attr("fill", component.accent)
      .attr("stroke", STROKE)
      .attr("stroke-width", strokeWidth * 0.75);

    if (component.kind === "transistor") {
      node
        .append("circle")
        .attr("class", "symbol-body")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", component.size * 0.11)
        .attr("fill", "#fff")
        .attr("stroke", STROKE)
        .attr("stroke-width", strokeWidth * 0.9);
    }

    for (const pathD of symbolPaths(component.kind, component.size)) {
      node
        .append("path")
        .attr("class", "symbol")
        .attr("d", pathD)
        .attr("fill", "none")
        .attr("stroke", STROKE)
        .attr("stroke-width", strokeWidth * 0.9)
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round");
    }
  });
}
