import type { Selection } from "d3";

import type { WebIcon } from "./graph";

type IconGroup = Selection<SVGGElement, unknown, null, undefined>;

export function drawWebIcon(group: IconGroup, icon: WebIcon, size: number, strokeWidth: number) {
  const half = size / 2;
  const stroke = "#111827";

  group.selectAll("*").remove();

  switch (icon) {
    case "globe":
      group
        .append("circle")
        .attr("r", half * 0.62)
        .attr("fill", "none")
        .attr("stroke", stroke)
        .attr("stroke-width", strokeWidth * 0.7);
      group
        .append("ellipse")
        .attr("rx", half * 0.22)
        .attr("ry", half * 0.62)
        .attr("fill", "none")
        .attr("stroke", stroke)
        .attr("stroke-width", strokeWidth * 0.55);
      group
        .append("line")
        .attr("x1", -half * 0.62)
        .attr("x2", half * 0.62)
        .attr("stroke", stroke)
        .attr("stroke-width", strokeWidth * 0.55);
      break;
    case "link":
      group
        .append("path")
        .attr(
          "d",
          `M ${-half * 0.15} ${-half * 0.35} C ${-half * 0.7} ${-half * 0.7} ${-half * 0.7} ${half * 0.2} 0 ${half * 0.2} C ${half * 0.7} ${half * 0.2} ${half * 0.7} ${-half * 0.7} ${half * 0.15} ${-half * 0.35}`,
        )
        .attr("fill", "none")
        .attr("stroke", stroke)
        .attr("stroke-width", strokeWidth * 0.7)
        .attr("stroke-linecap", "round");
      break;
    case "help":
      group
        .append("circle")
        .attr("r", half * 0.55)
        .attr("fill", "white")
        .attr("stroke", stroke)
        .attr("stroke-width", strokeWidth * 0.65);
      group
        .append("path")
        .attr(
          "d",
          `M ${-half * 0.05} ${-half * 0.08} Q 0 ${-half * 0.35} ${half * 0.18} ${-half * 0.12} Q ${half * 0.3} 0 0 ${half * 0.08} L 0 ${half * 0.28}`,
        )
        .attr("fill", "none")
        .attr("stroke", stroke)
        .attr("stroke-width", strokeWidth * 0.55)
        .attr("stroke-linecap", "round");
      group.append("circle").attr("cy", half * 0.42).attr("r", half * 0.06).attr("fill", stroke);
      break;
    case "folder":
      group
        .append("path")
        .attr(
          "d",
          `M ${-half * 0.55} ${half * 0.2} L ${-half * 0.2} ${-half * 0.35} L ${half * 0.55} ${-half * 0.35} L ${half * 0.55} ${half * 0.45} L ${-half * 0.55} ${half * 0.45} Z`,
        )
        .attr("fill", "white")
        .attr("stroke", stroke)
        .attr("stroke-width", strokeWidth * 0.65)
        .attr("stroke-linejoin", "round");
      break;
    case "code": {
      const bracket = (flip: boolean) =>
        group
          .append("path")
          .attr(
            "d",
            flip
              ? `M ${half * 0.1} ${-half * 0.35} L ${half * 0.45} ${-half * 0.05} L ${half * 0.1} ${half * 0.25}`
              : `M ${-half * 0.1} ${-half * 0.35} L ${-half * 0.45} ${-half * 0.05} L ${-half * 0.1} ${half * 0.25}`,
          )
          .attr("fill", "none")
          .attr("stroke", stroke)
          .attr("stroke-width", strokeWidth * 0.7)
          .attr("stroke-linecap", "round")
          .attr("stroke-linejoin", "round");

      bracket(false);
      bracket(true);
      group
        .append("line")
        .attr("x1", -half * 0.08)
        .attr("x2", half * 0.08)
        .attr("y1", half * 0.32)
        .attr("y2", -half * 0.32)
        .attr("stroke", stroke)
        .attr("stroke-width", strokeWidth * 0.55)
        .attr("stroke-linecap", "round");
      break;
    }
    case "person":
      group
        .append("circle")
        .attr("cy", -half * 0.22)
        .attr("r", half * 0.22)
        .attr("fill", "white")
        .attr("stroke", stroke)
        .attr("stroke-width", strokeWidth * 0.65);
      group
        .append("path")
        .attr(
          "d",
          `M ${-half * 0.42} ${half * 0.48} Q 0 ${half * 0.05} ${half * 0.42} ${half * 0.48}`,
        )
        .attr("fill", "white")
        .attr("stroke", stroke)
        .attr("stroke-width", strokeWidth * 0.65)
        .attr("stroke-linejoin", "round");
      break;
    case "download":
      group
        .append("rect")
        .attr("x", -half * 0.42)
        .attr("y", half * 0.12)
        .attr("width", size * 0.84)
        .attr("height", half * 0.35)
        .attr("rx", 3)
        .attr("fill", "white")
        .attr("stroke", stroke)
        .attr("stroke-width", strokeWidth * 0.65);
      group
        .append("line")
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("y1", -half * 0.45)
        .attr("y2", half * 0.05)
        .attr("stroke", stroke)
        .attr("stroke-width", strokeWidth * 0.65)
        .attr("stroke-linecap", "round");
      group
        .append("path")
        .attr("d", `M ${-half * 0.18} ${-half * 0.05} L 0 ${half * 0.12} L ${half * 0.18} ${-half * 0.05}`)
        .attr("fill", "none")
        .attr("stroke", stroke)
        .attr("stroke-width", strokeWidth * 0.65)
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round");
      break;
  }
}
