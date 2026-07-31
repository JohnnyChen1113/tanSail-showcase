import type { SiteConfig } from "#/config/site";
import type { Dictionary, Locale } from "#/i18n";

import { Brand } from "./brand";
import { SiteLink } from "./site-link";

export function SiteFooter({
  config,
  dictionary,
  locale,
}: {
  readonly config: SiteConfig;
  readonly dictionary: Dictionary;
  readonly locale: Locale;
}) {
  return (
    <footer className="site-footer">
      <div className="footer-intro">
        <Brand config={config} locale={locale} />
        <p>{config.footer.tagline}</p>
      </div>

      <div className="footer-groups">
        {config.footer.groups.map((group) => (
          <nav key={group.label} aria-label={`${group.label} links`}>
            <h2>{group.label}</h2>
            {group.links.map((link) => (
              <SiteLink key={link.label} link={link} />
            ))}
          </nav>
        ))}
        {config.socialLinks.length > 0 ? (
          <nav aria-label={dictionary.footer.social}>
            <h2>{dictionary.footer.social}</h2>
            {config.socialLinks.map((link) => (
              <SiteLink key={link.label} link={link} />
            ))}
          </nav>
        ) : null}
      </div>

      <div className="footer-legal">
        <p>{config.footer.copyright}</p>
        <div>
          {config.footer.legalLinks.map((link) => (
            <SiteLink key={link.label} link={link} />
          ))}
        </div>
      </div>
    </footer>
  );
}
