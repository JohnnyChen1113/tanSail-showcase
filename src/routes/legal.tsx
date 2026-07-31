import { createFileRoute } from "@tanstack/react-router";

import { MarketingPageShell } from "#/components/content/marketing-page-shell";
import { legalPage } from "#/config/marketing";

export const Route = createFileRoute("/legal")({
  head: () => ({ meta: [{ title: "Legal-page starter — TanSail" }] }),
  component: LegalPage,
});

function LegalPage() {
  return (
    <MarketingPageShell
      eyebrow="Replace before launch"
      title={legalPage.title}
      description={legalPage.notice}
    >
      <p className="legal-effective-date">Example effective date: {legalPage.effectiveDate}</p>
      <div className="legal-sections">
        {legalPage.sections.map((section, index) => (
          <section key={section.title} aria-labelledby={`legal-section-${index}`}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h2 id={`legal-section-${index}`}>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </MarketingPageShell>
  );
}
