import { CtaBlock } from "#/components/blocks/cta-block";
import { FaqBlock } from "#/components/blocks/faq-block";
import { FeatureBlock } from "#/components/blocks/feature-block";
import { HeroBlock } from "#/components/blocks/hero-block";
import { LogoCloudBlock } from "#/components/blocks/logo-cloud-block";
import { PricingBlock } from "#/components/blocks/pricing-block";
import { StatsBlock } from "#/components/blocks/stats-block";
import { TestimonialBlock } from "#/components/blocks/testimonial-block";
import { UseCaseBlock } from "#/components/blocks/use-case-block";
import type { LandingBlockConfig } from "#/config/blocks";

export function LandingBlock({ block }: { readonly block: LandingBlockConfig }) {
  switch (block.kind) {
    case "hero":
      return <HeroBlock block={block} />;
    case "logo-cloud":
      return <LogoCloudBlock block={block} />;
    case "features":
      return <FeatureBlock block={block} />;
    case "use-cases":
      return <UseCaseBlock block={block} />;
    case "testimonials":
      return <TestimonialBlock block={block} />;
    case "pricing":
      return <PricingBlock block={block} />;
    case "faq":
      return <FaqBlock block={block} />;
    case "stats":
      return <StatsBlock block={block} />;
    case "cta":
      return <CtaBlock block={block} />;
  }
}
