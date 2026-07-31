import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import { PresetProvider } from "#/components/preset-provider";
import { ThemeProvider } from "#/components/theme-provider";
import { presetCatalog } from "#/config/presets";
import { siteConfig } from "#/config/site";
import { createPresetStyleSheet } from "#/lib/presets";
import { createHeadLinks, createMetaTags } from "#/lib/seo";

import appCss from "#/styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: createMetaTags(siteConfig),
    links: [...createHeadLinks(siteConfig), { rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { readonly children: React.ReactNode }) {
  return (
    // suppress since we're updating the "dark" class in ThemeProvider
    <html lang={siteConfig.metadata.locale} suppressHydrationWarning>
      <head>
        <style id="tansail-preset-tokens">{createPresetStyleSheet(presetCatalog)}</style>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider>
          <PresetProvider>{children}</PresetProvider>
        </ThemeProvider>

        <Scripts />
      </body>
    </html>
  );
}
