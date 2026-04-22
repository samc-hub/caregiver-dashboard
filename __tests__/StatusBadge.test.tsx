import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatusBadge } from "@/components/StatusBadge";

describe("StatusBadge", () => {
  it("renders label for given status", () => {
    render(<StatusBadge status="calm" />);
    expect(screen.getByText("Calm")).toBeInTheDocument();
  });

  it("renders nothing when status is undefined", () => {
    const { container } = render(<StatusBadge />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders each known status variant", () => {
    const statuses = ["calm", "restless", "engaged", "sleeping"] as const;
    for (const s of statuses) {
      const { unmount } = render(<StatusBadge status={s} />);
      expect(screen.getByText(new RegExp(s, "i"))).toBeInTheDocument();
      unmount();
    }
  });
});
