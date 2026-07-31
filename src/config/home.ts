import { z } from "zod";

const homeContentSchema = z.object({
  hero: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    command: z.string().min(1),
  }),
  foundation: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    items: z.array(
      z.object({
        icon: z.enum(["layers", "cloud", "check"]),
        title: z.string().min(1),
        description: z.string().min(1),
      }),
    ),
  }),
  principles: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
  }),
});

export const homeContent = homeContentSchema.parse({
  hero: {
    eyebrow: "Independent and open source",
    title: "Set a better course for your next website.",
    description:
      "A lean TanStack Start foundation for people who care equally about sound engineering and a polished first impression.",
    command: "pnpm install && pnpm dev",
  },
  foundation: {
    eyebrow: "Configurable foundation",
    title: "A small core with a configurable shell.",
    description:
      "Change the identity and navigation in one typed file, while reusable components preserve structure, behavior, and accessibility.",
    items: [
      {
        icon: "layers",
        title: "Focused foundation",
        description:
          "React 19, TanStack Start, Router, Tailwind CSS, and shadcn/ui—nothing else required.",
      },
      {
        icon: "cloud",
        title: "Cloudflare ready",
        description: "Develop, preview, and deploy to Workers through one documented toolchain.",
      },
      {
        icon: "check",
        title: "Quality built in",
        description:
          "Formatting, linting, type checks, tests, and production builds share one workflow.",
      },
    ],
  },
  principles: {
    eyebrow: "Working principles",
    title: "Content, structure, and appearance can evolve independently.",
    description:
      "The shell owns navigation and semantics. Content stays editable. Visual presets reshape the experience without coupling either layer.",
  },
});
