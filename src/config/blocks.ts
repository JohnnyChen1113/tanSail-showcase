import { z } from "zod";

const actionSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

const blockBaseSchema = z.object({
  id: z.string().regex(/^[a-z][a-z0-9-]*$/),
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
});

const heroBlockSchema = blockBaseSchema.extend({
  kind: z.literal("hero"),
  variant: z.enum(["editorial", "product", "minimal"]),
  primaryAction: actionSchema,
  secondaryAction: actionSchema.optional(),
  note: z.string().min(1).optional(),
});

const logoCloudBlockSchema = z.object({
  kind: z.literal("logo-cloud"),
  id: z.string().regex(/^[a-z][a-z0-9-]*$/),
  title: z.string().min(1),
  logos: z.array(z.string().min(1)).min(4),
});

const featureItemSchema = z.object({
  icon: z.enum(["sparkles", "layout", "shield", "wand", "gauge", "blocks"]),
  title: z.string().min(1),
  description: z.string().min(1),
  metric: z.string().min(1).optional(),
});

const featureBlockSchema = blockBaseSchema.extend({
  kind: z.literal("features"),
  variant: z.enum(["grid", "bento", "split"]),
  items: z.array(featureItemSchema).min(3).max(6),
});

const useCaseBlockSchema = blockBaseSchema.extend({
  kind: z.literal("use-cases"),
  items: z.array(
    z.object({
      audience: z.string().min(1),
      outcome: z.string().min(1),
      description: z.string().min(1),
    }),
  ),
});

const testimonialBlockSchema = blockBaseSchema.extend({
  kind: z.literal("testimonials"),
  items: z.array(
    z.object({
      quote: z.string().min(1),
      name: z.string().min(1),
      role: z.string().min(1),
    }),
  ),
});

const pricingBlockSchema = blockBaseSchema.extend({
  kind: z.literal("pricing"),
  plans: z.array(
    z.object({
      name: z.string().min(1),
      price: z.string().min(1),
      cadence: z.string().min(1),
      description: z.string().min(1),
      features: z.array(z.string().min(1)).min(2),
      action: actionSchema,
      featured: z.boolean().default(false),
    }),
  ),
});

const faqBlockSchema = blockBaseSchema.extend({
  kind: z.literal("faq"),
  items: z.array(
    z.object({
      question: z.string().min(1),
      answer: z.string().min(1),
    }),
  ),
});

const ctaBlockSchema = blockBaseSchema.extend({
  kind: z.literal("cta"),
  variant: z.enum(["banner", "split"]),
  primaryAction: actionSchema,
  secondaryAction: actionSchema.optional(),
});

const statsBlockSchema = z.object({
  kind: z.literal("stats"),
  id: z.string().regex(/^[a-z][a-z0-9-]*$/),
  title: z.string().min(1),
  items: z.array(
    z.object({
      value: z.string().min(1),
      label: z.string().min(1),
    }),
  ),
});

export const landingBlockSchema = z.discriminatedUnion("kind", [
  heroBlockSchema,
  logoCloudBlockSchema,
  featureBlockSchema,
  useCaseBlockSchema,
  testimonialBlockSchema,
  pricingBlockSchema,
  faqBlockSchema,
  ctaBlockSchema,
  statsBlockSchema,
]);

const blockCatalogSchema = z.object({
  blocks: z.array(landingBlockSchema),
});

export type ActionConfig = z.infer<typeof actionSchema>;
export type CtaBlockConfig = z.infer<typeof ctaBlockSchema>;
export type FaqBlockConfig = z.infer<typeof faqBlockSchema>;
export type FeatureBlockConfig = z.infer<typeof featureBlockSchema>;
export type HeroBlockConfig = z.infer<typeof heroBlockSchema>;
export type LandingBlockConfig = z.infer<typeof landingBlockSchema>;
export type LogoCloudBlockConfig = z.infer<typeof logoCloudBlockSchema>;
export type PricingBlockConfig = z.infer<typeof pricingBlockSchema>;
export type StatsBlockConfig = z.infer<typeof statsBlockSchema>;
export type TestimonialBlockConfig = z.infer<typeof testimonialBlockSchema>;
export type UseCaseBlockConfig = z.infer<typeof useCaseBlockSchema>;

