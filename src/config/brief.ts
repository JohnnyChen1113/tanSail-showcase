import { z } from "zod";

import { presetIdSchema } from "./presets.ts";

export const pageSectionSchema = z.enum([
  "hero",
  "logo-cloud",
  "features",
  "use-cases",
  "stats",
  "testimonials",
  "pricing",
  "faq",
  "cta",
]);

export const siteBriefSchema = z.object({
  version: z.literal(1),
  brand: z.object({
    name: z.string().min(1).max(60),
    tagline: z.string().min(1).max(90),
    description: z.string().min(1).max(180),
  }),
  audience: z.object({
    primary: z.string().min(1).max(100),
    problem: z.string().min(1).max(180),
    outcome: z.string().min(1).max(180),
  }),
  pages: z
    .array(
      z.object({
        name: z.string().min(1).max(60),
        path: z.string().regex(/^\/(?:[a-z0-9-]+\/?)*$/),
        goal: z.string().min(1).max(160),
        sections: z.array(pageSectionSchema).min(2),
      }),
    )
    .min(1),
  tone: z
    .array(z.enum(["warm", "direct", "playful", "technical", "editorial"]))
    .min(1)
    .max(3),
  preset: presetIdSchema,
  recipe: z.enum([
    "saas-product",
    "ai-tool",
    "open-source",
    "indie-product",
    "knowledge-business",
    "consulting-studio",
  ]),
  deployment: z.object({
    target: z.literal("cloudflare-workers"),
    domain: z.string().min(1).optional(),
  }),
});

export type SiteBrief = z.infer<typeof siteBriefSchema>;

export function defineSiteBrief(brief: SiteBrief) {
  return siteBriefSchema.parse(brief);
}
