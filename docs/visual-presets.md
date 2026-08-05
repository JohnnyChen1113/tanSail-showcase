# Visual presets

TanSail separates the site content contract from its visual system. The same navigation, sections,
and metadata can render through four deliberately different presets:

- **Harbor** — editorial typography, warm colors, generous spacing, and a classic two-column
  section rhythm.
- **Luminous** (`horizon`) — cool blue and teal, product-led typography, and a soft radiant
  atmosphere.
- **Signal** (`nightwatch`) — graphite, violet, and a technically precise atmosphere.
- **Ledger** — a compact field-manual system with mono body copy, hard geometry, centered recipe
  compositions, and a high-signal accent.

Visitors can select a preset from the palette control in the header. TanSail stores the choice in
`localStorage` and restores the `data-preset` attribute with `ScriptOnce` before the application
hydrates, avoiding a flash of the default preset.

## Token contract

`src/config/presets.ts` is the source of truth. Every preset must define all five dimensions:

1. light and dark color roles;
2. body and heading typography;
3. shell and section density;
4. control, panel, border, and ornament geometry;
5. hero, section, footer, and ornament composition.

Harbor, Luminous, and Signal intentionally preserve density, geometry, and composition so teams can
compare atmosphere without moving content. Ledger demonstrates the broader contract: a preset may
also change structural tokens when the design direction calls for materially different density,
geometry, and composition. Reading order and semantics must remain stable in every case.

`createPresetStyleSheet` converts the typed catalog into semantic CSS custom properties rendered
in the document head. Components consume names such as `--background`, `--font-heading`,
`--section-space`, `--control-radius`, and `--section-columns`; they do not import a preset or use
brand-specific color values.

## Change the default

Set `defaultPreset` in `src/config/presets.ts`. Keep its value equal to one of the four preset IDs.
The same value is used for server rendering, the initialization script, and the selector state.

## Add or rename a preset

1. Update `presetIdSchema`.
2. Add a complete definition to `presetCatalog.presets`.
3. Run the unit tests to verify every design dimension is distinct and complete.
4. Regenerate both responsive screenshot baselines.

## Visual regression workflow

Install the Playwright browser once:

```bash
pnpm exec playwright install chromium
```

To use an already-installed stable Google Chrome instead, set the task-specific channel when
running the test:

```bash
TANSAIL_BROWSER_CHANNEL=chrome pnpm test:visual
```

Run the portable browser behavior suite used by CI without pixel comparisons:

```bash
pnpm test:browser
```

Run all eight comparisons—four presets at desktop and mobile widths:

```bash
pnpm test:visual
```

After an intentional, reviewed design change, update the PNG baselines and inspect the diff before
committing:

```bash
pnpm test:visual:update
```

The test fixes light mode, locale, viewport, reduced motion, and animations so screenshots remain
focused on intentional design changes. Pixel rendering still varies across operating systems and
browser builds, so the screenshot comparisons are currently a local design check rather than a CI
release gate. The existing macOS baselines are retained; canonical Linux baselines will be added
when the planned Apple Container workflow is available.
