import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type TimelinePanArrowsProps = {
  canPanEarlier: boolean;
  canPanLater: boolean;
  onPanEarlier: () => void;
  onPanLater: () => void;
};

function ChevronLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M10 3L5 8L10 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M6 3L11 8L6 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TimelinePanArrows({
  canPanEarlier,
  canPanLater,
  onPanEarlier,
  onPanLater,
}: TimelinePanArrowsProps) {
  if (!canPanEarlier && !canPanLater) {
    return null;
  }

  return (
    <>
      {canPanEarlier && (
        <Button
          variant="control"
          onClick={onPanEarlier}
          className={cn("pointer-events-auto absolute top-1/2 left-4 z-10 -translate-y-1/2")}
          aria-label="Show earlier events"
        >
          <ChevronLeft />
        </Button>
      )}
      {canPanLater && (
        <Button
          variant="control"
          onClick={onPanLater}
          className={cn("pointer-events-auto absolute top-1/2 right-4 z-10 -translate-y-1/2")}
          aria-label="Show later events"
        >
          <ChevronRight />
        </Button>
      )}
    </>
  );
}
