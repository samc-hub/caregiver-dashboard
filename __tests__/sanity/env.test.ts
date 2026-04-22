import { describe, it, expect } from "vitest";
import { assertValue } from "@/sanity/env";

describe("assertValue", () => {
  it("returns value when defined", () => {
    expect(assertValue("hello", "missing")).toBe("hello");
    expect(assertValue(0, "missing")).toBe(0);
    expect(assertValue(false, "missing")).toBe(false);
    expect(assertValue(null, "missing")).toBe(null);
  });

  it("throws with provided message when undefined", () => {
    expect(() => assertValue(undefined, "boom")).toThrow("boom");
  });

  it("preserves generic type", () => {
    const n: number = assertValue<number>(42, "missing");
    expect(n).toBe(42);
  });
});
