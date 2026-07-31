import { ActionLink } from "#/components/blocks/action-link";
import { MotionReveal } from "#/components/blocks/motion-reveal";
import type { CtaBlockConfig } from "#/config/blocks";

export function CtaBlock({ block }: { readonly block: CtaBlockConfig }) {
  return (
    <section
      id={block.id}
      className="landing-block cta-block"
      data-variant={block.variant}
      aria-labelledby={`${block.id}-title`}
    >
      <MotionReveal>
        <div>
          <p className="block-eyebrow">{block.eyebrow}</p>
          <h2 id={`${block.id}-title`}>{block.title}</h2>
          <p>{block.description}</p>
        </div>
        <div className="block-actions">
          <ActionLink action={block.primaryAction} />
          {block.secondaryAction ? <ActionLink action={block.secondaryAction} secondary /> : null}
        </div>
      </MotionReveal>
    </section>
  );
}
