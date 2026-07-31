# Design contract

TanSail treats root `DESIGN.md` as a versioned interface, not a mood board. Its YAML frontmatter
contains machine-readable tokens; its prose records the visual intent and the reasons behind each
constraint. The current direction is **Luminous Harbor**: editorial clarity, language-aware type,
real product evidence, and a restrained glass control layer.

## Commands

```bash
vp run design:lint
vp run design:export
vp run design:check
vp run design:diff -- DESIGN.before.md DESIGN.md
```

- `design:lint` parses the contract with `@google/design.md` and reports structural, reference, and
  contrast findings.
- `design:export` regenerates `src/styles/design.generated.css` for Tailwind CSS 4.
- `design:check` fails when the contract is invalid or the committed CSS export is stale. CI runs
  it before tests and builds.
- `design:diff` compares two contracts and reports token or prose regressions.

Edit `DESIGN.md` first when a change affects identity, palette, type scale, spacing, shape, depth,
or cross-component behavior. A local component tweak does not need a new token unless it introduces
a reusable visual role.

## Material rule

Glass belongs to navigation, language/theme controls, floating actions, and overlays. Hero copy,
feature content, pricing, documentation, and product proof remain on opaque surfaces. Every glass
surface needs a non-transparent fallback and readable composited contrast.

## Language rule

English and Simplified Chinese use separate display metrics. Chinese headings use a system CJK
stack, smaller maximum sizes, looser line height, and much less negative tracking. Never infer that
a Latin headline class is safe for Chinese because the character count looks similar.
