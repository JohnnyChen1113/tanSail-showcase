import type { PresetCatalog, PresetDefinition } from "#/config/presets";

function serializeColors(preset: PresetDefinition, mode: "light" | "dark") {
  const colors = preset.tokens.colors[mode];
  return [
    ["--background", colors.background],
    ["--foreground", colors.foreground],
    ["--card", colors.card],
    ["--card-foreground", colors.cardForeground],
    ["--primary", colors.primary],
    ["--primary-foreground", colors.primaryForeground],
    ["--secondary", colors.secondary],
    ["--muted-foreground", colors.mutedForeground],
    ["--accent", colors.accent],
    ["--accent-soft", colors.accentSoft],
    ["--border", colors.border],
  ];
}

function serializeStructuralTokens(preset: PresetDefinition) {
  const { typography, density, geometry, composition } = preset.tokens;
  return [
    ["--font-body", typography.bodyFont],
    ["--font-heading", typography.headingFont],
    ["--heading-weight", typography.headingWeight],
    ["--heading-tracking", typography.headingTracking],
    ["--eyebrow-tracking", typography.eyebrowTracking],
    ["--eyebrow-transform", typography.eyebrowTransform],
    ["--content-max", density.contentMax],
    ["--shell-gutter", density.shellGutter],
    ["--header-height", density.headerHeight],
    ["--hero-space", density.heroSpace],
    ["--section-space", density.sectionSpace],
    ["--control-radius", geometry.controlRadius],
    ["--radius", geometry.controlRadius],
    ["--panel-radius", geometry.panelRadius],
    ["--border-width", geometry.borderWidth],
    ["--ornament-radius", geometry.ornamentRadius],
    ["--hero-title-max", composition.heroTitleMax],
    ["--hero-copy-max", composition.heroCopyMax],
    ["--hero-margin", composition.heroMargin],
    ["--hero-text-align", composition.heroTextAlign],
    ["--hero-item-align", composition.heroItemAlign],
    ["--hero-actions-justify", composition.heroActionsJustify],
    ["--section-columns", composition.sectionColumns],
    ["--section-text-align", composition.sectionTextAlign],
    ["--footer-columns", composition.footerColumns],
    ["--ornament-opacity", composition.ornamentOpacity],
  ];
}

function serializeDeclarations(entries: string[][]) {
  return entries.map(([property, value]) => `  ${property}: ${value};`).join("\n");
}

function serializePreset(preset: PresetDefinition, includeRoot: boolean) {
  const rootSelector = includeRoot ? ":root,\n" : "";
  const lightTokens = [...serializeColors(preset, "light"), ...serializeStructuralTokens(preset)];
  const darkTokens = serializeColors(preset, "dark");

  return `${rootSelector}html[data-preset="${preset.id}"] {
${serializeDeclarations(lightTokens)}
}

${includeRoot ? "html.dark,\n" : ""}html.dark[data-preset="${preset.id}"] {
${serializeDeclarations(darkTokens)}
}`;
}

export function createPresetStyleSheet(catalog: PresetCatalog) {
  return catalog.presets
    .map((preset) => serializePreset(preset, preset.id === catalog.defaultPreset))
    .join("\n\n");
}

export function isPresetId(value: string, catalog: PresetCatalog) {
  return catalog.presets.some((preset) => preset.id === value);
}
