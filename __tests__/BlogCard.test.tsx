import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/sanity/lib/image", () => ({
  urlFor: () => ({
    width: () => ({
      height: () => ({ url: () => "https://cdn.test/image.jpg" }),
    }),
  }),
}));

import { BlogCard } from "@/components/BlogCard";
import type { BlogPostSummary } from "@/sanity/lib/types";

const basePost = {
  _id: "1",
  title: "Hello world",
  slug: "hello-world",
  excerpt: "A short excerpt.",
  author: "Sam",
  publishedAt: "2026-04-21T00:00:00.000Z",
  featuredImage: null,
} as unknown as BlogPostSummary;

describe("BlogCard", () => {
  it("links to /blog/<slug>", () => {
    render(<BlogCard post={basePost} />);
    const link = screen.getByRole("link", { name: /Hello world/i });
    expect(link).toHaveAttribute("href", "/blog/hello-world");
  });

  it("shows title, excerpt, author", () => {
    render(<BlogCard post={basePost} />);
    expect(screen.getByText("Hello world")).toBeInTheDocument();
    expect(screen.getByText("A short excerpt.")).toBeInTheDocument();
    expect(screen.getByText(/Sam/)).toBeInTheDocument();
  });

  it("formats publishedAt date", () => {
    render(<BlogCard post={basePost} />);
    expect(screen.getByText(/Apr/)).toBeInTheDocument();
    expect(screen.getByText(/2026/)).toBeInTheDocument();
  });

  it("renders featured image when present", () => {
    const post = {
      ...basePost,
      featuredImage: { asset: { _ref: "image-abc" } },
    } as unknown as BlogPostSummary;
    render(<BlogCard post={post} />);
    const img = screen.getByAltText("Hello world") as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(decodeURIComponent(img.src)).toContain("https://cdn.test/image.jpg");
  });

  it("renders gradient placeholder when no featured image", () => {
    render(<BlogCard post={basePost} />);
    expect(screen.queryByAltText("Hello world")).not.toBeInTheDocument();
  });
});
