import type { Narrative } from "@/lib/timeline/schema";

type NarrativeBlockProps = {
  narrative: Narrative;
};

const sections: { key: keyof Narrative; label: string }[] = [
  { key: "whyChosen", label: "Why it's here" },
  { key: "whyImportant", label: "Why it mattered" },
  { key: "problemSolved", label: "What it solved" },
];

export function NarrativeBlock({ narrative }: NarrativeBlockProps) {
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
