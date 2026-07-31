import { lint } from "@google/design.md/linter";
import { describe, expect, it } from "vite-plus/test";

import {
  referenceBriefSchema,
  renderReferenceDesignContract,
  renderSiteBrief,
} from "#/config/reference-brief";

const fixture = {
  version: 1,
  project: {
    name: "Northstar",
    audience: "Independent product builders",
    outcome: "Explain the product and earn a first click",
    locales: ["en", "zh"],
  },
  sources: [
    {
      type: "url",
      locator: "https://example.com/reference",
      usage: "inspiration-only",
      observations: {
        hierarchy: ["Short promise beside a concrete product frame"],
        typography: ["Compact Latin display with calm body copy"],
        color: ["Neutral canvas with one cool accent"],
        interaction: ["Floating navigation controls"],
        avoid: ["Brand marks", "verbatim copy", "proprietary screenshots"],
      },
    },
  ],
  direction: {
    name: "Quiet Signal",
    principles: ["Product evidence before decoration", "Language-aware typography"],
    materials: ["Opaque editorial cards", "Glass controls only"],
    proof: ["Live interface composition", "Verifiable quality checks"],
  },
  originality: {
    copySourceCode: false,
    copyAssets: false,
    exactReproduction: false,
    transformations: [
      "Use a different grid",
      "Create an original palette",
      "Replace all product imagery",
    ],
  },
} as const;

describe("reference-to-TanSail brief", () => {
  it("accepts observation-based inspiration with explicit clean-room constraints", () => {
    expect(referenceBriefSchema.parse(fixture).sources[0]?.usage).toBe("inspiration-only");
  });

  it("rejects exact cloning or copied code and assets", () => {
    for (const field of ["copySourceCode", "copyAssets", "exactReproduction"] as const) {
      expect(() =>
        referenceBriefSchema.parse({
          ...fixture,
          originality: { ...fixture.originality, [field]: true },
        }),
      ).toThrow();
    }
  });

  it("renders a site brief and proposed design contract without copying source content", () => {
    const brief = referenceBriefSchema.parse(fixture);
    const siteBrief = renderSiteBrief(brief);
    const designContract = renderReferenceDesignContract(brief);

    expect(siteBrief).toContain("## Reference observations");
    expect(siteBrief).toContain("Do not copy source code, copy, brand assets, or screenshots");
    expect(designContract).toContain("name: Quiet Signal");
    expect(designContract).toContain("## Do's and Don'ts");
    expect(designContract).not.toContain("Brand marks");
    expect(lint(designContract).summary.errors).toBe(0);
  });
});
