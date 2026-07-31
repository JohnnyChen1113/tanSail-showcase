import { BlockHeading } from "#/components/blocks/block-heading";
import { MotionReveal } from "#/components/blocks/motion-reveal";
import type { FaqBlockConfig } from "#/config/blocks";

export function FaqBlock({ block }: { readonly block: FaqBlockConfig }) {
  return (
    <section id={block.id} className="landing-block faq-block">
      <MotionReveal>
        <BlockHeading eyebrow={block.eyebrow} title={block.title} description={block.description} />
        <div className="faq-list">
          {block.items.map((item, index) => (
            <details key={item.question} name={`${block.id}-items`} open={index === 0}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </MotionReveal>
    </section>
  );
}
