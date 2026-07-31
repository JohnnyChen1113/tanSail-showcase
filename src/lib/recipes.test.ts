import { describe, expect, it } from "vite-plus/test";

import { getRecipe, getRecipeBlocks, recipeCatalog, recipeIds } from "#/config/recipes";

describe("page recipes", () => {
  it("ships every named recipe exactly once", () => {
    expect(recipeCatalog.map((recipe) => recipe.id)).toEqual(recipeIds);
    expect(new Set(recipeCatalog.map((recipe) => recipe.id)).size).toBe(recipeCatalog.length);
  });

  it("resolves every configured block reference", () => {
    for (const recipe of recipeCatalog) {
      expect(getRecipeBlocks(recipe)).toHaveLength(recipe.blockIds.length);
    }
  });

  it("keeps each recipe substantial and conversion-oriented", () => {
    for (const recipe of recipeCatalog) {
      const blocks = getRecipeBlocks(recipe);
      expect(blocks.length).toBeGreaterThanOrEqual(7);
      expect(blocks[0]?.kind).toBe("hero");
      expect(blocks.at(-1)?.kind).toBe("cta");
    }
  });

  it("returns undefined for an unknown recipe", () => {
    expect(getRecipe("not-a-recipe")).toBeUndefined();
  });
});
