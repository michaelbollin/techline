"use client";

import { useState } from "react";

type WrongImageButtonProps = {
  eventId: string;
  initiallyMarked?: boolean;
};

export function WrongImageButton({ eventId, initiallyMarked = false }: WrongImageButtonProps) {
  const [marked, setMarked] = useState(initiallyMarked);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    if (marked || pending) {
      return;
    }

    setPending(true);
    setError(null);

    try {
      const response = await fetch("/api/wrong-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setMarked(true);
    } catch {
      setError("Could not save");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={handleClick}
        disabled={marked || pending}
        className="rounded-full border border-black px-3 py-1.5 text-xs font-medium transition-colors enabled:hover:bg-black enabled:hover:text-white disabled:cursor-default disabled:border-black/20 disabled:text-black/40"
      >
        {marked ? "Flagged" : pending ? "Saving…" : "Wrong image"}
      </button>
      {error ? <span className="text-xs text-red-600">{error}</span> : null}
    </div>
  );
}
