"use client";

import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/cn";
import { glossaryTooltipWraps, splitTextWithGlossary } from "@/lib/glossary";

type TextWithAbbreviationTooltipsProps = {
  text: string;
  className?: string;
  /** Allow interaction inside pointer-events-none parents (hover detail). */
  interactive?: boolean;
};

export function TextWithAbbreviationTooltips({
  text,
  className,
  interactive = false,
}: TextWithAbbreviationTooltipsProps) {
  const parts = splitTextWithGlossary(text);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.type === "text") {
          return <span key={index}>{part.value}</span>;
        }

        return (
          <Tooltip
            key={index}
            label={part.explanation}
            side="top"
            align="auto"
            wrap={glossaryTooltipWraps(part.explanation)}
          >
            <span
              className={cn(
                "underline decoration-black/25 decoration-dotted underline-offset-[0.2em] cursor-help",
                interactive && "pointer-events-auto",
              )}
              tabIndex={0}
            >
              {part.value}
            </span>
          </Tooltip>
        );
      })}
    </span>
  );
}
