import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRightIcon } from "lucide-react";

import { MarketingPageShell } from "#/components/content/marketing-page-shell";
import { StructuredData } from "#/components/content/structured-data";
import { contactPage } from "#/config/marketing";
import { siteConfig } from "#/config/site";
import { createOrganizationJsonLd } from "#/lib/structured-data";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact-page starter — TanSail" }] }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <MarketingPageShell
      eyebrow="Browser-only contact recipe"
      title={contactPage.title}
      description={contactPage.description}
    >
      <StructuredData
        data={createOrganizationJsonLd({
          name: siteConfig.metadata.name,
          siteUrl: siteConfig.metadata.siteUrl,
        })}
      />
      <div className="contact-grid">
        {contactPage.channels.map((channel) => (
          <article key={channel.label}>
            <p>{channel.label}</p>
            <h2>{channel.value}</h2>
            <p>{channel.description}</p>
            <a href={channel.href}>
              Write an email <ArrowUpRightIcon aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>
      <aside className="contact-note">
        TanSail does not add a form backend, email provider, database, or spam-protection service to
        the starter core. Add one only when the project requirements justify it.
      </aside>
    </MarketingPageShell>
  );
}
