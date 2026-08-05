import { describe, expect, it } from "vite-plus/test";

import { siteBriefSchema } from "#/config/brief";
import { generatedSitePlan, getGeneratedSiteBlocks } from "#/config/generated-site";
import fixture from "#/config/generated/site.json";

describe("site brief generation", () => {
  it("accepts the committed generated fixture", () => {
    expect(siteBriefSchema.parse(fixture).brand.name).toBe("TanSail Ledger");
  });

  it("rejects unknown presets and sections", () => {
    expect(() =>
      siteBriefSchema.parse({
        ...fixture,
        preset: "surprise",
        pages: [{ ...fixture.pages[0], sections: ["hero", "unknown"] }],
      }),
    ).toThrow();
  });

  it("turns a brief into a guarded block composition", () => {
    const blocks = getGeneratedSiteBlocks();
    expect(blocks[0]?.kind).toBe("hero");
    expect(blocks.at(-1)?.kind).toBe("cta");
    expect(blocks.map((block) => block.kind)).toEqual(fixture.pages[0]?.sections);
    expect(blocks.some((block) => block.kind === "testimonials")).toBe(false);
    expect(generatedSitePlan.unresolved).toEqual([]);
    expect(generatedSitePlan.brief.deployment.domain).toBe(
      "tansail-official.bioinfoark.workers.dev",
    );
  });
});
