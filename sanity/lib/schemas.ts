import { z } from "zod";

const sanityImage = z
  .object({
    _type: z.literal("image"),
    asset: z
      .object({
        _ref: z.string(),
        _type: z.literal("reference"),
      })
      .passthrough()
      .optional(),
  })
  .passthrough();

const moodStatus = z.enum(["calm", "restless", "engaged", "sleeping"]);

const activity = z.object({
  title: z.string(),
  time: z.string().nullable(),
  note: z.string().nullable(),
});

export const dailySummarySchema = z
  .object({
    careRecipientName: z.string(),
    relationship: z.string().nullable(),
    photo: sanityImage.nullable(),
    moodStatus: moodStatus.nullable(),
    shortSummary: z.string().nullable(),
    notesOrFlags: z.array(z.string()).nullable(),
    activities: z.array(activity).nullable(),
  })
  .nullable();

const blogPostSummary = z.object({
  _id: z.string(),
  title: z.string(),
  slug: z.string(),
  author: z.string().nullable(),
  publishedAt: z.string(),
  featuredImage: sanityImage.nullable(),
  excerpt: z.string().nullable(),
});

export const allPostsSchema = z.array(blogPostSummary);

export const postBySlugSchema = blogPostSummary
  .extend({
    body: z.array(z.any()).nullable(),
  })
  .nullable();

export const postSlugsSchema = z.array(z.string());

const resourceSchema = z.object({
  _id: z.string(),
  title: z.string(),
  shortDescription: z.string().nullable(),
  thumbnail: sanityImage.nullable(),
  externalUrl: z.string(),
});

const resourceCategorySchema = z.object({
  _id: z.string(),
  title: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  resources: z.array(resourceSchema),
});

export const resourcesByCategorySchema = z.array(resourceCategorySchema);
