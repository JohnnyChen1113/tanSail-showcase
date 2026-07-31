import { z } from "zod";

const observationListSchema = z.array(z.string().min(1).max(240)).min(1).max(12);

const sourceSchema = z.object({
  type: z.enum(["url", "screenshot"]),
  locator: z.string().min(1).max(500),
  usage: z.literal("inspiration-only"),
  observations: z.object({
    hierarchy: observationListSchema,
    typography: observationListSchema,
    color: observationListSchema,
    interaction: observationListSchema,
    avoid: observationListSchema,
  }),
});

export const referenceBriefSchema = z.object({
  version: z.literal(1),
  project: z.object({
    name: z.string().min(1).max(60),
    audience: z.string().min(1).max(160),
    outcome: z.string().min(1).max(180),
    locales: z
      .array(z.enum(["en", "zh"]))
      .min(1)
      .max(2),
  }),
  sources: z.array(sourceSchema).min(1).max(8),
  direction: z.object({
    name: z.string().min(1).max(60),
    principles: observationListSchema,
    materials: observationListSchema,
    proof: observationListSchema,
  }),
  originality: z.object({
    copySourceCode: z.literal(false),
    copyAssets: z.literal(false),
    exactReproduction: z.literal(false),
    transformations: z.array(z.string().min(1).max(240)).min(3).max(12),
  }),
});

export type ReferenceBrief = z.infer<typeof referenceBriefSchema>;

function bullets(values: string[]) {
  return values.map((value) => `- ${value}`).join("\n");
}

function quoted(value: string) {
  return JSON.stringify(value);
}

export function renderSiteBrief(brief: ReferenceBrief) {
  const sources = brief.sources
    .map(
      (source, index) => `### Source ${index + 1}: ${source.type}

Locator: ${source.locator}

**Hierarchy**

${bullets(source.observations.hierarchy)}

**Typography**

${bullets(source.observations.typography)}

**Color and material**

${bullets(source.observations.color)}

**Interaction**

${bullets(source.observations.interaction)}

**Explicitly avoid**

${bullets(source.observations.avoid)}`,
    )
    .join("\n\n");

  return `# SITE-BRIEF — ${brief.project.name}

## Outcome

- Audience: ${brief.project.audience}
- Desired outcome: ${brief.project.outcome}
- Locales: ${brief.project.locales.join(", ")}
- Original direction: ${brief.direction.name}

## Reference observations

References are evidence for design analysis, not implementation sources.

${sources}

## Original direction

### Principles

${bullets(brief.direction.principles)}

### Materials

${bullets(brief.direction.materials)}

### Product proof

${bullets(brief.direction.proof)}

## Required transformations

${bullets(brief.originality.transformations)}

## Clean-room rule

Do not copy source code, copy, brand assets, or screenshots. Rebuild only the observed design
principles with TanSail primitives, original content, original assets, and a visibly distinct
composition. Record any third-party asset and its license before it enters the repository.
`;
}

export function renderReferenceDesignContract(brief: ReferenceBrief) {
  return `---
version: "alpha"
name: ${brief.direction.name}
description: ${quoted(`An original TanSail direction for ${brief.project.name}.`)}
colors:
  primary: "#0B67D1"
  ink: "#101722"
  canvas: "#F4F7FA"
  surface: "#FFFFFF"
  accent: "#42D5CF"
  line: "#CDD8E4"
  white: "#FFFFFF"
typography:
  display:
    fontFamily: Inter Variable
    fontSize: 4rem
    fontWeight: 680
    lineHeight: 4.25rem
    letterSpacing: -0.12rem
  body:
    fontFamily: Inter Variable
    fontSize: 1rem
    fontWeight: 450
    lineHeight: 1.625rem
rounded:
  control: 12px
  card: 18px
  glass: 24px
spacing:
  sm: 8px
  md: 16px
  lg: 24px
  section: 96px
components:
  primary-action:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: 12px
  page:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: 24px
  atmosphere:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
  divider:
    backgroundColor: "{colors.line}"
---

## Overview

${brief.direction.principles.join(" ")}

This is an original implementation informed by abstract observations only. Its grid, copy,
assets, brand identity, and interaction details must remain visibly distinct from every source.

## Colors

Use a neutral canvas, one primary action color, and one atmospheric accent. Validate contrast in
the final composited state.

## Typography

Choose language-aware type metrics for ${brief.project.locales.join(" and ")}. Keep the primary
promise short and preserve comfortable reading measures.

## Layout

Build an original grid around the audience outcome. Prioritize: ${brief.direction.proof.join("; ")}.

## Elevation & Depth

${brief.direction.materials.join(" ")}

## Shapes

Use consistent control and card radii. Decorative geometry must explain product structure.

## Components

Compose with typed TanSail blocks. Every product visual must use original UI, data, and assets.

## Do's and Don'ts

Do preserve the observed principles and required transformations. Don't reproduce the reference
layout exactly or import its source code, copy, screenshots, logos, icons, or proprietary assets.
`;
}
