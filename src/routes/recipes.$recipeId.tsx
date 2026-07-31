import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeftIcon, LayoutGridIcon } from "lucide-react";

import { LandingBlock } from "#/components/blocks/landing-block";
import { PresetToggle } from "#/components/preset-toggle";
import { ThemeToggle } from "#/components/theme-toggle";
import { getRecipe, getRecipeBlocks } from "#/config/recipes";

export const Route = createFileRoute("/recipes/$recipeId")({
  loader: ({ params }) => {
    const recipe = getRecipe(params.recipeId);
    if (!recipe) throw notFound();
    return recipe;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Page recipe — TanSail" }] };

    return {
      meta: [
        { title: `${loaderData.label} recipe — TanSail` },
        { name: "description", content: loaderData.summary },
      ],
    };
  },
  component: RecipeDetailPage,
});

function RecipeDetailPage() {
  const recipe = Route.useLoaderData();
  const blocks = getRecipeBlocks(recipe);

  return (
    <div className="recipe-detail-page">
      <header className="recipe-detail-header">
        <Link from={Route.fullPath} to=".." className="gallery-back-link">
          <ArrowLeftIcon aria-hidden="true" /> All recipes
        </Link>
        <div>
          <div>
            <p className="block-eyebrow">{recipe.audience}</p>
            <h1>{recipe.label}</h1>
            <p>{recipe.summary}</p>
          </div>
          <div className="recipe-detail-tools">
            <span>
              <LayoutGridIcon aria-hidden="true" /> {blocks.length} blocks
            </span>
            <span>Suggested: {recipe.preset}</span>
            <PresetToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="recipe-composition">
        {blocks.map((block) => (
          <LandingBlock key={block.id} block={block} />
        ))}
      </main>
    </div>
  );
}
