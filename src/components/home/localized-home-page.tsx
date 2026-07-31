import { ArrowDownIcon, ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";

import { CopyCommand } from "#/components/home/copy-command";
import { ProductPreview } from "#/components/home/product-preview";
import { SiteLink } from "#/components/site/site-link";
import { SiteShell } from "#/components/site/site-shell";
import { buttonVariants } from "#/components/ui/button";
import { createLocalizedSiteConfig } from "#/config/site";
import { getDictionary, type Locale } from "#/i18n";

export function LocalizedHomePage({ locale }: { readonly locale: Locale }) {
  const dictionary = getDictionary(locale);
  const config = createLocalizedSiteConfig(locale, dictionary);

  return (
    <SiteShell config={config} dictionary={dictionary} locale={locale}>
      <section className="luminous-hero" aria-labelledby="hero-title">
        <div className="luminous-hero-copy">
          <p className="luminous-eyebrow">{dictionary.hero.eyebrow}</p>
          <h1 id="hero-title" data-locale={locale}>
            {dictionary.hero.title}
          </h1>
          <p className="luminous-hero-description">{dictionary.hero.description}</p>
          <div className="luminous-hero-actions">
            <SiteLink className={buttonVariants({ size: "lg" })} link={config.actions.primary}>
              {config.actions.primary.label}
              <ArrowUpRightIcon aria-hidden="true" />
            </SiteLink>
            {config.actions.secondary ? (
              <SiteLink className="quiet-action" link={config.actions.secondary}>
                {config.actions.secondary.label}
                <ArrowDownIcon aria-hidden="true" />
              </SiteLink>
            ) : null}
          </div>
          <CopyCommand label={dictionary.actions.copyCommand} />
          <p className="luminous-hero-note">{dictionary.hero.note}</p>
        </div>
        <ProductPreview locale={locale} />
      </section>

      <section className="proof-strip" aria-label={dictionary.proof.label}>
        <p>{dictionary.proof.label}</p>
        <ul>
          {dictionary.proof.values.map((value) => (
            <li key={value}>{value}</li>
          ))}
        </ul>
      </section>

      <section id="system" className="luminous-section" aria-labelledby="system-title">
        <header className="luminous-section-heading">
          <p>{dictionary.system.eyebrow}</p>
          <div>
            <h2 id="system-title">{dictionary.system.title}</h2>
            <p>{dictionary.system.description}</p>
          </div>
        </header>
        <div className="system-grid">
          {dictionary.system.items.map((item, index) => (
            <article key={item.title} data-featured={index === 0}>
              <div className="system-card-meta">
                <span>{item.kicker}</span>
                <strong>{item.metric}</strong>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="system-card-visual" aria-hidden="true" data-visual={index}>
                <i />
                <i />
                <i />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="workflow"
        className="luminous-section workflow-section"
        aria-labelledby="workflow-title"
      >
        <header className="luminous-section-heading">
          <p>{dictionary.workflow.eyebrow}</p>
          <div>
            <h2 id="workflow-title">{dictionary.workflow.title}</h2>
            <p>{dictionary.workflow.description}</p>
          </div>
        </header>
        <ol className="workflow-list">
          {dictionary.workflow.steps.map((step) => (
            <li key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <ArrowRightIcon aria-hidden="true" />
            </li>
          ))}
        </ol>
      </section>

      <section
        id="quality"
        className="luminous-section quality-section"
        aria-labelledby="quality-title"
      >
        <header className="luminous-section-heading">
          <p>{dictionary.quality.eyebrow}</p>
          <div>
            <h2 id="quality-title">{dictionary.quality.title}</h2>
            <p>{dictionary.quality.description}</p>
          </div>
        </header>
        <dl className="quality-grid">
          {dictionary.quality.items.map((item) => (
            <div key={item.label}>
              <dd>{item.value}</dd>
              <dt>{item.label}</dt>
              <p>{item.detail}</p>
            </div>
          ))}
        </dl>
      </section>

      <section id="faq" className="luminous-section faq-section" aria-labelledby="faq-title">
        <header className="luminous-section-heading">
          <p>{dictionary.faq.eyebrow}</p>
          <div>
            <h2 id="faq-title">{dictionary.faq.title}</h2>
          </div>
        </header>
        <div className="luminous-faq-list">
          {dictionary.faq.items.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="luminous-cta" aria-labelledby="cta-title">
        <p>{dictionary.cta.eyebrow}</p>
        <h2 id="cta-title">{dictionary.cta.title}</h2>
        <span>{dictionary.cta.description}</span>
        <SiteLink className={buttonVariants({ size: "lg" })} link={config.actions.primary}>
          {config.actions.primary.label}
          <ArrowUpRightIcon aria-hidden="true" />
        </SiteLink>
      </section>
    </SiteShell>
  );
}
