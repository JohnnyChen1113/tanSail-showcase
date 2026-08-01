---
version: "alpha"
name: Luminous Harbor
description: A calm editorial foundation with a restrained, functional glass layer.
colors:
  ink: "#101722"
  ink-muted: "#4E5B6E"
  canvas: "#F4F7FA"
  surface: "#FFFFFF"
  surface-glass: "#FFFFFFCC"
  primary: "#0B67D1"
  harbor-deep: "#074C9A"
  aqua: "#42D5CF"
  aurora: "#A8F0DF"
  line: "#CDD8E4"
  night: "#07111F"
  white: "#FFFFFF"
  danger: "#C33B44"
typography:
  display-latin:
    fontFamily: Inter Variable
    fontSize: 4rem
    fontWeight: 680
    lineHeight: 4.25rem
    letterSpacing: -0.12rem
  display-cjk:
    fontFamily: PingFang SC
    fontSize: 3.5rem
    fontWeight: 650
    lineHeight: 4.5rem
    letterSpacing: -0.04rem
  title:
    fontFamily: Inter Variable
    fontSize: 2.25rem
    fontWeight: 650
    lineHeight: 2.75rem
    letterSpacing: -0.04rem
  body:
    fontFamily: Inter Variable
    fontSize: 1rem
    fontWeight: 450
    lineHeight: 1.625rem
  label:
    fontFamily: Inter Variable
    fontSize: 0.8125rem
    fontWeight: 650
    lineHeight: 1.25rem
    letterSpacing: 0.04rem
rounded:
  control: 12px
  card: 18px
  glass: 24px
  pill: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  section: 96px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: 12px
  button-primary-hover:
    backgroundColor: "{colors.harbor-deep}"
  glass-control:
    backgroundColor: "{colors.surface-glass}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: 8px
  editorial-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: 24px
  page:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
  muted-copy:
    textColor: "{colors.ink-muted}"
  atmosphere-aqua:
    backgroundColor: "{colors.aqua}"
    textColor: "{colors.ink}"
  atmosphere-aurora:
    backgroundColor: "{colors.aurora}"
    textColor: "{colors.ink}"
  divider:
    backgroundColor: "{colors.line}"
  dark-surface:
    backgroundColor: "{colors.night}"
    textColor: "{colors.white}"
  destructive-action:
    backgroundColor: "{colors.danger}"
    textColor: "{colors.white}"
---

## Overview

Luminous Harbor combines the editorial confidence of a well-typeset product publication with a
small, functional layer of luminous glass. The page must feel designed before it feels decorated:
clear hierarchy, disciplined whitespace, real product evidence, and calm motion. Zed is a reference
for restraint and product storytelling; Apple's Liquid Glass is a material reference for controls;
neither is a template to copy.

The core product is always solid and legible. Glass is reserved for navigation, toolbars, theme and
language controls, floating calls to action, and overlays where it communicates hierarchy.

## Colors

The foundation uses cool paper-like neutrals instead of clinical pure white. Ink carries hierarchy;
Harbor blue is the single primary action color; Aqua and Aurora are atmospheric highlights, never
body text. Dark mode uses Night as the canvas and preserves the same semantic relationships.

- Maintain WCAG AA contrast for text and meaningful controls.
- Use translucent surfaces only when their final composited contrast remains readable.
- Avoid large rainbow gradients, neon-on-black clichés, and unrelated accent colors.

## Typography

Language determines typography. Latin display text uses Inter Variable with a compact rhythm;
Simplified Chinese uses PingFang SC first, then system CJK fallbacks, with a smaller maximum size,
looser line height, and much less negative tracking. Never force Latin display metrics onto CJK.

Hero copy is short: one promise, one supporting sentence, and at most two actions. Body measure is
60–72 characters for Latin and 28–36 Han characters. Labels may be compact; paragraphs may not.

## Layout

Use a 12-column content grid within a maximum width of 1200px. Major sections breathe at 72–112px
depending on viewport. The default homepage hero is one centered focal point: one promise, one
supporting sentence, and its actions. Do not place a decorative terminal, dashboard, or product
frame beside the promise unless it demonstrates real behavior or evidence. Following sections may
return to editorial asymmetry; do not center every section. Mobile layouts become one deliberate
reading order, not compressed desktop compositions.

Every landing page should show believable product evidence immediately after the focused hero.
Prefer screenshots, live UI compositions, diagrams with a concrete meaning, and measurable proof
over abstract concentric shapes.

## Elevation & Depth

Depth comes from three layers: the quiet canvas, opaque content surfaces, and a sparse glass control
layer. Glass combines backdrop blur, a thin light edge, subtle inner highlight, and a low-opacity
shadow. It must remain useful when transparency or motion is reduced.

Avoid stacking multiple blurred panes. Content cards are normally opaque; only controls float.
Animation uses opacity and transforms, lasts 160–420ms, and respects `prefers-reduced-motion`.

## Shapes

Controls use 12px corners or full pills. Content cards use 18px corners. Floating glass groups may
use 24px corners. The TanSail mark is a precise geometric sail and horizon, built as an SVG asset,
not ad-hoc CSS strokes. Borders are one physical pixel where possible and align to the layout grid.

## Components

Header, locale switcher, theme switcher, command palette, floating actions, and modal toolbars may
use the glass material. Hero, feature, pricing, testimonial, and documentation cards stay editorial
and opaque. Buttons have one unmistakable primary style, one quiet secondary style, and visible
focus rings.

Landing blocks expose curated compositions rather than unlimited styling knobs. Each composition
must define responsive behavior, content limits, accessible semantics, and a real-product visual
slot. Themes can change palette and atmosphere but may not break geometry or overlap content.

## Do's and Don'ts

**Do** keep headlines concise, choose language-aware type scales, use real interface evidence,
preserve generous whitespace, and make every decorative effect explain hierarchy or interaction.

**Don't** copy source code or proprietary assets from reference sites, apply glass to every card,
use fake customer logos as proof, depend on hover alone, or trade readability for visual novelty.
