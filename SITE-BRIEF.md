# SITE-BRIEF — TanSail Documentation

## Outcome

- Audience: Builders using TanSail to create design-led bilingual TanStack Start websites
- Desired outcome: Help a new contributor understand the system, generate a site, customize it safely, validate it, and deploy it to Cloudflare Workers
- Locales: en, zh
- Original direction: Ledger Field Guide

## Reference observations

References are evidence for design analysis, not implementation sources.

### Source 1: url

Locator: https://docs.shipany.ai/zh/shipany-tanstack

**Hierarchy**

- A persistent product header sits above a left chapter rail, a readable article column, and a right on-page outline
- The introduction leads into quick start, agent workflows, configuration, platform capabilities, and deployment

**Typography**

- High-contrast sans-serif headings establish a clear documentation hierarchy
- Code, commands, and inline file paths use compact monospace treatment inside quiet bordered surfaces

**Color and material**

- A neutral canvas and subtle gray navigation states keep long-form content calm
- Borders and low-contrast panels separate navigation and examples without decorative imagery

**Interaction**

- Persistent chapter navigation, in-page anchors, search affordance, locale controls, and theme controls support repeated reference use
- Previous and next paths keep readers moving through the guide sequentially

**Explicitly avoid**

- Do not copy the ShipAny brand, text, screenshots, exact three-column proportions, navigation labels, or proprietary product claims
- Do not reproduce ShipAny database, authentication, payment, credit, RBAC, CMS, or deployment automation as TanSail capabilities

## Original direction

### Principles

- Treat documentation as a working manual rather than a marketing appendix
- Keep every command and capability grounded in the current TanSail repository
- Give English and Chinese readers equivalent navigation and content coverage

### Materials

- Warm paper canvas, black rules, compact mono annotations, and a restrained signal-green accent
- Numbered chapter rails, square controls, and original diagrams built from CSS and text

### Product proof

- Real Vite+ commands from package scripts
- Typed preset, recipe, brief, MDX, browser-test, and Cloudflare Worker paths from the repository
- Original bilingual guides with no third-party screenshots or customer claims

## Required transformations

- Replace the white SaaS-docs visual language with TanSail's cream, black, and signal-green Ledger system
- Use numbered field-guide chapters and a different navigation rhythm instead of matching the reference proportions
- Organize content around TanSail's browser-only design and delivery workflow rather than ShipAny's backend SaaS modules
- Write every guide, command example, and interface detail from verified TanSail repository behavior

## Clean-room rule

Do not copy source code, copy, brand assets, or screenshots. Rebuild only the observed design
principles with TanSail primitives, original content, original assets, and a visibly distinct
composition. Record any third-party asset and its license before it enters the repository.
