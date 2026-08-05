import { BadgeInfoIcon, QuoteIcon } from "lucide-react";

import { BlockHeading } from "#/components/blocks/block-heading";
import { MotionReveal } from "#/components/blocks/motion-reveal";
import type { TestimonialBlockConfig } from "#/config/blocks";

export function TestimonialBlock({ block }: { readonly block: TestimonialBlockConfig }) {
  return (
    <section
      id={block.id}
      className="landing-block testimonial-block"
      data-variant={block.variant}
      data-evidence={block.evidence.status}
    >
      <MotionReveal>
        <BlockHeading eyebrow={block.eyebrow} title={block.title} description={block.description} />
        {block.evidence.label ? (
          <p className="testimonial-evidence" role="note">
            <BadgeInfoIcon aria-hidden="true" />
            {block.evidence.label}
          </p>
        ) : null}
        <div className="testimonial-grid">
          {block.items.map((item) => (
            <figure key={item.name} data-size={item.size}>
              <div className="testimonial-card-meta">
                <QuoteIcon aria-hidden="true" />
                {block.evidence.status === "demo" ? <span>{block.evidence.label}</span> : null}
              </div>
              <blockquote>{item.quote}</blockquote>
              <figcaption>
                <span className="testimonial-avatar" aria-hidden="true">
                  {item.initials ?? item.name.slice(0, 2).toUpperCase()}
                </span>
                <span>
                  <strong>{item.name}</strong>
                  <small>{item.role}</small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </MotionReveal>
    </section>
  );
}
