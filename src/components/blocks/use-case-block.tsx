import { ArrowRightIcon } from "lucide-react";

import { BlockHeading } from "#/components/blocks/block-heading";
import { MotionReveal } from "#/components/blocks/motion-reveal";
import type { UseCaseBlockConfig } from "#/config/blocks";

export function UseCaseBlock({ block }: { readonly block: UseCaseBlockConfig }) {
  return (
    <section id={block.id} className="landing-block use-case-block">
      <MotionReveal>
        <BlockHeading eyebrow={block.eyebrow} title={block.title} description={block.description} />
        <div className="use-case-list">
          {block.items.map((item, index) => (
            <article key={item.audience}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <p>{item.audience}</p>
                <h3>{item.outcome}</h3>
                <p>{item.description}</p>
              </div>
              <ArrowRightIcon aria-hidden="true" />
            </article>
          ))}
        </div>
      </MotionReveal>
    </section>
  );
}
