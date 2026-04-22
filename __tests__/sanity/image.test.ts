import { describe, it, expect } from "vitest";
import { urlFor } from "@/sanity/lib/image";

const sampleRef = {
  _type: "image",
  asset: {
    _ref: "image-abc123-800x600-jpg",
    _type: "reference",
  },
};

describe("urlFor", () => {
  it("builds URL with project id and dataset", () => {
    const url = urlFor(sampleRef).url();
    expect(url).toContain("test-project");
    expect(url).toContain("test");
  });

  it("applies auto format, fit max, quality 80", () => {
    const url = urlFor(sampleRef).url();
    expect(url).toContain("auto=format");
    expect(url).toContain("fit=max");
    expect(url).toContain("q=80");
  });

  it("allows further chaining like .width()", () => {
    const url = urlFor(sampleRef).width(320).url();
    expect(url).toContain("w=320");
  });
});
