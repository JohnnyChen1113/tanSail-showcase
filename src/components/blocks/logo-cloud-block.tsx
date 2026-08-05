import { MotionReveal } from "#/components/blocks/motion-reveal";
import type { LogoCloudBlockConfig } from "#/config/blocks";

export function LogoCloudBlock({ block }: { readonly block: LogoCloudBlockConfig }) {
  return (
    <section
      id={block.id}
      className="landing-block logo-cloud-block"
      data-variant={block.variant}
      aria-label={block.title}
    >
      <MotionReveal>
        <p>{block.title}</p>
        <ul>
          {block.logos.map((logo) => {
            const item =
              typeof logo === "string"
                ? { name: logo, mark: logo.slice(0, 2).toUpperCase(), tone: "neutral" }
                : logo;

            return (
              <li key={item.name} data-tone={item.tone}>
                <span aria-hidden="true">{item.mark}</span>
                <div>
                  <strong>{item.name}</strong>
                  {"category" in item && item.category ? <small>{item.category}</small> : null}
                </div>
              </li>
            );
          })}
        </ul>
      </MotionReveal>
    </section>
  );
}
