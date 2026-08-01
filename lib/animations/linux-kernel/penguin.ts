import type { Selection } from "d3";

/** Larry Ewing Tux — same asset as the timeline event (CC BY-SA / GPL). */
export const TUX_IMAGE_URL = "/media/timeline/linux-kernel-announced.svg";
export const TUX_ASPECT = 256 / 216;

type DrawGroup = Selection<SVGGElement, unknown, null, undefined>;

export function appendTuxImage(group: DrawGroup, width: number, height: number) {
  group.selectAll("*").remove();

  group
    .append("image")
    .attr("href", TUX_IMAGE_URL)
    .attr("x", -width / 2)
    .attr("y", -height / 2)
    .attr("width", width)
    .attr("height", height)
    .attr("preserveAspectRatio", "xMidYMid meet");
}
