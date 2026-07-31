import { CheckIcon } from "lucide-react";

import { ActionLink } from "#/components/blocks/action-link";
import { BlockHeading } from "#/components/blocks/block-heading";
import { MotionReveal } from "#/components/blocks/motion-reveal";
import type { PricingBlockConfig } from "#/config/blocks";

export function PricingBlock({ block }: { readonly block: PricingBlockConfig }) {
  return (
    <section id={block.id} className="landing-block pricing-block">
      <MotionReveal>
        <BlockHeading
          eyebrow={block.eyebrow}
          title={block.title}
          description={block.description}
          centered
        />
        <div className="pricing-grid">
          {block.plans.map((plan) => (
            <article key={plan.name} data-featured={plan.featured || undefined}>
              <p className="pricing-name">{plan.name}</p>
              <p className="pricing-price">
                <strong>{plan.price}</strong>
                <span>{plan.cadence}</span>
              </p>
              <p className="pricing-description">{plan.description}</p>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <CheckIcon aria-hidden="true" /> {feature}
                  </li>
                ))}
              </ul>
              <ActionLink action={plan.action} secondary={!plan.featured} />
            </article>
          ))}
        </div>
      </MotionReveal>
    </section>
  );
}
