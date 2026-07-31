import type { ReactNode } from "react";

import type { SiteConfig } from "#/config/site";
import type { Dictionary, Locale } from "#/i18n";

import { Announcement } from "./announcement";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function SiteShell({
  children,
  config,
  dictionary,
  locale,
}: {
  readonly children: ReactNode;
  readonly config: SiteConfig;
  readonly dictionary: Dictionary;
  readonly locale: Locale;
}) {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        {dictionary.a11y.skipToContent}
      </a>
      <Announcement config={config} />
      <SiteHeader config={config} dictionary={dictionary} locale={locale} />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter config={config} dictionary={dictionary} locale={locale} />
    </div>
  );
}
