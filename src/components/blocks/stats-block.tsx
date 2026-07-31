import { MotionReveal } from "#/components/blocks/motion-reveal";
import type { StatsBlockConfig } from "#/config/blocks";

export function StatsBlock({ block }: { readonly block: StatsBlockConfig }) {
  return (
    <section id={block.id} className="landing-block stats-block" aria-label={block.title}>
      <MotionReveal>
        <p>{block.title}</p>
        <dl>
          {block.items.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </MotionReveal>
    </section>
  );
}
