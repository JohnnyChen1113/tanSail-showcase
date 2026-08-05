import { type LandingBlockConfig } from "#/config/blocks";
import { siteBriefSchema } from "#/config/brief";
import generatedSite from "#/config/generated/site.json";
import { getRecipe, getRecipeBlocks } from "#/config/recipes";

export const generatedSiteBrief = siteBriefSchema.parse(generatedSite);

const generatedRecipe = getRecipe(generatedSiteBrief.recipe);

if (!generatedRecipe) {
  throw new Error(`Generated site references an unknown recipe: ${generatedSiteBrief.recipe}`);
}

export const generatedSitePlan = {
  brief: generatedSiteBrief,
  recipe: generatedRecipe,
  unresolved: generatedSiteBrief.deployment.domain
    ? []
    : ["Choose a production domain before deployment."],
};

export function getGeneratedSiteBlocks(): Array<LandingBlockConfig> {
  const selectedSections = generatedSiteBrief.pages[0]?.sections ?? [];

  return getRecipeBlocks(generatedSitePlan.recipe)
    .filter((block) => selectedSections.includes(block.kind))
    .map((block) => {
      if (block.kind === "hero") {
        return {
          ...block,
          eyebrow: generatedSiteBrief.audience.primary,
          title: generatedSiteBrief.brand.tagline,
          description: generatedSiteBrief.audience.outcome,
          primaryAction: {
            label: `Start with ${generatedSiteBrief.brand.name}`,
            href: "#features",
          },
        };
      }

      if (block.kind === "cta") {
        return {
          ...block,
          eyebrow: generatedSiteBrief.brand.name,
          title: generatedSiteBrief.brand.tagline,
          description: generatedSiteBrief.brand.description,
        };
      }

      return block;
    });
}
