# Reference-to-TanSail workflow

TanSail can use URLs and screenshots as design research without turning the repository into a
copy of another product. The workflow separates **observation** from **implementation**.

## 1. Capture observations

For every source, record hierarchy, typography, color/material, interaction, and what must not
transfer. Do not inspect proprietary bundles or import copy, logos, product screenshots, customer
marks, or other source assets.

Start from `examples/reference/reference-brief.json`. Every intake must set:

```json
{
  "copySourceCode": false,
  "copyAssets": false,
  "exactReproduction": false
}
```

It also needs at least three visible transformations from the source.

## 2. Generate guarded documents

```bash
vp run reference:brief -- --input examples/reference/reference-brief.json
vp run reference:brief -- --input examples/reference/reference-brief.json --apply
```

The first command validates and previews. `--apply` writes `SITE-BRIEF.md` and
`DESIGN.proposed.md` at the repository root. Input files are accepted only from
`examples/reference/` and `src/config/generated/`; output paths are fixed.

Review the proposed contract before reconciling it with root `DESIGN.md`. Then export and check the
accepted tokens.

## 3. Build an original implementation

Use TanSail blocks, original copy, original product UI, and the project brand. A result is ready
only when it is visibly distinct, both locale routes work, reference-derived decisions are
auditable in `SITE-BRIEF.md`, and the complete quality gate passes.

Invoke the repository skill with `$reference-to-tansail` followed by the product goal and the
reference URLs or screenshots.
