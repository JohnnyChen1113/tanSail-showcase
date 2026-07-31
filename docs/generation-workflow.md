# One-prompt generation workflow

TanSail turns an open-ended request into a constrained site brief before editing presentation code. The brief is versioned, validated with Zod, and limited to the presets, recipes, and block families maintained by the starter.

## Generate a preview

Start from a file in `examples/generation/`, then run:

```bash
vp run generate:site -- --brief examples/generation/saas-brief.json
```

The command prints normalized JSON without changing the repository. Apply it explicitly:

```bash
vp run generate:site -- --brief examples/generation/saas-brief.json --apply
```

The only writable destination is `src/config/generated/*.json`. Open `/generated-preview` to inspect the selected recipe with generated brand and audience copy. Use `--check` to confirm that a committed generated file matches its source brief.

## Guardrails

- Unknown presets, recipes, tones, page paths, and section families fail validation.
- Generation does not install packages, add authentication, create databases, or configure external services.
- File writes require `--apply` and cannot escape `src/config/generated/`.
- Missing deployment details remain visible as unresolved requirements.
- `vp check`, `vp test run`, and `vp build` remain the release gate.

## Codex skill

The repository-owned skill lives at `.codex/skills/build-tansail-site`. Invoke `$build-tansail-site` followed by a product brief. It guides the agent through schema construction, generated preview, bounded content adaptation, checks, and an unresolved-items report.
