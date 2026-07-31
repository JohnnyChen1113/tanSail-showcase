import { Link } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";
import type { ReactNode } from "react";

import { PresetToggle } from "#/components/preset-toggle";
import { ThemeToggle } from "#/components/theme-toggle";

export function MarketingPageShell({
  children,
  description,
  eyebrow,
  title,
}: {
  readonly children: ReactNode;
  readonly description: string;
  readonly eyebrow: string;
  readonly title: string;
}) {
  return (
    <div className="marketing-page">
      <header className="marketing-page-header">
        <div>
          <Link to="/" className="gallery-back-link">
            <ArrowLeftIcon aria-hidden="true" /> Back to site
          </Link>
          <p className="block-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div className="gallery-theme-controls">
          <PresetToggle />
          <ThemeToggle />
        </div>
      </header>
      <main className="marketing-page-content">{children}</main>
    </div>
  );
}
