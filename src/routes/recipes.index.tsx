import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

import { PresetToggle } from "#/components/preset-toggle";
import { ThemeToggle } from "#/components/theme-toggle";
import { recipeCatalog } from "#/config/recipes";

export const Route = createFileRoute("/recipes/")({
  head: () => ({
    meta: [
      { title: "Page recipes — TanSail" },
      {
        name: "description",
        content:
          "Six composable TanSail landing-page recipes for common product and service sites.",
      },
    ],
  }),
  component: RecipeIndexPage,
});

function RecipeIndexPage() {
  return (
    <div className="recipe-index-page">
      <header className="recipe-index-header">
        <div>
          <Link to="/" className="gallery-back-link">
            <ArrowLeftIcon aria-hidden="true" /> Back to site
          </Link>
          <p className="block-eyebrow">Complete compositions</p>
          <h1>Choose a page recipe, then make it yours.</h1>
          <p>
            Each recipe is a typed ordering of reusable blocks. It is a starting narrative, not a
            locked template.
          </p>
        </div>
        <div className="gallery-theme-controls">
          <PresetToggle />
          <ThemeToggle />
        </div>
      </header>
      <main className="recipe-card-grid">
        {recipeCatalog.map((recipe, index) => (
          <article key={recipe.id}>
            <div className="recipe-card-meta">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span>{recipe.preset}</span>
            </div>
            <p>{recipe.audience}</p>
            <h2>{recipe.label}</h2>
            <p>{recipe.summary}</p>
            <Link to="/recipes/$recipeId/" params={{ recipeId: recipe.id }}>
              Preview recipe <ArrowRightIcon aria-hidden="true" />
            </Link>
          </article>
        ))}
      </main>
    </div>
  );
}
