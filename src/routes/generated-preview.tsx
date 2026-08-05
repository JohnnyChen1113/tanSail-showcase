import { createFileRoute, Link, ScriptOnce } from "@tanstack/react-router";
import { AlertCircleIcon, ArrowLeftIcon, WandSparklesIcon } from "lucide-react";
import { useEffect } from "react";

import { LandingBlock } from "#/components/blocks/landing-block";
import { usePreset } from "#/components/preset-provider";
import { PresetToggle } from "#/components/preset-toggle";
import { ThemeToggle } from "#/components/theme-toggle";
import { generatedSitePlan, getGeneratedSiteBlocks } from "#/config/generated-site";

export const Route = createFileRoute("/generated-preview")({
  head: () => ({
    meta: [
      { title: `${generatedSitePlan.brief.brand.name} — generated with TanSail` },
      { name: "description", content: generatedSitePlan.brief.brand.description },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: GeneratedPreviewPage,
});

const generatedPresetScript = `(function(){var p=${JSON.stringify(generatedSitePlan.brief.preset)};document.documentElement.dataset.preset=p;try{localStorage.setItem("tansail-preset",p)}catch(e){}})();`;

function GeneratedPreviewPage() {
  const blocks = getGeneratedSiteBlocks();
  const { preset, setPreset } = usePreset();

  useEffect(() => {
    if (preset === generatedSitePlan.brief.preset) return;

    const syncPreset = window.setTimeout(() => {
      setPreset(generatedSitePlan.brief.preset);
    }, 0);

    return () => window.clearTimeout(syncPreset);
  }, [preset, setPreset]);

  return (
    <>
      <ScriptOnce>{generatedPresetScript}</ScriptOnce>
      <div className="recipe-detail-page generated-preview-page">
        <header className="recipe-detail-header generated-preview-header">
          <Link to="/recipes/" className="gallery-back-link">
            <ArrowLeftIcon aria-hidden="true" /> Page recipes
          </Link>
          <div>
            <div>
              <p className="block-eyebrow">
                <WandSparklesIcon aria-hidden="true" /> Generated fixture
              </p>
              <h1>{generatedSitePlan.brief.brand.name}</h1>
              <p>{generatedSitePlan.brief.brand.description}</p>
            </div>
            <div className="recipe-detail-tools">
              <span>{generatedSitePlan.recipe.label}</span>
              <span>{generatedSitePlan.brief.preset} preset</span>
              <PresetToggle />
              <ThemeToggle />
            </div>
          </div>
          {generatedSitePlan.unresolved.length > 0 ? (
            <div className="generation-notice" role="status">
              <AlertCircleIcon aria-hidden="true" />
              <div>
                <strong>Before deployment</strong>
                <ul>
                  {generatedSitePlan.unresolved.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </header>
        <main className="recipe-composition">
          {blocks.map((block) => (
            <LandingBlock key={block.id} block={block} />
          ))}
        </main>
      </div>
    </>
  );
}
