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
