import { readFile } from "node:fs/promises";

import { describe, expect, it } from "vite-plus/test";

import { renderDesignTheme, validateDesignContract } from "../../scripts/design-contract";

describe("DESIGN.md contract", () => {
  it("is valid and documents every required design-system section", async () => {
    const source = await readFile(new URL("../../DESIGN.md", import.meta.url), "utf8");
    const report = validateDesignContract(source);

    expect(report.errors).toEqual([]);
    expect(report.sections).toEqual([
      "Overview",
      "Colors",
      "Typography",
      "Layout",
      "Elevation & Depth",
      "Shapes",
      "Components",
      "Do's and Don'ts",
    ]);
  });

  it("exports deterministic Tailwind v4 tokens for the application", async () => {
    const source = await readFile(new URL("../../DESIGN.md", import.meta.url), "utf8");
    const theme = renderDesignTheme(source);

    expect(theme).toContain("Generated from DESIGN.md");
    expect(theme).toContain("--color-ink: #101722");
    expect(theme).toContain("--font-display-latin:");
    expect(theme).toContain("--radius-glass: 24px");
  });
});
