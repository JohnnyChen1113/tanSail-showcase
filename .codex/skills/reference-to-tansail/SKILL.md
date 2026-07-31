---
name: reference-to-tansail
description: Analyze website URLs or screenshots and turn their high-level design principles into an original TanSail site, including a clean-room reference brief, SITE-BRIEF.md, proposed DESIGN.md, bilingual content, curated blocks, and browser validation. Use when a user asks to clone, recreate, take inspiration from, redesign from, or match the feel of a reference website in a TanSail repository.
---

# Reference to TanSail

Translate references into an original design direction. Preserve observed principles, not source
implementation, brand identity, copy, or assets.

## Workflow

1. Read `AGENTS.md`, root `DESIGN.md`, `docs/reference-to-tansail.md`, and the relevant TanSail
   config and block files. Preserve unrelated worktree changes.
2. Inspect each supplied URL in a rendered browser or each supplied screenshot visually. Do not
   inspect or download proprietary source bundles for implementation guidance.
3. Record only high-level observations: hierarchy, typography, color/material, interaction, and
   elements to avoid. Use [intake-schema.md](references/intake-schema.md) to create a JSON intake
   under `examples/reference/` or `src/config/generated/`.
4. Define at least three visible transformations: a different grid, original palette/type pairing,
   original product imagery, different section sequence, or different interaction detail.
5. Run a dry validation:

   ```bash
   vp run reference:brief -- --input examples/reference/reference-brief.json
   ```

6. Review the output, then write `SITE-BRIEF.md` and `DESIGN.proposed.md` explicitly:

   ```bash
   vp run reference:brief -- --input examples/reference/reference-brief.json --apply
   ```

7. Reconcile `DESIGN.proposed.md` with root `DESIGN.md`; do not overwrite the project contract
   blindly. Run `vp run design:export` and `vp run design:check` after accepted token changes.
8. Implement with existing typed blocks and product-specific copy. Create original screenshots or
   interface compositions; never reuse reference screenshots as production imagery.
9. Verify `/en` and `/zh`, keyboard/touch behavior, responsive widths, reduced motion,
   accessibility, `vp check`, `vp test run`, `vp build`, and the portable Playwright suite.

## Clean-room boundary

- Never copy source code, text, logos, icons, illustrations, screenshots, customer marks, or
  proprietary assets from a reference.
- Never promise pixel-perfect or exact reproduction. Reject intake with `exactReproduction`,
  `copySourceCode`, or `copyAssets` enabled.
- Treat public references as inspiration-only unless the user supplies explicit reuse rights and
  the repository records the compatible license.
- Keep source locators and observations in the brief so design decisions remain auditable.
- Do not fabricate product evidence. Mark missing screenshots, metrics, customers, or claims as
  unresolved requirements.

## Completion gate

Finish only when the resulting site is visibly distinct, every reference-derived decision maps to
an original implementation, the design contract is synchronized, both locales work, and all
required checks pass. Report unresolved content, licensing, domain, or deployment needs.
