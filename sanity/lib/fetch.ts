import type { ZodType } from "zod";

import { client } from "./client";
import {
  allPostsSchema,
  dailySummarySchema,
  postBySlugSchema,
  postSlugsSchema,
  resourcesByCategorySchema,
} from "./schemas";
import {
  allPostsQuery,
  dailySummaryQuery,
  postBySlugQuery,
  postSlugsQuery,
  resourcesByCategoryQuery,
} from "./queries";

async function fetchAndParse<T>(
  query: string,
  schema: ZodType<T>,
  params: Record<string, unknown> = {},
): Promise<T> {
  const raw = await client.fetch(query, params);
  const result = schema.safeParse(raw);
  if (!result.success) {
    throw new Error(
      `Sanity response failed validation for query: ${query.slice(0, 80)}...\n${result.error.message}`,
    );
  }
  return result.data;
}

export const getDailySummary = () =>
  fetchAndParse(dailySummaryQuery, dailySummarySchema);

export const getAllPosts = () => fetchAndParse(allPostsQuery, allPostsSchema);

export const getPostBySlug = (slug: string) =>
  fetchAndParse(postBySlugQuery, postBySlugSchema, { slug });

export const getPostSlugs = () =>
  fetchAndParse(postSlugsQuery, postSlugsSchema);

export const getResourcesByCategory = () =>
  fetchAndParse(resourcesByCategoryQuery, resourcesByCategorySchema);
