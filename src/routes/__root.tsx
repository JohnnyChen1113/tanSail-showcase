import { createRootRoute, HeadContent, Scripts, useRouterState } from "@tanstack/react-router";

import { PresetProvider } from "#/components/preset-provider";
import { ThemeProvider } from "#/components/theme-provider";
import { presetCatalog } from "#/config/presets";
import { siteConfig } from "#/config/site";
import { resolveLocaleFromPath } from "#/i18n";
import { createPresetStyleSheet } from "#/lib/presets";
import { createBaseHeadLinks, createBaseMetaTags } from "#/lib/seo";

import appCss from "#/styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: createBaseMetaTags(siteConfig),
    links: [...createBaseHeadLinks(), { rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { readonly children: React.ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const locale = resolveLocaleFromPath(pathname);

  return (
    // suppress since we're updating the "dark" class in ThemeProvider
    <html lang={locale === "zh" ? "zh-CN" : "en"} data-locale={locale} suppressHydrationWarning>
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
