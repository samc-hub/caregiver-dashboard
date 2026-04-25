import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { ActivityList } from "@/components/ActivityList";
import type { Activity } from "@/sanity/lib/types";

function makeActivities(n: number): Activity[] {
  return Array.from({ length: n }, (_, i) => ({
    title: `Activity ${i + 1}`,
    time: `0${i + 1}:00`,
    note: i % 2 === 0 ? `note ${i}` : undefined,
  })) as Activity[];
}

describe("ActivityList", () => {
  it("renders empty state when activities is null", () => {
    render(<ActivityList activities={null} />);
    expect(screen.getByText("No activities logged yet.")).toBeInTheDocument();
  });

  it("renders empty state for empty array", () => {
    render(<ActivityList activities={[]} />);
    expect(screen.getByText("No activities logged yet.")).toBeInTheDocument();
  });

  it("renders all activities with title, time, note", () => {
    render(<ActivityList activities={makeActivities(3)} />);
    expect(screen.getByText("Activity 1")).toBeInTheDocument();
    expect(screen.getByText("Activity 2")).toBeInTheDocument();
    expect(screen.getByText("Activity 3")).toBeInTheDocument();
    expect(screen.getByText("01:00")).toBeInTheDocument();
    expect(screen.getByText("note 0")).toBeInTheDocument();
  });

  it("does not show scroll hint when 4 or fewer items", () => {
    render(<ActivityList activities={makeActivities(4)} />);
    expect(screen.queryByText("Scroll for more")).not.toBeInTheDocument();
  });

  it("shows scroll hint when more than 4 items", () => {
    render(<ActivityList activities={makeActivities(5)} />);
    expect(screen.getByText("Scroll for more")).toBeInTheDocument();
  });
});
