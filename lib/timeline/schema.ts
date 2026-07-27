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

export const sourceRoleSchema = z.enum(["date", "overview"]);

export const sourceSchema = z.object({
  title: z.string().min(1),
  url: z.string().url(),
  /** `date` = confirms when; `overview` = confirms what it was for / general reference */
  role: sourceRoleSchema.optional(),
});

export const narrativeSchema = z.object({
  whyChosen: z.string().min(1),
  whyImportant: z.string().min(1),
  problemSolved: z.string().min(1),
});

export const personRoleSchema = z.enum([
  "creator",
  "co-creator",
  "founder",
  "co-founder",
  "ceo",
  "cto",
  "researcher",
  "author",
  "maintainer",
]);

export const personRefSchema = z.object({
  id: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "person id must be kebab-case"),
  name: z.string().min(1),
  role: personRoleSchema,
});

export const companyRefSchema = z.object({
  id: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "company id must be kebab-case"),
  name: z.string().min(1),
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
  /** Plain-language note on what this was used for — helpful for readers unfamiliar with the tech. */
  about: z.string().min(1),
  narrative: narrativeSchema,
  category: timelineCategorySchema,
  tags: z.array(z.string().min(1)).default([]),
  /** Key figures tied to this milestone — use on tech events instead of duplicating a person event. */
  people: z.array(personRefSchema).default([]),
  /** Vendor, foundation, or lab tied to this milestone — seeded via `npm run seed:companies`. */
  companies: z.array(companyRefSchema).default([]),
  /** Exact wording for `category: "quote"` events — the famous line(s). */
  quoteText: z.string().min(1).optional(),
  importance: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]),
  media: z.array(mediaItemSchema).default([]),
  sources: z.array(sourceSchema).default([]),
  relatedIds: z.array(z.string().min(1)).default([]),
}).superRefine((event, ctx) => {
  if (event.category === "quote" && !event.quoteText?.trim()) {
    ctx.addIssue({
      code: "custom",
      message: 'category "quote" requires quoteText',
      path: ["quoteText"],
    });
  }
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
export type SourceRole = z.infer<typeof sourceRoleSchema>;
export type Narrative = z.infer<typeof narrativeSchema>;
export type PersonRole = z.infer<typeof personRoleSchema>;
export type PersonRef = z.infer<typeof personRefSchema>;
export type CompanyRef = z.infer<typeof companyRefSchema>;
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
