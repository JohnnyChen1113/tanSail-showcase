import { describe, expect, it } from "vite-plus/test";

import { presetCatalog, presetIds } from "#/config/presets";
import { createPresetStyleSheet, isPresetId } from "#/lib/presets";

describe("visual preset catalog", () => {
  it("keeps every atmosphere distinct and allows intentional structural systems", () => {
    expect(presetCatalog.presets.map((preset) => preset.id)).toEqual(presetIds);

    const atmosphericDimensions = [
      presetCatalog.presets.map((preset) => JSON.stringify(preset.tokens.colors)),
      presetCatalog.presets.map((preset) => JSON.stringify(preset.tokens.typography)),
    ];

    for (const definitions of atmosphericDimensions) {
      expect(new Set(definitions).size).toBe(presetIds.length);
    }

    const harbor = presetCatalog.presets.find((preset) => preset.id === "harbor");
    const ledger = presetCatalog.presets.find((preset) => preset.id === "ledger");

    expect(harbor).toBeDefined();
    expect(ledger).toBeDefined();

    for (const dimension of ["density", "geometry", "composition"] as const) {
      expect(ledger?.tokens[dimension]).not.toEqual(harbor?.tokens[dimension]);
    }
  });

  it("recognizes only configured preset identifiers", () => {
    expect(isPresetId("harbor", presetCatalog)).toBe(true);
    expect(isPresetId("horizon", presetCatalog)).toBe(true);
    expect(isPresetId("nightwatch", presetCatalog)).toBe(true);
    expect(isPresetId("ledger", presetCatalog)).toBe(true);
    expect(isPresetId("unknown", presetCatalog)).toBe(false);
  });

  it("generates complete light, dark, and structural CSS for every preset", () => {
    const stylesheet = createPresetStyleSheet(presetCatalog);

    for (const preset of presetCatalog.presets) {
      expect(stylesheet).toContain(`html[data-preset="${preset.id}"]`);
      expect(stylesheet).toContain(`html.dark[data-preset="${preset.id}"]`);
    }

    expect(stylesheet).toContain("--font-heading:");
    expect(stylesheet).toContain("--section-space:");
    expect(stylesheet).toContain("--control-radius:");
    expect(stylesheet).toContain("--background:");
    expect(stylesheet).toContain("--section-columns:");
  });
});
