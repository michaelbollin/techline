import { z } from "zod";

export const datePrecisionSchema = z.enum(["day", "month", "year", "decade"]);

export const timelineCategorySchema = z.enum([
  "invention",
  "hardware",
  "software",
  "protocol",
  "company",
  "culture",
  "ai",
  "quote",
]);

export const mediaTypeSchema = z.enum(["youtube", "link", "meme", "image"]);

export const mediaItemSchema = z.object({
  type: mediaTypeSchema,
  url: z.string().url(),
  title: z.string().min(1).optional(),
  caption: z.string().min(1).optional(),
});

export const sourceSchema = z.object({
  title: z.string().min(1),
  url: z.string().url(),
});

export const narrativeSchema = z.object({
  whyChosen: z.string().min(1),
  whyImportant: z.string().min(1),
  problemSolved: z.string().min(1),
});

export const timelineEventSchema = z.object({
  id: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "id must be kebab-case"),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be kebab-case"),
  date: z.string().min(1),
  datePrecision: datePrecisionSchema,
  title: z.string().min(1),
  summary: z.string().min(1),
  narrative: narrativeSchema,
  category: timelineCategorySchema,
  tags: z.array(z.string().min(1)).default([]),
  importance: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  media: z.array(mediaItemSchema).default([]),
  sources: z.array(sourceSchema).default([]),
  relatedIds: z.array(z.string().min(1)).default([]),
});

/** Monthly or yearly bucket file — path defines the bucket, not metadata in JSON. */
export const timelineBucketFileSchema = z.object({
  events: z.array(timelineEventSchema).min(1),
});

export type DatePrecision = z.infer<typeof datePrecisionSchema>;
export type TimelineCategory = z.infer<typeof timelineCategorySchema>;
export type MediaType = z.infer<typeof mediaTypeSchema>;
export type MediaItem = z.infer<typeof mediaItemSchema>;
export type Source = z.infer<typeof sourceSchema>;
export type Narrative = z.infer<typeof narrativeSchema>;
export type TimelineEvent = z.infer<typeof timelineEventSchema>;
export type TimelineBucketFile = z.infer<typeof timelineBucketFileSchema>;

export type TimelineBucketKind = "month" | "year" | "decade";

export type TimelineBucket = {
  kind: TimelineBucketKind;
  year: number;
  month: number | null;
  relativePath: string;
  events: TimelineEvent[];
};
