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

const logoItemSchema = z.union([
  z.string().min(1),
  z.object({
    name: z.string().min(1),
    mark: z.string().min(1).max(4),
    category: z.string().min(1).optional(),
    tone: z.enum(["neutral", "blue", "aqua", "amber", "violet"]).default("neutral"),
  }),
]);

const logoCloudBlockSchema = z.object({
  kind: z.literal("logo-cloud"),
  id: z.string().regex(/^[a-z][a-z0-9-]*$/),
  variant: z.enum(["grid", "compact-rail"]).default("grid"),
  title: z.string().min(1),
  logos: z.array(logoItemSchema).min(4),
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
  variant: z.enum(["list", "catalog"]).default("list"),
  filterLabel: z.string().min(1).default("Filter scenarios"),
  allLabel: z.string().min(1).default("All"),
  items: z
    .array(
      z.object({
        audience: z.string().min(1),
        outcome: z.string().min(1),
        description: z.string().min(1),
        category: z.string().min(1).optional(),
        icon: z
          .enum(["app-window", "bot", "book-open", "flask", "globe", "rocket", "users"])
          .optional(),
        tags: z.array(z.string().min(1)).max(4).default([]),
      }),
    )
    .min(3),
});

const testimonialBlockSchema = blockBaseSchema.extend({
  kind: z.literal("testimonials"),
  variant: z.enum(["grid", "masonry"]).default("grid"),
  evidence: z
    .discriminatedUnion("status", [
      z.object({
        status: z.literal("demo"),
        label: z.string().min(1),
      }),
      z.object({
        status: z.literal("verified"),
        label: z.string().min(1).optional(),
        sourceUrl: z.url().optional(),
      }),
    ])
    .default({ status: "demo", label: "Sample content — replace before publishing" }),
  items: z
    .array(
      z.object({
        quote: z.string().min(1),
        name: z.string().min(1),
        role: z.string().min(1),
        initials: z.string().min(1).max(3).optional(),
        size: z.enum(["short", "medium", "long"]).default("medium"),
      }),
    )
    .min(3)
    .max(12),
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
export type LandingBlockInput = z.input<typeof landingBlockSchema>;
export type LogoCloudBlockConfig = z.infer<typeof logoCloudBlockSchema>;
export type PricingBlockConfig = z.infer<typeof pricingBlockSchema>;
export type StatsBlockConfig = z.infer<typeof statsBlockSchema>;
export type TestimonialBlockConfig = z.infer<typeof testimonialBlockSchema>;
export type UseCaseBlockConfig = z.infer<typeof useCaseBlockSchema>;

export function defineLandingBlocks(blocks: Array<LandingBlockInput>) {
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
    variant: "grid",
    title: "Built with a modern, durable web stack",
    logos: ["TanStack", "React", "Cloudflare", "Tailwind CSS", "shadcn/ui", "Vite+"],
  },
  {
    kind: "logo-cloud",
    id: "logo-cloud-rail",
    variant: "compact-rail",
    title: "Verified technology, presented without borrowed brand assets",
    logos: [
      { name: "TanStack Start", mark: "TS", category: "Framework", tone: "amber" },
      { name: "React 19", mark: "R19", category: "UI", tone: "aqua" },
      { name: "TypeScript", mark: "TS", category: "Language", tone: "blue" },
      { name: "Tailwind CSS", mark: "TW", category: "Styles", tone: "aqua" },
      { name: "shadcn/ui", mark: "UI", category: "Components", tone: "neutral" },
      { name: "Vite+", mark: "V+", category: "Toolchain", tone: "violet" },
      { name: "Cloudflare Workers", mark: "CF", category: "Runtime", tone: "amber" },
      { name: "Playwright", mark: "PW", category: "Browser tests", tone: "blue" },
    ],
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
        title: "Four visual directions",
        description: "Harbor, Horizon, Nightwatch, and Ledger reshape the entire experience.",
        metric: "4 presets",
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
    variant: "list",
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
    kind: "use-cases",
    id: "use-cases-catalog",
    variant: "catalog",
    eyebrow: "Scenario catalog",
    title: "Start with the kind of site you need to explain.",
    description:
      "Filter a practical set of launch paths without turning the starter into a page-builder runtime.",
    filterLabel: "Filter site scenarios",
    allLabel: "All scenarios",
    items: [
      {
        audience: "Product",
        category: "Product",
        icon: "app-window",
        outcome: "SaaS launch",
        description: "Lead with value, capabilities, plans, objections, and a direct action.",
        tags: ["Product-led", "Pricing"],
      },
      {
        audience: "Open source",
        category: "Open source",
        icon: "globe",
        outcome: "Community project",
        description: "Explain the foundation, technical proof, adoption path, and documentation.",
        tags: ["Docs", "Community"],
      },
      {
        audience: "AI",
        category: "AI",
        icon: "bot",
        outcome: "AI tool",
        description: "Make a new capability, workflow, trust boundary, and next step concrete.",
        tags: ["Workflow", "Trust"],
      },
      {
        audience: "Research",
        category: "Research",
        icon: "flask",
        outcome: "Lab or research site",
        description: "Present methods, tools, project evidence, and bilingual research context.",
        tags: ["Methods", "Bilingual"],
      },
      {
        audience: "Knowledge",
        category: "Knowledge",
        icon: "book-open",
        outcome: "Expert-led product",
        description:
          "Build authority through outcomes, structured learning, and replaceable proof.",
        tags: ["Editorial", "Learning"],
      },
      {
        audience: "Studio",
        category: "Studio",
        icon: "users",
        outcome: "Consulting studio",
        description: "Frame a point of view, demonstrate the method, and invite a conversation.",
        tags: ["Services", "Evidence"],
      },
    ],
  },
  {
    kind: "testimonials",
    id: "testimonials",
    variant: "grid",
    eyebrow: "Social proof",
    title: "Let specific outcomes carry the recommendation.",
    description: "This gallery example is sample content and must be replaced before publishing.",
    evidence: { status: "demo", label: "Sample content — replace before publishing" },
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
    kind: "testimonials",
    id: "testimonials-masonry",
    variant: "masonry",
    eyebrow: "Replaceable proof pattern",
    title: "A testimonial wall that tells the truth about its data.",
    description:
      "These fictional people demonstrate the composition only. Replace every card with verified feedback before changing its evidence status.",
    evidence: { status: "demo", label: "Template example · fictional feedback" },
    items: [
      {
        quote:
          "The block system gave our launch a clear order while leaving the implementation ordinary React.",
        name: "Maya Chen",
        role: "Independent builder · example",
        initials: "MC",
        size: "medium",
      },
      {
        quote: "We could discuss the design contract before debating individual components.",
        name: "Alex Morgan",
        role: "Design engineer · example",
        initials: "AM",
        size: "short",
      },
      {
        quote:
          "The research-site recipe made methods, tools, and bilingual context easier to organize without adding a CMS.",
        name: "Professor Li",
        role: "University researcher · example",
        initials: "LI",
        size: "long",
      },
      {
        quote: "The Cloudflare target stayed explicit from the first brief to the final build.",
        name: "Jordan Lee",
        role: "Product developer · example",
        initials: "JL",
        size: "short",
      },
      {
        quote:
          "English and Chinese felt like two designed routes rather than one page passed through a translation layer.",
        name: "Lab member Wang",
        role: "Research team · example",
        initials: "W",
        size: "medium",
      },
      {
        quote:
          "Gallery previews made responsive decisions visible before they reached a production page.",
        name: "Noah Patel",
        role: "Frontend contributor · example",
        initials: "NP",
        size: "medium",
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
        features: ["Core blocks", "Four presets", "Cloudflare build"],
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
          "Yes. Components consume semantic tokens instead of checking individual preset IDs directly.",
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
      { value: "4", label: "visual presets" },
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
