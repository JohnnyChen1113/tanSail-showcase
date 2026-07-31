import { Link } from "@tanstack/react-router";
import { LanguagesIcon } from "lucide-react";

import { getAlternateLocale, getLocalizedPath, type Dictionary, type Locale } from "#/i18n";

export function LanguageSwitcher({
  dictionary,
  locale,
}: {
  readonly dictionary: Dictionary;
  readonly locale: Locale;
}) {
  const alternateLocale = getAlternateLocale(locale);

  return (
    <Link
      className="glass-control language-switcher"
      to={getLocalizedPath(alternateLocale)}
      aria-label={dictionary.a11y.languageSwitcher}
      lang={alternateLocale === "zh" ? "zh-CN" : "en"}
    >
      <LanguagesIcon aria-hidden="true" />
      <span>{alternateLocale === "zh" ? "中文" : "EN"}</span>
    </Link>
  );
}
