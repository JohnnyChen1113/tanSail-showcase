# Releasing TanSail

Only repository maintainers publish releases.

## Prepare

1. Confirm the intended version follows semantic versioning. Before `1.0.0`, minor versions may
   contain breaking starter changes and must document them clearly.
2. Update `package.json`, `CHANGELOG.md`, the matching file under `docs/releases/`, and the public
   roadmap.
3. Run the complete gate on Node.js 24:

   ```bash
   vp check
   vp test run
   vp build
   TANSAIL_BROWSER_CHANNEL=chrome pnpm test:browser
   ```

4. Merge the release preparation pull request and wait for the `CI` workflow on `main` to pass.

The full `pnpm test:visual` suite is an additional local design check. Its pixel comparisons are
not a release gate until the canonical Linux baseline environment is standardized.

## Publish

Create an annotated tag on the verified `main` commit and push it:

```bash
git switch main
git pull --ff-only
git tag -a v0.1.0 -m "TanSail v0.1.0"
git push origin v0.1.0
```

The `Release` workflow publishes a GitHub Release from `docs/releases/<tag>.md`. Verify the tag,
release notes, source archives, and workflow result before announcing the release.

## After release

- Open an `Unreleased` section in `CHANGELOG.md` for the next cycle.
- Confirm the README and migration guidance match the tagged source.
- Create follow-up issues for deferred work instead of silently expanding the released scope.
- Never move or replace a published tag. Publish a new patch release for corrections.
