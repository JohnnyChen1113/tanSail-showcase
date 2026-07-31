# Redistribution audit for v0.1.0

Reviewed on 2026-07-28 for the `v0.1.0` release.

## Project-owned material

- TanSail source code, configuration, documentation, example copy, generated fixtures, favicon,
  and share-image template are original project material distributed under the MIT License.
- Visual regression PNGs are generated from TanSail's own source, presets, and example content.
- The repository does not include application content from the Ten Gods project or copied
  closed-source ShipAny implementation, assets, or copy.

## Third-party material

- The initial Git history retains the public TanStarter baseline and its attribution. TanSail's
  subsequent work is MIT licensed as documented in `LICENSE` and the repository history.
- Inter is distributed through `@fontsource-variable/inter` under the SIL Open Font License 1.1.
- Runtime, development, and GitHub Actions dependencies retain their own licenses and notices in
  their packages or upstream repositories. All direct dependency manifests declare MIT,
  Apache-2.0, ISC, OFL-1.1, or MIT/Apache-2.0 terms.
- Lucide icons are consumed from the `lucide-react` package under its published ISC license; no
  unrelated icon asset bundle is copied into the repository.

The installed transitive dependency inventory was also scanned. It includes permissive licenses
plus MPL-2.0 tooling, libvips LGPL-3.0-or-later platform binaries used by Sharp, Python-2.0
`argparse`, and CC-BY-4.0 browser compatibility data. TanSail does not commit `node_modules` or
publish those packages as release assets; their upstream notices remain in installed packages.

Some generated nested manifests omit a `license` field. Those entries were traced to MIT-licensed
parents: Yuku's optional native bindings point to the MIT-licensed `yuku-toolchain/yuku`
repository, generated `blake3-wasm` subpackages are covered by their parent's MIT license, and
Vite+ internal documentation/templates are covered by the Vite+ MIT license.

## Release rule

New bundled fonts, images, icons, templates, example content, or copied code require a documented
source and redistribution-compatible license before release. Dependency changes are checked by
Dependabot and GitHub's dependency review workflow, but maintainers remain responsible for manual
review when a license is missing, custom, or ambiguous.
