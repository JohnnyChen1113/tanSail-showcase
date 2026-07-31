import { Link } from "@tanstack/react-router";

import type { SiteConfig } from "#/config/site";
import { getLocalizedPath, type Locale } from "#/i18n";

import { TanSailMark } from "./tansail-mark";

export function Brand({
  config,
  locale,
}: {
  readonly config: SiteConfig;
  readonly locale: Locale;
}) {
  return (
    <Link
      className="brand"
      to={getLocalizedPath(locale)}
      aria-label={`${config.metadata.name} home`}
    >
      <TanSailMark />
      <span>{config.metadata.name}</span>
    </Link>
  );
}
