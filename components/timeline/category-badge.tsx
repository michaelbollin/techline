import type { TimelineEvent } from "@/lib/timeline/schema";

type CategoryBadgeProps = {
  category: TimelineEvent["category"];
};

const categoryStyles: Record<TimelineEvent["category"], string> = {
  invention: "text-amber-300 bg-amber-400/10",
  hardware: "text-orange-300 bg-orange-400/10",
  software: "text-sky-300 bg-sky-400/10",
  protocol: "text-violet-300 bg-violet-400/10",
  company: "text-rose-300 bg-rose-400/10",
  culture: "text-emerald-300 bg-emerald-400/10",
  ai: "text-accent bg-accent-muted",
  quote: "text-fuchsia-300 bg-fuchsia-400/10",
};

export function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-medium tracking-wide uppercase ${categoryStyles[category]}`}
    >
      {category}
    </span>
  );
}
