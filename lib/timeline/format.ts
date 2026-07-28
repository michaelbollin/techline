import type { DatePrecision, TimelineEvent } from "./schema";

export function formatEventDate(date: string, precision: DatePrecision): string {
  if (precision === "decade") {
    return `${date.replace(/\D/g, "")}s`;
  }

  if (precision === "year") {
    return date;
  }

  if (precision === "month") {
    const [year, month] = date.split("-");
    return new Date(Number(year), Number(month) - 1, 1).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  }

  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatBucketLabel(year: number, month: number | null): string {
  if (month === null) {
    return String(year);
  }

  return new Date(year, month - 1, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export function eventPath(slug: string, options?: { filterPathKey?: string }): string {
  const base = `/${slug}`;
  const filterPathKey = options?.filterPathKey?.trim();

  if (!filterPathKey) {
    return base;
  }

  return `${base}?from=${encodeURIComponent(filterPathKey)}`;
}

export function categoryLabel(category: TimelineEvent["category"]): string {
  return category.replace("-", " ");
}
