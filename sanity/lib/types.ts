import type {
  AllPostsQueryResult,
  DailySummaryQueryResult,
  PostBySlugQueryResult,
  ResourcesByCategoryQueryResult,
} from "./sanity.types";

export type {
  AllPostsQueryResult,
  DailySummaryQueryResult,
  PostBySlugQueryResult,
  PostSlugsQueryResult,
  ResourcesByCategoryQueryResult,
} from "./sanity.types";

export type DailySummary = NonNullable<DailySummaryQueryResult>;
export type MoodStatus = NonNullable<DailySummary["moodStatus"]>;
export type Activity = NonNullable<DailySummary["activities"]>[number];

export type BlogPostSummary = AllPostsQueryResult[number];
export type BlogPost = NonNullable<PostBySlugQueryResult>;

export type ResourceCategory = ResourcesByCategoryQueryResult[number];
export type Resource = ResourceCategory["resources"][number];
