import { useEffect, useRef } from "react";

type UseTimelineKeyboardNavigationOptions = {
  enabled: boolean;
  zoomIn: () => void;
  zoomOut: () => void;
  panEarlier: () => void;
  panLater: () => void;
  canPanEarlier: boolean;
  canPanLater: boolean;
};

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  const tag = target.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    target.isContentEditable
  );
}

export function useTimelineKeyboardNavigation({
  enabled,
  zoomIn,
  zoomOut,
  panEarlier,
  panLater,
  canPanEarlier,
  canPanLater,
}: UseTimelineKeyboardNavigationOptions) {
  const zoomInRef = useRef(zoomIn);
  const zoomOutRef = useRef(zoomOut);
  const panEarlierRef = useRef(panEarlier);
  const panLaterRef = useRef(panLater);
  const canPanEarlierRef = useRef(canPanEarlier);
  const canPanLaterRef = useRef(canPanLater);

  useEffect(() => {
    zoomInRef.current = zoomIn;
    zoomOutRef.current = zoomOut;
    panEarlierRef.current = panEarlier;
    panLaterRef.current = panLater;
    canPanEarlierRef.current = canPanEarlier;
    canPanLaterRef.current = canPanLater;
  }, [canPanEarlier, canPanLater, panEarlier, panLater, zoomIn, zoomOut]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || isEditableTarget(event.target)) {
        return;
      }

      switch (event.key) {
        case "ArrowUp":
          event.preventDefault();
          zoomInRef.current();
          break;
        case "ArrowDown":
          event.preventDefault();
          zoomOutRef.current();
          break;
        case "ArrowLeft":
          if (!canPanEarlierRef.current) {
            return;
          }
          event.preventDefault();
          panEarlierRef.current();
          break;
        case "ArrowRight":
          if (!canPanLaterRef.current) {
            return;
          }
          event.preventDefault();
          panLaterRef.current();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [enabled]);
}
