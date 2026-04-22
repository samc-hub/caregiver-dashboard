import { describe, it, expect } from "vitest";
import {
  allPostsQuery,
  dailySummaryQuery,
  postBySlugQuery,
  postSlugsQuery,
  resourcesByCategoryQuery,
} from "@/sanity/lib/queries";

describe("GROQ queries", () => {
  describe("dailySummaryQuery", () => {
    it("filters on dailySummary type and singleton id", () => {
      expect(dailySummaryQuery).toMatch(/_type\s*==\s*"dailySummary"/);
      expect(dailySummaryQuery).toMatch(/_id\s*==\s*"dailySummary"/);
    });

    it("projects expected fields", () => {
      for (const f of [
        "careRecipientName",
        "relationship",
        "photo",
        "moodStatus",
        "shortSummary",
        "notesOrFlags",
        "activities",
      ]) {
        expect(dailySummaryQuery).toContain(f);
      }
    });

    it("projects activity subfields", () => {
      expect(dailySummaryQuery).toMatch(/activities\[\]\{[^}]*title/);
      expect(dailySummaryQuery).toMatch(/activities\[\]\{[^}]*time/);
      expect(dailySummaryQuery).toMatch(/activities\[\]\{[^}]*note/);
    });
  });

  describe("allPostsQuery", () => {
    it("filters blogPost with defined slug and orders by publishedAt desc", () => {
      expect(allPostsQuery).toMatch(/_type\s*==\s*"blogPost"/);
      expect(allPostsQuery).toContain("defined(slug.current)");
      expect(allPostsQuery).toMatch(/order\(publishedAt\s+desc\)/);
    });

    it("aliases slug.current to slug", () => {
      expect(allPostsQuery).toContain('"slug": slug.current');
    });

    it("excludes body from listing", () => {
      expect(allPostsQuery).not.toMatch(/\bbody\b/);
    });
  });

  describe("postBySlugQuery", () => {
    it("filters by slug param", () => {
      expect(postBySlugQuery).toContain("slug.current == $slug");
    });

    it("includes body projection", () => {
      expect(postBySlugQuery).toMatch(/\bbody\b/);
    });
  });

  describe("postSlugsQuery", () => {
    it("returns array of slug strings", () => {
      expect(postSlugsQuery).toContain("defined(slug.current)");
      expect(postSlugsQuery).toContain("slug.current");
    });
  });

  describe("resourcesByCategoryQuery", () => {
    it("queries resourceCategory ordered by title asc", () => {
      expect(resourcesByCategoryQuery).toContain('_type == "resourceCategory"');
      expect(resourcesByCategoryQuery).toMatch(/order\(title\s+asc\)/);
    });

    it("nests resources filtered by parent reference", () => {
      expect(resourcesByCategoryQuery).toContain(
        '*[_type == "resource" && references(^._id)]',
      );
    });

    it("projects resource fields", () => {
      for (const f of [
        "title",
        "shortDescription",
        "thumbnail",
        "externalUrl",
      ]) {
        expect(resourcesByCategoryQuery).toContain(f);
      }
    });
  });
});
