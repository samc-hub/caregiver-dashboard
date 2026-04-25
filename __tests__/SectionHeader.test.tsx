import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { SectionHeader } from "@/components/SectionHeader";

describe("SectionHeader", () => {
  it("renders title", () => {
    render(<SectionHeader title="Today" />);
    expect(
      screen.getByRole("heading", { name: "Today", level: 2 }),
    ).toBeInTheDocument();
  });

  it("renders eyebrow when given", () => {
    render(<SectionHeader title="Today" eyebrow="Overview" />);
    expect(screen.getByText("Overview")).toBeInTheDocument();
  });

  it("omits eyebrow when not given", () => {
    const { container } = render(<SectionHeader title="Today" />);
    expect(container.querySelector(".eyebrow")).toBeNull();
  });

  it("renders description when given", () => {
    render(<SectionHeader title="Today" description="A summary." />);
    expect(screen.getByText("A summary.")).toBeInTheDocument();
  });

  it("renders actions slot", () => {
    render(<SectionHeader title="Today" actions={<button>Action</button>} />);
    expect(screen.getByRole("button", { name: "Action" })).toBeInTheDocument();
  });
});
