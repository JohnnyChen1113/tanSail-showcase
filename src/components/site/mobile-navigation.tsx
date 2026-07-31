import { MenuIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { buttonVariants } from "#/components/ui/button";
import { Button } from "#/components/ui/button";
import type { SiteConfig } from "#/config/site";

import { SiteLink } from "./site-link";

const menuId = "mobile-site-navigation";

export function MobileNavigation({ config }: { readonly config: SiteConfig }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <div className="mobile-navigation">
      <Button
        variant="ghost"
        size="icon-lg"
        type="button"
        aria-controls={menuId}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? <XIcon aria-hidden="true" /> : <MenuIcon aria-hidden="true" />}
      </Button>

      <div id={menuId} className="mobile-navigation-panel" hidden={!isOpen}>
        <nav aria-label="Mobile navigation">
          {config.navigation.map((link) => (
            <SiteLink
              key={link.label}
              className="mobile-navigation-link"
              link={link}
              onClick={close}
            />
          ))}
        </nav>
        <SiteLink
          className={buttonVariants({ size: "lg", className: "w-full" })}
          link={config.actions.primary}
          onClick={close}
        />
      </div>
    </div>
  );
}
