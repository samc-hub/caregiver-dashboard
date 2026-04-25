import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/sanity/lib/image", () => ({
  urlFor: () => ({
    width: () => ({
      height: () => ({ url: () => "https://cdn.test/thumb.jpg" }),
    }),
  }),
}));

import { ResourceCard } from "@/components/ResourceCard";
import type { Resource } from "@/sanity/lib/types";

const baseResource = {
  _id: "r1",
  title: "Helpful Site",
  shortDescription: "A useful resource.",
  externalUrl: "https://www.example.com/path",
  thumbnail: null,
} as unknown as Resource;

describe("ResourceCard", () => {
  it("renders title and description", () => {
    render(<ResourceCard resource={baseResource} />);
    expect(screen.getByText("Helpful Site")).toBeInTheDocument();
    expect(screen.getByText("A useful resource.")).toBeInTheDocument();
  });

  it("links to external url with safe attrs", () => {
    render(<ResourceCard resource={baseResource} />);
    const link = screen.getByRole("link", { name: /Helpful Site/i });
    expect(link).toHaveAttribute("href", "https://www.example.com/path");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("strips www and shows hostname", () => {
    render(<ResourceCard resource={baseResource} />);
    expect(screen.getByText("example.com")).toBeInTheDocument();
  });

  it("falls back to raw url when invalid", () => {
    const r = { ...baseResource, externalUrl: "not a url" } as Resource;
    render(<ResourceCard resource={r} />);
    expect(screen.getByText("not a url")).toBeInTheDocument();
  });

  it("renders monogram fallback when no thumbnail", () => {
    render(<ResourceCard resource={baseResource} />);
    expect(screen.getByText("HE")).toBeInTheDocument();
  });

  it("renders thumbnail when present", () => {
    const r = {
      ...baseResource,
      thumbnail: { asset: { _ref: "image-x" } },
    } as unknown as Resource;
    render(<ResourceCard resource={r} />);
    const img = document.querySelector("img") as HTMLImageElement;
    expect(img).toBeTruthy();
    expect(decodeURIComponent(img.src)).toContain("https://cdn.test/thumb.jpg");
  });
});
