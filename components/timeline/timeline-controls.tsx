import * as d3 from "d3";

import { TIMELINE_ZOOM_STEP } from "@/lib/timeline/constants";

type TimelineControlsProps = {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFit: () => void;
};

export function TimelineControls({ onZoomIn, onZoomOut, onFit }: TimelineControlsProps) {
  return (
    <div className="absolute right-4 bottom-4 flex items-center gap-1.5">
      <button
        type="button"
        onClick={onZoomIn}
        className="modern-timeline-control modern-timeline-control-square rounded-full"
        aria-label="Zoom in"
      >
        +
      </button>
      <button
        type="button"
        onClick={onZoomOut}
        className="modern-timeline-control modern-timeline-control-square rounded-full"
        aria-label="Zoom out"
      >
        −
      </button>
      <button type="button" onClick={onFit} className="modern-timeline-control rounded-full px-4">
        Fit
      </button>
    </div>
  );
}

export function zoomInTransform(transform: d3.ZoomTransform): d3.ZoomTransform {
  return d3.zoomIdentity.translate(transform.x, 0).scale(transform.k * TIMELINE_ZOOM_STEP);
}

export function zoomOutTransform(transform: d3.ZoomTransform): d3.ZoomTransform {
  return d3.zoomIdentity.translate(transform.x, 0).scale(transform.k / TIMELINE_ZOOM_STEP);
}
