import { ArrowUpRightIcon } from "lucide-react";

import { PresetToggle } from "#/components/preset-toggle";
import { ThemeToggle } from "#/components/theme-toggle";
import { buttonVariants } from "#/components/ui/button";
import type { SiteConfig } from "#/config/site";
import type { Dictionary, Locale } from "#/i18n";

import { Brand } from "./brand";
import { LanguageSwitcher } from "./language-switcher";
import { MobileNavigation } from "./mobile-navigation";
import { SiteLink } from "./site-link";

export function SiteHeader({
  config,
  dictionary,
  locale,
}: {
  readonly config: SiteConfig;
  readonly dictionary: Dictionary;
  readonly locale: Locale;
}) {
  return (
    <header className="site-header">
      <Brand config={config} locale={locale} />

      <div className="desktop-header-actions">
        <nav className="desktop-navigation" aria-label={dictionary.a11y.primaryNavigation}>
          {config.navigation.map((link) => (
            <SiteLink key={link.label} className="site-navigation-link" link={link} />
          ))}
        </nav>

        <LanguageSwitcher dictionary={dictionary} locale={locale} />
        <PresetToggle dictionary={dictionary} label={dictionary.a11y.themeSwitcher} />
        <ThemeToggle dictionary={dictionary} label={dictionary.a11y.themeSwitcher} />
        <SiteLink className={buttonVariants({ size: "lg" })} link={config.actions.primary}>
          {config.actions.primary.label}
          <ArrowUpRightIcon aria-hidden="true" />
        </SiteLink>
      </div>

      <div className="mobile-header-actions">
        <LanguageSwitcher dictionary={dictionary} locale={locale} />
        <PresetToggle dictionary={dictionary} label={dictionary.a11y.themeSwitcher} />
        <ThemeToggle dictionary={dictionary} label={dictionary.a11y.themeSwitcher} />
        <MobileNavigation config={config} dictionary={dictionary} />
      </div>
    </header>
  );
}
