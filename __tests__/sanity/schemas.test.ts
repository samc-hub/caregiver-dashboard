import { describe, it, expect } from "vitest";
import {
  allPostsSchema,
  dailySummarySchema,
  postBySlugSchema,
  postSlugsSchema,
  resourcesByCategorySchema,
} from "@/sanity/lib/schemas";

describe("Sanity response schemas", () => {
  describe("dailySummarySchema", () => {
    it("accepts a fully populated summary", () => {
      const ok = dailySummarySchema.safeParse({
        careRecipientName: "Rose",
        relationship: "mother",
        photo: null,
        moodStatus: "calm",
        shortSummary: "Good morning",
        notesOrFlags: ["hydration"],
        activities: [{ title: "Breakfast", time: "08:00", note: null }],
      });
      expect(ok.success).toBe(true);
    });

    it("accepts null (singleton not created yet)", () => {
      expect(dailySummarySchema.safeParse(null).success).toBe(true);
    });

    it("rejects unknown mood status", () => {
      const res = dailySummarySchema.safeParse({
        careRecipientName: "Rose",
        relationship: null,
        photo: null,
        moodStatus: "ecstatic",
        shortSummary: null,
        notesOrFlags: null,
        activities: null,
      });
      expect(res.success).toBe(false);
    });

    it("rejects missing required name", () => {
      const res = dailySummarySchema.safeParse({
        relationship: null,
        photo: null,
        moodStatus: null,
        shortSummary: null,
        notesOrFlags: null,
        activities: null,
      });
      expect(res.success).toBe(false);
    });
  });

  describe("allPostsSchema", () => {
    it("accepts empty array", () => {
      expect(allPostsSchema.safeParse([]).success).toBe(true);
    });

    it("accepts array of valid post summaries", () => {
      const res = allPostsSchema.safeParse([
        {
          _id: "p1",
          title: "Hello",
          slug: "hello",
          author: null,
          publishedAt: "2026-04-21",
          featuredImage: null,
          excerpt: null,
        },
      ]);
      expect(res.success).toBe(true);
    });
  });

  describe("postBySlugSchema", () => {
    it("accepts null for missing slug", () => {
      expect(postBySlugSchema.safeParse(null).success).toBe(true);
    });

    it("accepts post with body blocks", () => {
      const res = postBySlugSchema.safeParse({
        _id: "p1",
        title: "Hello",
        slug: "hello",
        author: "Sam",
        publishedAt: "2026-04-21",
        featuredImage: null,
        excerpt: null,
        body: [{ _type: "block", children: [] }],
      });
      expect(res.success).toBe(true);
    });
  });

  describe("postSlugsSchema", () => {
    it("accepts array of strings", () => {
      expect(postSlugsSchema.safeParse(["a", "b"]).success).toBe(true);
    });

    it("rejects array of non-strings", () => {
      expect(postSlugsSchema.safeParse([1, 2]).success).toBe(false);
    });
  });

  describe("resourcesByCategorySchema", () => {
    it("accepts category with nested resources", () => {
      const res = resourcesByCategorySchema.safeParse([
        {
          _id: "c1",
          title: "Care",
          slug: "care",
          description: null,
          resources: [
            {
              _id: "r1",
              title: "Link",
              shortDescription: null,
              thumbnail: null,
              externalUrl: "https://example.com",
            },
          ],
        },
      ]);
      expect(res.success).toBe(true);
    });
  });
});
