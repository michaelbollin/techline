"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, type ReactNode } from "react";

import { AnimationLayer } from "@/components/animations/animation-layer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import type { AnimationId } from "@/lib/animations/registry";

type EventModalProps = {
  children: ReactNode;
  returnHref?: string;
  animationId?: AnimationId | null;
  className?: string;
};

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M4 4L12 12M12 4L4 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function EventModal({
  children,
  returnHref = "/",
  animationId = null,
  className,
}: EventModalProps) {
  const router = useRouter();

  const onClose = useCallback(() => {
    router.push(returnHref, { scroll: false });
  }, [router, returnHref]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6",
        className,
      )}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        className={cn(
          "absolute inset-0 z-0",
          animationId ? "bg-white/20" : "bg-black/40",
        )}
        aria-label="Close event details"
        onClick={onClose}
      />

      {animationId && (
        <AnimationLayer animationId={animationId} variant="contained" className="z-[1]" />
      )}

      <div
        className={cn(
          "relative z-[2] flex h-[60dvh] max-h-[60dvh] w-full max-w-full flex-col overflow-hidden rounded-2xl border border-black sm:h-auto sm:max-h-[min(88dvh,56rem)] sm:max-w-4xl",
          animationId ? "bg-white/90" : "bg-white",
        )}
      >
        <div className="flex shrink-0 justify-end px-4 pt-4">
          <Button variant="icon" aria-label="Close" onClick={onClose}>
            <CloseIcon />
          </Button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-6 sm:px-6 sm:pb-8">{children}</div>
      </div>
    </div>
  );
}
