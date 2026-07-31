import { createFileRoute } from "@tanstack/react-router";

import { LandingBlock } from "#/components/blocks/landing-block";
import { SiteShell } from "#/components/site/site-shell";
import { officialHomeBlocks } from "#/config/official";
import { siteConfig } from "#/config/site";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <SiteShell config={siteConfig}>
      <h1 className="sr-only">TanSail — 为下一个网站，设定更好的航向</h1>
      {officialHomeBlocks.map((block) => (
        <LandingBlock key={block.id} block={block} />
      ))}
    </SiteShell>
  );
}
