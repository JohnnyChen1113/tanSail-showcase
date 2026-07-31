import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import type { SiteLinkConfig } from "#/config/site";

type SiteLinkProps = {
  readonly children?: ReactNode;
  readonly className?: string;
  readonly link: SiteLinkConfig;
  readonly onClick?: () => void;
};

export function SiteLink({ children, className, link, onClick }: SiteLinkProps) {
  const content = children ?? link.label;

  if (link.kind === "route") {
    return (
      <Link className={className} to={link.to} onClick={onClick}>
        {content}
      </Link>
    );
  }

  if (link.kind === "external") {
    return (
      <a
        className={className}
        href={link.href}
        target={link.newTab ? "_blank" : undefined}
        rel={link.newTab ? "noopener noreferrer" : undefined}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <a className={className} href={link.href} onClick={onClick}>
      {content}
    </a>
  );
}
