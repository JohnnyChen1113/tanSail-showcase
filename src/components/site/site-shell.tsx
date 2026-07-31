import type { ReactNode } from "react";

import type { SiteConfig } from "#/config/site";

import { Announcement } from "./announcement";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function SiteShell({
  children,
  config,
}: {
  readonly children: ReactNode;
  readonly config: SiteConfig;
}) {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Announcement config={config} />
      <SiteHeader config={config} />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter config={config} />
    </div>
  );
}
