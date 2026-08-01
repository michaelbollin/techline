import * as d3 from "d3";
import type { Selection } from "d3";

import { PALETTE, STROKE, type IcScene } from "./scene";

type ChipGroup = Selection<SVGGElement, unknown, null, undefined>;

export function drawGermaniumChip(
  group: ChipGroup,
  scene: Pick<IcScene, "chip" | "strokeWidth" | "wavePath">,
) {
  group.selectAll("*").remove();

  group
    .append("rect")
    .attr("class", "germanium")
    .attr("x", scene.chip.x)
    .attr("y", scene.chip.y)
    .attr("width", scene.chip.width)
    .attr("height", scene.chip.height)
    .attr("rx", scene.chip.rx)
    .attr("fill", PALETTE.germanium)
    .attr("stroke", STROKE)
    .attr("stroke-width", scene.strokeWidth);

  group
    .append("rect")
    .attr("class", "chip-glow")
    .attr("x", scene.chip.x)
    .attr("y", scene.chip.y)
    .attr("width", scene.chip.width)
    .attr("height", scene.chip.height)
    .attr("rx", scene.chip.rx)
    .attr("fill", PALETTE.glow)
    .attr("opacity", 0);

  group
    .append("path")
    .attr("class", "oscillator-wave")
    .attr("d", scene.wavePath)
    .attr("fill", "none")
    .attr("stroke", PALETTE.germaniumEdge)
    .attr("stroke-width", scene.strokeWidth * 0.7)
    .attr("stroke-linecap", "round")
    .attr("stroke-linejoin", "round")
    .attr("opacity", 0);
}
