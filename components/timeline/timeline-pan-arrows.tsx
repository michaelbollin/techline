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
        <button
          type="button"
          onClick={onPanEarlier}
          className="modern-timeline-control modern-timeline-control-square modern-timeline-pan-arrow modern-timeline-pan-arrow-left rounded-full"
          aria-label="Show earlier events"
        >
          <ChevronLeft />
        </button>
      )}
      {canPanLater && (
        <button
          type="button"
          onClick={onPanLater}
          className="modern-timeline-control modern-timeline-control-square modern-timeline-pan-arrow modern-timeline-pan-arrow-right rounded-full"
          aria-label="Show later events"
        >
          <ChevronRight />
        </button>
      )}
    </>
  );
}
