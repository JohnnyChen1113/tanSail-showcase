import { z } from "zod";

import { blockCatalog } from "#/config/blocks";

const recipeIdSchema = z.enum([
  "saas-product",
  "ai-tool",
  "open-source",
  "indie-product",
  "knowledge-business",
  "consulting-studio",
]);

const blockIdSchema = z.enum([
  "hero-editorial",
  "hero-product",
  "hero-minimal",
  "logo-cloud",
  "features-grid",
  "features-bento",
  "features-split",
  "use-cases",
  "testimonials",
  "pricing",
  "faq",
  "stats",
  "cta-banner",
  "cta-split",
]);

const recipeSchema = z.object({
  id: recipeIdSchema,
  label: z.string().min(1),
  audience: z.string().min(1),
  summary: z.string().min(1),
  preset: z.enum(["harbor", "horizon", "nightwatch"]),
  blockIds: z.array(blockIdSchema).min(4),
});

const recipeCatalogSchema = z.object({
  recipes: z.array(recipeSchema).length(6),
});

export type PageRecipe = z.infer<typeof recipeSchema>;
export type RecipeId = z.infer<typeof recipeIdSchema>;

export const recipeIds = recipeIdSchema.options;

export const recipeCatalog = recipeCatalogSchema.parse({
  recipes: [
    {
      id: "saas-product",
      label: "SaaS product",
      audience: "Product-led software teams",
      summary:
        "A direct value proposition supported by capabilities, proof, plans, and objections.",
      preset: "horizon",
      blockIds: [
        "hero-product",
        "logo-cloud",
        "features-grid",
        "use-cases",
        "stats",
        "testimonials",
        "pricing",
        "faq",
        "cta-banner",
      ],
    },
    {
      id: "ai-tool",
      label: "AI tool",
      audience: "AI products and automation tools",
      summary: "Lead with the new capability, then make trust, workflow, and pricing concrete.",
      preset: "nightwatch",
      blockIds: [
        "hero-product",
        "features-bento",
        "use-cases",
        "stats",
        "pricing",
        "faq",
        "cta-banner",
      ],
    },
    {
      id: "open-source",
      label: "Open-source project",
      audience: "Maintainers and developer communities",
      summary:
        "A compact introduction with ecosystem context, technical strengths, and adoption proof.",
      preset: "nightwatch",
      blockIds: [
        "hero-minimal",
        "logo-cloud",
        "features-split",
        "stats",
        "testimonials",
        "faq",
        "cta-split",
      ],
    },
    {
      id: "indie-product",
      label: "Indie product",
      audience: "Solo makers and small product teams",
      summary: "Keep the story personal, focused, and close to the product’s clearest outcome.",
      preset: "harbor",
      blockIds: [
        "hero-editorial",
        "features-split",
        "use-cases",
        "testimonials",
        "pricing",
        "faq",
        "cta-split",
      ],
    },
    {
      id: "knowledge-business",
      label: "Knowledge business",
      audience: "Educators, writers, and expert-led products",
      summary: "Build authority through an editorial opening, clear outcomes, and human proof.",
      preset: "harbor",
      blockIds: [
        "hero-editorial",
        "logo-cloud",
        "use-cases",
        "features-grid",
        "testimonials",
        "pricing",
        "faq",
        "cta-banner",
      ],
    },
    {
      id: "consulting-studio",
      label: "Consulting studio",
      audience: "Specialist consultancies and product studios",
      summary:
        "Frame the point of view, demonstrate the method, and invite a high-intent conversation.",
      preset: "harbor",
      blockIds: [
        "hero-editorial",
        "logo-cloud",
        "features-bento",
        "use-cases",
        "testimonials",
        "stats",
        "faq",
        "cta-split",
      ],
    },
  ],
}).recipes;

export function getRecipe(recipeId: string) {
  return recipeCatalog.find((recipe) => recipe.id === recipeId);
}

export function getRecipeBlocks(recipe: PageRecipe) {
  return recipe.blockIds.map((blockId) => {
    const block = blockCatalog.find((candidate) => candidate.id === blockId);
    if (!block) throw new Error(`Recipe references missing block: ${blockId}`);
    return block;
  });
}
