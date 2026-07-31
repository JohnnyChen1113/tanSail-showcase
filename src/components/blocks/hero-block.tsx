import { ActionLink } from "#/components/blocks/action-link";
import { MotionReveal } from "#/components/blocks/motion-reveal";
import type { HeroBlockConfig } from "#/config/blocks";

export function HeroBlock({ block }: { readonly block: HeroBlockConfig }) {
  const headingId = `${block.id}-title`;

  return (
    <section
      id={block.id}
      className="landing-block hero-block"
      data-variant={block.variant}
      aria-labelledby={headingId}
    >
      <MotionReveal className="hero-block-content">
        <p className="block-eyebrow">{block.eyebrow}</p>
        <h2 id={headingId}>{block.title}</h2>
        <p className="hero-block-description">{block.description}</p>
        <div className="block-actions">
          <ActionLink action={block.primaryAction} />
          {block.secondaryAction ? <ActionLink action={block.secondaryAction} secondary /> : null}
        </div>
        {block.note ? <p className="hero-block-note">{block.note}</p> : null}
      </MotionReveal>
      <div className="hero-block-art" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </section>
  );
}
