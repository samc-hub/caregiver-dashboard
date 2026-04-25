import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { ScrollableUl } from "@/components/ScrollableUl";

describe("ScrollableUl", () => {
  it("renders children inside ul", () => {
    render(
      <ScrollableUl scrollable={false} className="x">
        <li>one</li>
        <li>two</li>
      </ScrollableUl>,
    );
    expect(screen.getByText("one")).toBeInTheDocument();
    expect(screen.getByText("two")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("does not render scroll hint when not scrollable", () => {
    render(
      <ScrollableUl scrollable={false} className="x">
        <li>one</li>
      </ScrollableUl>,
    );
    expect(screen.queryByText("Scroll for more")).not.toBeInTheDocument();
  });

  it("renders scroll hint when scrollable", () => {
    render(
      <ScrollableUl scrollable className="x">
        <li>one</li>
      </ScrollableUl>,
    );
    expect(screen.getByText("Scroll for more")).toBeInTheDocument();
  });

  it("applies mask class when scrollable", () => {
    const { container } = render(
      <ScrollableUl scrollable className="base-class">
        <li>one</li>
      </ScrollableUl>,
    );
    const ul = container.querySelector("ul")!;
    expect(ul.className).toContain("base-class");
    expect(ul.className).toContain("mask-image");
  });

  it("uses bare className when not scrollable", () => {
    const { container } = render(
      <ScrollableUl scrollable={false} className="base-class">
        <li>one</li>
      </ScrollableUl>,
    );
    const ul = container.querySelector("ul")!;
    expect(ul.className).toBe("base-class");
  });
});
