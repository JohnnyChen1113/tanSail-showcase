import { Link } from "@tanstack/react-router";

import type { SiteConfig } from "#/config/site";

export function Brand({ config }: { readonly config: SiteConfig }) {
  return (
    <Link className="brand" to="/" aria-label={`${config.metadata.name} home`}>
      <span aria-hidden="true" className="brand-mark">
        <span />
        <span />
      </span>
      <span>{config.metadata.name}</span>
    </Link>
  );
}
