import { ArrowUpRightIcon } from "lucide-react";

import { PresetToggle } from "#/components/preset-toggle";
import { ThemeToggle } from "#/components/theme-toggle";
import { buttonVariants } from "#/components/ui/button";
import type { SiteConfig } from "#/config/site";

import { Brand } from "./brand";
import { MobileNavigation } from "./mobile-navigation";
import { SiteLink } from "./site-link";

export function SiteHeader({ config }: { readonly config: SiteConfig }) {
  return (
    <header className="site-header">
      <Brand config={config} />

      <div className="desktop-header-actions">
        <nav className="desktop-navigation" aria-label="Primary navigation">
          {config.navigation.map((link) => (
            <SiteLink key={link.label} className="site-navigation-link" link={link} />
          ))}
        </nav>

        <PresetToggle />
        <ThemeToggle />
        <SiteLink className={buttonVariants({ size: "lg" })} link={config.actions.primary}>
          {config.actions.primary.label}
          <ArrowUpRightIcon aria-hidden="true" />
        </SiteLink>
      </div>

      <div className="mobile-header-actions">
        <PresetToggle />
        <ThemeToggle />
        <MobileNavigation config={config} />
      </div>
    </header>
  );
}
