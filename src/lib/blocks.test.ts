import { describe, expect, it } from "vite-plus/test";

import { blockCatalog, landingBlockSchema } from "#/config/blocks";

describe("landing block catalog", () => {
  it("ships every documented block family", () => {
    const kinds = new Set(blockCatalog.map((block) => block.kind));

    expect(kinds).toEqual(
      new Set([
        "hero",
        "logo-cloud",
        "features",
        "use-cases",
        "testimonials",
        "pricing",
        "faq",
        "stats",
        "cta",
      ]),
    );
  });

  it("ships three hero and three feature compositions", () => {
    const heroVariants = blockCatalog.flatMap((block) =>
      block.kind === "hero" ? [block.variant] : [],
    );
    const featureVariants = blockCatalog.flatMap((block) =>
      block.kind === "features" ? [block.variant] : [],
    );

    expect(heroVariants).toEqual(["editorial", "product", "minimal"]);
    expect(featureVariants).toEqual(["grid", "bento", "split"]);
  });

  it("ships reusable ecosystem, catalog, and testimonial compositions", () => {
    const logoVariants = blockCatalog.flatMap((block) =>
      block.kind === "logo-cloud" ? [block.variant] : [],
    );
    const useCaseVariants = blockCatalog.flatMap((block) =>
      block.kind === "use-cases" ? [block.variant] : [],
    );
    const testimonialVariants = blockCatalog.flatMap((block) =>
      block.kind === "testimonials" ? [block.variant] : [],
    );

    expect(logoVariants).toEqual(["grid", "compact-rail"]);
    expect(useCaseVariants).toEqual(["list", "catalog"]);
    expect(testimonialVariants).toEqual(["grid", "masonry"]);
  });

  it("keeps legacy configs compatible and sample testimonials explicit", () => {
    const logo = landingBlockSchema.parse({
      kind: "logo-cloud",
      id: "legacy-logos",
      title: "Legacy labels",
      logos: ["One", "Two", "Three", "Four"],
    });
    const testimonial = landingBlockSchema.parse({
      kind: "testimonials",
      id: "sample-feedback",
      eyebrow: "Example",
      title: "Sample feedback",
      description: "Replace this content.",
      items: [
        { quote: "Example one", name: "One", role: "Example" },
        { quote: "Example two", name: "Two", role: "Example" },
        { quote: "Example three", name: "Three", role: "Example" },
      ],
    });

    expect(logo.kind === "logo-cloud" && logo.variant).toBe("grid");
    expect(testimonial.kind === "testimonials" && testimonial.evidence.status).toBe("demo");
  });

  it("accepts verified testimonial evidence without a demo label", () => {
    const result = landingBlockSchema.parse({
      kind: "testimonials",
      id: "verified-feedback",
      variant: "masonry",
      eyebrow: "Feedback",
      title: "Verified feedback",
      description: "Permissioned feedback with a source record.",
      evidence: { status: "verified", sourceUrl: "https://example.com/evidence" },
      items: [
        { quote: "Verified one", name: "One", role: "Customer" },
        { quote: "Verified two", name: "Two", role: "Customer" },
        { quote: "Verified three", name: "Three", role: "Customer" },
      ],
    });

    expect(result.kind === "testimonials" && result.evidence.status).toBe("verified");
  });

  it("uses stable unique ids", () => {
    const ids = blockCatalog.map((block) => block.id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.every((id) => /^[a-z][a-z0-9-]*$/.test(id))).toBe(true);
  });

  it("rejects malformed generated blocks", () => {
    const result = landingBlockSchema.safeParse({
      kind: "hero",
      id: "Invalid ID",
      variant: "unknown",
    });

    expect(result.success).toBe(false);
  });
});
