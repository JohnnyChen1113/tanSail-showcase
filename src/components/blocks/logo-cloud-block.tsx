import { MotionReveal } from "#/components/blocks/motion-reveal";
import type { LogoCloudBlockConfig } from "#/config/blocks";

export function LogoCloudBlock({ block }: { readonly block: LogoCloudBlockConfig }) {
  return (
    <section id={block.id} className="landing-block logo-cloud-block" aria-label={block.title}>
      <MotionReveal>
        <p>{block.title}</p>
        <ul>
          {block.logos.map((logo) => (
            <li key={logo}>{logo}</li>
          ))}
        </ul>
      </MotionReveal>
    </section>
  );
}
