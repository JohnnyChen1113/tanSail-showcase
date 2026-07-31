import { QuoteIcon } from "lucide-react";

import { BlockHeading } from "#/components/blocks/block-heading";
import { MotionReveal } from "#/components/blocks/motion-reveal";
import type { TestimonialBlockConfig } from "#/config/blocks";

export function TestimonialBlock({ block }: { readonly block: TestimonialBlockConfig }) {
  return (
    <section id={block.id} className="landing-block testimonial-block">
      <MotionReveal>
        <BlockHeading eyebrow={block.eyebrow} title={block.title} description={block.description} />
        <div className="testimonial-grid">
          {block.items.map((item) => (
            <figure key={item.name}>
              <QuoteIcon aria-hidden="true" />
              <blockquote>{item.quote}</blockquote>
              <figcaption>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </MotionReveal>
    </section>
  );
}
