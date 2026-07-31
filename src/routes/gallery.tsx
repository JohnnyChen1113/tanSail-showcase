import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeftIcon, MonitorIcon, SmartphoneIcon, TabletIcon } from "lucide-react";
import { useState } from "react";

import { LandingBlock } from "#/components/blocks/landing-block";
import { PresetToggle } from "#/components/preset-toggle";
import { ThemeToggle } from "#/components/theme-toggle";
import { blockCatalog } from "#/config/blocks";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [{ title: "Block gallery — TanSail" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: GalleryPage,
});

const viewportOptions = [
  { id: "desktop", label: "Desktop", icon: MonitorIcon },
  { id: "tablet", label: "Tablet", icon: TabletIcon },
  { id: "mobile", label: "Mobile", icon: SmartphoneIcon },
];

const categoryOptions = [
  { id: "all", label: "All blocks" },
  { id: "hero", label: "Heroes" },
  { id: "features", label: "Features" },
  { id: "proof", label: "Proof" },
  { id: "conversion", label: "Conversion" },
];

function blockCategory(kind: (typeof blockCatalog)[number]["kind"]) {
  if (kind === "hero") return "hero";
  if (kind === "features" || kind === "use-cases") return "features";
  if (kind === "logo-cloud" || kind === "testimonials" || kind === "stats") return "proof";
  return "conversion";
}

function GalleryPage() {
  const [viewport, setViewport] = useState("desktop");
  const [category, setCategory] = useState("all");
  const visibleBlocks = blockCatalog.filter(
    (block) => category === "all" || blockCategory(block.kind) === category,
  );

  return (
    <div className="gallery-page">
      <header className="gallery-header">
        <div>
          <Link to="/" className="gallery-back-link">
            <ArrowLeftIcon aria-hidden="true" /> Back to site
          </Link>
          <p className="block-eyebrow">Local design laboratory</p>
          <h1>TanSail block gallery</h1>
          <p>
            Compare reusable sections across presets, themes, categories, and responsive widths.
          </p>
        </div>
        <div className="gallery-theme-controls" aria-label="Appearance controls">
          <Link to="/recipes" className="gallery-recipe-link">
            Page recipes
          </Link>
          <PresetToggle />
          <ThemeToggle />
        </div>
      </header>

      <div className="gallery-toolbar">
        <fieldset>
          <legend>Block category</legend>
          <div>
            {categoryOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                aria-pressed={category === option.id}
                onClick={() => setCategory(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>Preview width</legend>
          <div>
            {viewportOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-label={`${option.label} preview`}
                  aria-pressed={viewport === option.id}
                  onClick={() => setViewport(option.id)}
                >
                  <Icon aria-hidden="true" />
                  <span>{option.label}</span>
                </button>
              );
            })}
          </div>
        </fieldset>
      </div>

      <main className="gallery-results" aria-live="polite">
        <p className="gallery-result-count">
          Showing {visibleBlocks.length} of {blockCatalog.length} examples
        </p>
        {visibleBlocks.map((block) => (
          <article key={block.id} className="gallery-example">
            <header>
              <div>
                <span>{block.kind}</span>
                <code>{block.id}</code>
              </div>
              {"variant" in block ? <span>{block.variant}</span> : null}
            </header>
            <div className="gallery-canvas" data-viewport={viewport}>
              <div className="gallery-preview">
                <LandingBlock block={block} />
              </div>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
}
