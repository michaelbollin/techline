import { EventDetailSection } from "@/components/timeline/event-detail-section";
import { cn } from "@/lib/cn";
import type { Narrative } from "@/lib/timeline/schema";

type NarrativeBlockProps = {
  narrative: Narrative;
  variant?: "page" | "modal";
};

const sections: { key: keyof Narrative; label: string }[] = [
  { key: "whyChosen", label: "Why it's here" },
  { key: "whyImportant", label: "Why it mattered" },
  { key: "problemSolved", label: "What it solved" },
];

function narrativeParagraphClass(key: keyof Narrative, variant: "page" | "modal") {
  return cn(
    variant === "modal"
      ? "text-sm leading-relaxed text-foreground"
      : "leading-relaxed text-foreground/90",
    key === "whyImportant" && "font-semibold text-foreground",
  );
}

export function NarrativeBlock({ narrative, variant = "page" }: NarrativeBlockProps) {
  if (variant === "modal") {
    return (
      <div className="space-y-8">
        {sections.map((section) => (
          <EventDetailSection key={section.key} title={section.label}>
            <p className={narrativeParagraphClass(section.key, "modal")}>
              {narrative[section.key]}
            </p>
          </EventDetailSection>
        ))}
      </div>
    );
  }

  return (
    <section className="space-y-6">
      {sections.map((section) => (
        <article
          key={section.key}
          className="rounded-2xl border border-border bg-surface p-5"
        >
          <h2 className="mb-2 text-sm font-medium tracking-wide text-muted uppercase">
            {section.label}
          </h2>
          <p className={narrativeParagraphClass(section.key, "page")}>{narrative[section.key]}</p>
        </article>
      ))}
    </section>
  );
}
