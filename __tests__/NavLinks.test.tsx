import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

const mockPathname = vi.fn();
vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname(),
}));

import { NavLinks } from "@/components/NavLinks";

describe("NavLinks", () => {
  beforeEach(() => {
    mockPathname.mockReset();
  });

  it("renders all primary links", () => {
    mockPathname.mockReturnValue("/");
    render(<NavLinks />);
    expect(screen.getByRole("link", { name: "Dashboard" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Blog" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Resources" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Studio" })).toBeInTheDocument();
  });

  it("marks studio active on /studio and nested studio routes", () => {
    mockPathname.mockReturnValue("/studio/structure");
    render(<NavLinks />);
    expect(screen.getByRole("link", { name: "Studio" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("marks dashboard active on root", () => {
    mockPathname.mockReturnValue("/");
    render(<NavLinks />);
    const dashboard = screen.getByRole("link", { name: "Dashboard" });
    expect(dashboard).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Blog" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("marks blog active on /blog", () => {
    mockPathname.mockReturnValue("/blog");
    render(<NavLinks />);
    expect(screen.getByRole("link", { name: "Blog" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "Dashboard" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("marks blog active on nested /blog/slug route", () => {
    mockPathname.mockReturnValue("/blog/some-post");
    render(<NavLinks />);
    expect(screen.getByRole("link", { name: "Blog" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("does not mark dashboard active on non-root", () => {
    mockPathname.mockReturnValue("/resources");
    render(<NavLinks />);
    expect(screen.getByRole("link", { name: "Dashboard" })).not.toHaveAttribute(
      "aria-current",
    );
    expect(screen.getByRole("link", { name: "Resources" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });
});
