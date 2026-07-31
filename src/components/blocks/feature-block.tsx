import {
  BlocksIcon,
  GaugeIcon,
  LayoutGridIcon,
  ShieldCheckIcon,
  SparklesIcon,
  WandSparklesIcon,
} from "lucide-react";

import { BlockHeading } from "#/components/blocks/block-heading";
import { MotionReveal } from "#/components/blocks/motion-reveal";
import type { FeatureBlockConfig } from "#/config/blocks";

const featureIcons = {
  sparkles: SparklesIcon,
  layout: LayoutGridIcon,
  shield: ShieldCheckIcon,
  wand: WandSparklesIcon,
  gauge: GaugeIcon,
  blocks: BlocksIcon,
};

export function FeatureBlock({ block }: { readonly block: FeatureBlockConfig }) {
  return (
    <section
      id={block.id}
      className="landing-block feature-block"
      data-variant={block.variant}
      aria-labelledby={`${block.id}-title`}
    >
      <MotionReveal>
        <BlockHeading eyebrow={block.eyebrow} title={block.title} description={block.description} />
        <div className="feature-block-grid">
          {block.items.map((item, index) => {
            const Icon = featureIcons[item.icon];
            return (
              <article key={item.title} className="feature-block-card">
                <div className="feature-card-meta">
                  <Icon aria-hidden="true" />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                {item.metric ? <strong>{item.metric}</strong> : null}
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            );
          })}
        </div>
      </MotionReveal>
    </section>
  );
}
