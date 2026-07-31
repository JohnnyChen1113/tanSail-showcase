import { z } from "zod";

const presetIdSchema = z.enum(["harbor", "horizon", "nightwatch"]);
const tokenValueSchema = z
  .string()
  .min(1)
  .regex(/^[^{};<>]+$/);

const colorTokensSchema = z.object({
  background: tokenValueSchema,
  foreground: tokenValueSchema,
  card: tokenValueSchema,
  cardForeground: tokenValueSchema,
  primary: tokenValueSchema,
  primaryForeground: tokenValueSchema,
  secondary: tokenValueSchema,
  mutedForeground: tokenValueSchema,
  accent: tokenValueSchema,
  accentSoft: tokenValueSchema,
  border: tokenValueSchema,
});

const presetSchema = z.object({
  id: presetIdSchema,
  label: z.string().min(1),
  description: z.string().min(1),
  tokens: z.object({
    colors: z.object({
      light: colorTokensSchema,
      dark: colorTokensSchema,
    }),
    typography: z.object({
      bodyFont: tokenValueSchema,
      headingFont: tokenValueSchema,
      headingWeight: tokenValueSchema,
      headingTracking: tokenValueSchema,
      eyebrowTracking: tokenValueSchema,
      eyebrowTransform: z.enum(["none", "uppercase"]),
    }),
    density: z.object({
      contentMax: tokenValueSchema,
      shellGutter: tokenValueSchema,
      headerHeight: tokenValueSchema,
      heroSpace: tokenValueSchema,
      sectionSpace: tokenValueSchema,
    }),
    geometry: z.object({
      controlRadius: tokenValueSchema,
      panelRadius: tokenValueSchema,
      borderWidth: tokenValueSchema,
      ornamentRadius: tokenValueSchema,
    }),
    composition: z.object({
      heroTitleMax: tokenValueSchema,
      heroCopyMax: tokenValueSchema,
      heroMargin: tokenValueSchema,
      heroTextAlign: z.enum(["left", "center"]),
      heroItemAlign: z.enum(["flex-start", "center"]),
      heroActionsJustify: z.enum(["flex-start", "center"]),
      sectionColumns: tokenValueSchema,
      sectionTextAlign: z.enum(["left", "center"]),
      footerColumns: tokenValueSchema,
      ornamentOpacity: tokenValueSchema,
    }),
  }),
});

const presetCatalogSchema = z.object({
  defaultPreset: presetIdSchema,
  presets: z.array(presetSchema).length(3),
});

export type PresetCatalog = z.infer<typeof presetCatalogSchema>;
export type PresetDefinition = z.infer<typeof presetSchema>;
export type PresetId = z.infer<typeof presetIdSchema>;

export const presetIds = presetIdSchema.options;