export function defineLandingBlocks(blocks: Array<LandingBlockConfig>) {
  return blockCatalogSchema.parse({ blocks }).blocks;
}

export const blockCatalog = defineLandingBlocks([
  {
    kind: "hero",
    id: "hero-editorial",
    variant: "editorial",
    eyebrow: "A considered beginning",
    title: "Give an ambitious idea room to breathe.",
    description:
      "An editorial opening for thoughtful products, studios, and independent work that benefits from a strong point of view.",
    primaryAction: { label: "Start your story", href: "#cta-banner" },
    secondaryAction: { label: "Explore the system", href: "#features-bento" },
    note: "Warm typography · generous rhythm · clear hierarchy",
  },
  {
    kind: "hero",
    id: "hero-product",
    variant: "product",
    eyebrow: "Launch with momentum",
    title: "A product page that gets to the value quickly.",
    description:
      "Lead with the outcome, support it with proof, and give visitors a direct path to try the product.",
    primaryAction: { label: "Build your launch", href: "#pricing" },
    secondaryAction: { label: "See capabilities", href: "#features-grid" },
    note: "No credit card · deploy to Cloudflare",
  },
  {
    kind: "hero",
    id: "hero-minimal",
    variant: "minimal",
    eyebrow: "Small surface, strong signal",
    title: "Say the one thing people should remember.",
    description:
      "A compact opening for open-source projects, personal products, and focused tools.",
    primaryAction: { label: "View the foundation", href: "#features-split" },
  },
  {
    kind: "logo-cloud",
    id: "logo-cloud",
    title: "Built with a modern, durable web stack",
    logos: ["TanStack", "React", "Cloudflare", "Tailwind CSS", "shadcn/ui", "Vite+"],
  },
  {
    kind: "features",
    id: "features-grid",
    variant: "grid",
    eyebrow: "Feature grid",
    title: "A balanced overview for product capabilities.",
    description: "Use equal-weight cards when each capability deserves the same attention.",
    items: [
      { icon: "layout", title: "Composable", description: "Build pages from typed blocks." },
      {
        icon: "sparkles",
        title: "Polished",
        description: "Start from a deliberate visual system.",
      },
      { icon: "shield", title: "Reliable", description: "Keep accessibility and checks built in." },
      {
        icon: "gauge",
        title: "Fast",
        description: "Ship a lean client and prerender public pages.",
      },
      {
        icon: "wand",
        title: "Adaptable",
        description: "Change the mood without rewriting content.",
      },
      {
        icon: "blocks",
        title: "Removable",
        description: "Delete optional sections without fallout.",
      },
    ],
  },
  {
    kind: "features",
    id: "features-bento",
    variant: "bento",
    eyebrow: "Bento system",
    title: "Create hierarchy when some ideas matter more.",
    description: "Mixed spans turn a capability list into a visual product narrative.",
    items: [
      {
        icon: "sparkles",
        title: "Three visual directions",
        description: "Harbor, Horizon, and Nightwatch reshape the entire experience.",
        metric: "3 presets",
      },
      {
        icon: "layout",
        title: "Typed composition",
        description: "Schemas keep generated and hand-written pages aligned.",
        metric: "1 contract",
      },
      {
        icon: "shield",
        title: "Accessible defaults",
        description: "Semantics survive every design.",
      },
      {
        icon: "gauge",
        title: "Worker ready",
        description: "Preview and deploy through one toolchain.",
      },
    ],
  },
  {
    kind: "features",
    id: "features-split",
    variant: "split",
    eyebrow: "Split narrative",
    title: "Pair a product promise with concrete evidence.",
    description: "Use this layout when the story benefits from a clear before-and-after rhythm.",
    items: [
      {
        icon: "wand",
        title: "Edit content once",
        description: "Keep copy in validated configuration.",
      },
      {
        icon: "blocks",
        title: "Swap the composition",
        description: "Choose a block variant per page.",
      },
      {
        icon: "sparkles",
        title: "Preserve the finish",
        description: "Semantic tokens handle the details.",
      },
    ],
  },
  {
    kind: "use-cases",
    id: "use-cases",
    eyebrow: "Use cases",
    title: "One foundation, several ways to ship.",
    description: "Start with the audience and make the desired outcome unmistakable.",
    items: [
      {
        audience: "Independent makers",
        outcome: "Launch sooner",
        description:
          "Move from idea to credible product page without assembling a design system first.",
      },
      {
        audience: "Open-source teams",
        outcome: "Explain clearly",
        description: "Balance documentation, community proof, and a focused adoption path.",
      },
      {
        audience: "Product studios",
        outcome: "Reuse quality",
        description:
          "Keep engineering conventions while changing tone and composition for every client.",
      },
    ],
  },
  {
    kind: "testimonials",
    id: "testimonials",
    eyebrow: "Social proof",
    title: "Let specific outcomes carry the recommendation.",
    description: "Short, concrete quotes are easier to trust than broad praise.",
    items: [
      {
        quote: "We replaced a week of setup with one focused afternoon.",
        name: "Maya Chen",
        role: "Independent founder",
      },
      {
        quote: "The presets feel like different products, not a color toggle.",
        name: "Eli Brooks",
        role: "Design engineer",
      },
      {
        quote: "Our team could change the copy without breaking the layout.",
        name: "Nora Patel",
        role: "Product lead",
      },
    ],
  },
  {
    kind: "pricing",
    id: "pricing",
    eyebrow: "Simple pricing",
    title: "Make the decision easy to compare.",
    description: "Use two or three honest plans with differences people can scan quickly.",
    plans: [
      {
        name: "Starter",
        price: "$0",
        cadence: "forever",
        description: "For experiments and open-source work.",
        features: ["Core blocks", "Three presets", "Cloudflare build"],
        action: { label: "Use the starter", href: "#cta-banner" },
        featured: false,
      },
      {
        name: "Studio",
        price: "$49",
        cadence: "one time",
        description: "For teams building several launches.",
        features: ["All page recipes", "Generation workflow", "Commercial project use"],
        action: { label: "Choose Studio", href: "#cta-banner" },
        featured: true,
      },
      {
        name: "Custom",
        price: "Let’s talk",
        cadence: "project",
        description: "For a tailored system and rollout.",
        features: ["Design direction", "Custom blocks", "Implementation support"],
        action: { label: "Start a conversation", href: "#cta-banner" },
        featured: false,
      },
    ],
  },
  {
    kind: "faq",
    id: "faq",
    eyebrow: "Questions",
    title: "Answer the friction before it becomes hesitation.",
    description: "Native disclosure elements keep the interaction light and accessible.",
    items: [
      {
        question: "Is TanSail a page builder?",
        answer:
          "No. Pages are ordinary typed React compositions, so there is no runtime editor or proprietary content format.",
      },
      {
        question: "Can I remove a block?",
        answer:
          "Yes. Blocks receive data through their own contracts and do not depend on a global page-builder state.",
      },
      {
        question: "Do all blocks work with every preset?",
        answer:
          "Yes. Components consume semantic tokens instead of checking for Harbor, Horizon, or Nightwatch directly.",
      },
      {
        question: "Does the starter require a backend?",
        answer:
          "No. The default project remains secret-free and deployable without authentication, a database, or third-party services.",
      },
    ],
  },
  {
    kind: "stats",
    id: "stats",
    title: "A compact layer with measurable coverage",
    items: [
      { value: "3", label: "visual presets" },
      { value: "9", label: "block families" },
      { value: "2", label: "responsive baselines" },
      { value: "0", label: "required secrets" },
    ],
  },
  {
    kind: "cta",
    id: "cta-banner",
    variant: "banner",
    eyebrow: "Ready to set sail?",
    title: "Turn a clear brief into a site worth shipping.",
    description: "Start from a disciplined foundation, then make the visual direction your own.",
    primaryAction: { label: "Use TanSail", href: "https://github.com/JohnnyChen1113/tanSail" },
    secondaryAction: {
      label: "Review the roadmap",
      href: "https://github.com/JohnnyChen1113/tanSail/blob/main/DEVELOPMENT_PLAN.md",
    },
  },
  {
    kind: "cta",
    id: "cta-split",
    variant: "split",
    eyebrow: "A quieter close",
    title: "Keep the final decision focused.",
    description: "A split CTA gives the promise and the next action equal breathing room.",
    primaryAction: { label: "Start building", href: "#hero-editorial" },
  },
]);
