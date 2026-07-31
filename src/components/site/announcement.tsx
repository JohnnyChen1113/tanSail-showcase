import { ArrowUpRightIcon } from "lucide-react";

import type { SiteConfig } from "#/config/site";

import { SiteLink } from "./site-link";

export function Announcement({ config }: { readonly config: SiteConfig }) {
  if (!config.announcement) return null;

  return (
    <aside className="announcement" aria-label="Announcement">
      <p>{config.announcement.text}</p>
      {config.announcement.action ? (
        <SiteLink className="announcement-link" link={config.announcement.action}>
          {config.announcement.action.label}
          <ArrowUpRightIcon aria-hidden="true" />
        </SiteLink>
      ) : null}
    </aside>
  );
}