export const presetCatalog = presetCatalogSchema.parse({
  defaultPreset: "horizon",
  presets: [
    {
      id: "harbor",
      label: "Harbor",
      description: "Editorial, warm, and quietly confident.",
      tokens: {
        colors: {
          light: {
            background: "oklch(0.98 0.012 85)",
            foreground: "oklch(0.20 0.02 252)",
            card: "oklch(0.995 0.006 88)",
            cardForeground: "oklch(0.20 0.02 252)",
            primary: "oklch(0.27 0.055 251)",
            primaryForeground: "oklch(0.98 0.01 85)",
            secondary: "oklch(0.94 0.018 82)",
            mutedForeground: "oklch(0.48 0.025 250)",
            accent: "oklch(0.69 0.13 46)",
            accentSoft: "oklch(0.92 0.04 60)",
            border: "oklch(0.85 0.025 77)",
          },
          dark: {
            background: "oklch(0.16 0.025 252)",
            foreground: "oklch(0.94 0.012 82)",
            card: "oklch(0.20 0.028 252)",
            cardForeground: "oklch(0.94 0.012 82)",
            primary: "oklch(0.87 0.025 78)",
            primaryForeground: "oklch(0.18 0.025 252)",
            secondary: "oklch(0.24 0.025 252)",
            mutedForeground: "oklch(0.70 0.02 78)",
            accent: "oklch(0.75 0.13 50)",
            accentSoft: "oklch(0.28 0.05 45)",
            border: "oklch(0.34 0.025 252)",
          },
        },
        typography: {
          bodyFont: '"Inter Variable", sans-serif',
          headingFont: '"Iowan Old Style", "Palatino Linotype", Georgia, serif',
          headingWeight: "600",
          headingTracking: "-0.045em",
          eyebrowTracking: "0.18em",
          eyebrowTransform: "uppercase",
        },
        density: {
          contentMax: "90rem",
          shellGutter: "clamp(1.25rem, 4vw, 3rem)",
          headerHeight: "5rem",
          heroSpace: "clamp(5.5rem, 12vw, 10rem)",
          sectionSpace: "clamp(5rem, 9vw, 8rem)",
        },
        geometry: {
          controlRadius: "0.75rem",
          panelRadius: "1.25rem",
          borderWidth: "1px",
          ornamentRadius: "999px",
        },
        composition: {
          heroTitleMax: "66rem",
          heroCopyMax: "42rem",
          heroMargin: "0",
          heroTextAlign: "left",
          heroItemAlign: "flex-start",
          heroActionsJustify: "flex-start",
          sectionColumns: "minmax(7rem, 1fr) minmax(0, 3fr)",
          sectionTextAlign: "left",
          footerColumns: "minmax(0, 1.4fr) minmax(0, 2fr)",
          ornamentOpacity: "1",
        },
      },
    },
    {
      id: "horizon",
      label: "Horizon",
      description: "Product-led, bright, and optimistic.",
      tokens: {
        colors: {
          light: {
            background: "oklch(0.99 0.006 225)",
            foreground: "oklch(0.19 0.035 255)",
            card: "oklch(1 0 0)",
            cardForeground: "oklch(0.19 0.035 255)",
            primary: "oklch(0.55 0.20 257)",
            primaryForeground: "oklch(0.99 0.005 220)",
            secondary: "oklch(0.95 0.025 225)",
            mutedForeground: "oklch(0.48 0.045 255)",
            accent: "oklch(0.71 0.14 185)",
            accentSoft: "oklch(0.93 0.055 190)",
            border: "oklch(0.87 0.035 235)",
          },
          dark: {
            background: "oklch(0.16 0.04 258)",
            foreground: "oklch(0.96 0.012 220)",
            card: "oklch(0.20 0.045 258)",
            cardForeground: "oklch(0.96 0.012 220)",
            primary: "oklch(0.72 0.16 252)",
            primaryForeground: "oklch(0.14 0.035 258)",
            secondary: "oklch(0.24 0.05 255)",
            mutedForeground: "oklch(0.73 0.035 225)",
            accent: "oklch(0.78 0.13 184)",
            accentSoft: "oklch(0.28 0.07 190)",
            border: "oklch(0.35 0.055 250)",
          },
        },
        typography: {
          bodyFont: '"Inter Variable", sans-serif',
          headingFont: '"Inter Variable", sans-serif',
          headingWeight: "700",
          headingTracking: "-0.06em",
          eyebrowTracking: "0.12em",
          eyebrowTransform: "uppercase",
        },
        density: {
          contentMax: "84rem",
          shellGutter: "clamp(1.25rem, 4vw, 3.5rem)",
          headerHeight: "4.5rem",
          heroSpace: "clamp(5rem, 10vw, 8rem)",
          sectionSpace: "clamp(4.5rem, 8vw, 7rem)",
        },
        geometry: {
          controlRadius: "999px",
          panelRadius: "2rem",
          borderWidth: "1px",
          ornamentRadius: "40% 60% 55% 45%",
        },
        composition: {
          heroTitleMax: "58rem",
          heroCopyMax: "40rem",
          heroMargin: "auto",
          heroTextAlign: "center",
          heroItemAlign: "center",
          heroActionsJustify: "center",
          sectionColumns: "minmax(0, 1fr)",
          sectionTextAlign: "center",
          footerColumns: "minmax(0, 1fr) minmax(0, 2fr)",
          ornamentOpacity: "0.7",
        },
      },
    },
    {
      id: "nightwatch",
      label: "Nightwatch",
      description: "High-contrast, technical, and uncompromising.",
      tokens: {
        colors: {
          light: {
            background: "oklch(0.965 0.03 125)",
            foreground: "oklch(0.12 0.02 145)",
            card: "oklch(0.99 0.015 125)",
            cardForeground: "oklch(0.12 0.02 145)",
            primary: "oklch(0.16 0.025 145)",
            primaryForeground: "oklch(0.94 0.18 125)",
            secondary: "oklch(0.90 0.07 125)",
            mutedForeground: "oklch(0.40 0.04 145)",
            accent: "oklch(0.78 0.22 130)",
            accentSoft: "oklch(0.88 0.13 128)",
            border: "oklch(0.28 0.04 145)",
          },
          dark: {
            background: "oklch(0.10 0.018 145)",
            foreground: "oklch(0.96 0.02 125)",
            card: "oklch(0.14 0.022 145)",
            cardForeground: "oklch(0.96 0.02 125)",
            primary: "oklch(0.82 0.23 130)",
            primaryForeground: "oklch(0.10 0.018 145)",
            secondary: "oklch(0.18 0.04 145)",
            mutedForeground: "oklch(0.74 0.05 125)",
            accent: "oklch(0.82 0.23 130)",
            accentSoft: "oklch(0.23 0.08 135)",
            border: "oklch(0.72 0.12 130)",
          },
        },
        typography: {
          bodyFont: '"Inter Variable", sans-serif',
          headingFont: '"Arial Narrow", "Inter Variable", sans-serif',
          headingWeight: "800",
          headingTracking: "-0.035em",
          eyebrowTracking: "0.20em",
          eyebrowTransform: "uppercase",
        },
        density: {
          contentMax: "96rem",
          shellGutter: "clamp(1rem, 3vw, 2.25rem)",
          headerHeight: "4rem",
          heroSpace: "clamp(4rem, 8vw, 7rem)",
          sectionSpace: "clamp(3.5rem, 7vw, 6rem)",
        },
        geometry: {
          controlRadius: "0",
          panelRadius: "0",
          borderWidth: "2px",
          ornamentRadius: "0",
        },
        composition: {
          heroTitleMax: "72rem",
          heroCopyMax: "48rem",
          heroMargin: "0",
          heroTextAlign: "left",
          heroItemAlign: "flex-start",
          heroActionsJustify: "flex-start",
          sectionColumns: "minmax(10rem, 1fr) minmax(0, 4fr)",
          sectionTextAlign: "left",
          footerColumns: "minmax(0, 1fr) minmax(0, 3fr)",
          ornamentOpacity: "1",
        },
      },
    },
  ],
});
