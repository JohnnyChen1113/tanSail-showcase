import { createFileRoute } from "@tanstack/react-router";

import { LocalizedHomePage } from "#/components/home/localized-home-page";
import { createLocalizedSiteConfig } from "#/config/site";
import { getDictionary } from "#/i18n";
import { createLocalizedHeadLinks, createLocalizedMetaTags } from "#/lib/seo";

const locale = "en";
const dictionary = getDictionary(locale);
const config = createLocalizedSiteConfig(locale, dictionary);

export const Route = createFileRoute("/en")({
  head: () => ({
    meta: createLocalizedMetaTags(config, locale, dictionary),
    links: createLocalizedHeadLinks(config, locale),
  }),
  component: () => <LocalizedHomePage locale={locale} />,
});
