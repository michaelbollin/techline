import { EventDetailSection } from "@/components/timeline/event-detail-section";
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

export function NarrativeBlock({ narrative, variant = "page" }: NarrativeBlockProps) {
  if (variant === "modal") {
    return (
      <div className="space-y-8">
        {sections.map((section) => (
          <EventDetailSection key={section.key} title={section.label}>
            <p className="text-sm leading-relaxed text-foreground">{narrative[section.key]}</p>
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
          <p className="leading-relaxed text-foreground/90">{narrative[section.key]}</p>
        </article>
      ))}
    </section>
  );
}
