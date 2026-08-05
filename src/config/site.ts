import { z } from "zod";

import { getDictionary, type Dictionary, type Locale, locales } from "#/i18n";

const routeLinkSchema = z.object({
  kind: z.literal("route"),
  label: z.string().min(1),
  to: z.enum(["/", "/generated-preview/", "/recipes/", "/docs/en/", "/docs/zh/"]),
});

const anchorLinkSchema = z.object({
  kind: z.literal("anchor"),
  label: z.string().min(1),
  href: z.string().regex(/^#[a-z][a-z0-9-]*$/i),
});

const externalLinkSchema = z.object({
  kind: z.literal("external"),
  label: z.string().min(1),
  href: z.url(),
  newTab: z.boolean().default(true),
});

const siteLinkSchema = z.discriminatedUnion("kind", [
  routeLinkSchema,
  anchorLinkSchema,
  externalLinkSchema,
]);

const metadataSchema = z.object({
  name: z.string().min(1),
  title: z
    .string()
    .trim()
    .min(40, "SEO titles should contain 40–60 characters")
    .max(60, "SEO titles should contain 40–60 characters"),
  description: z
    .string()
    .trim()
    .min(140, "SEO descriptions should contain 140–160 characters")
    .max(160, "SEO descriptions should contain 140–160 characters"),
  siteUrl: z.url().refine((url) => !url.endsWith("/"), "Use an origin without a trailing slash"),
  locale: z.string().min(2),
  themeColor: z.object({
    light: z.string().min(1),
    dark: z.string().min(1),
  }),
});

const sitemapEntrySchema = z.object({
  path: z.string().regex(/^\//),
  changeFrequency: z.enum(["daily", "weekly", "monthly", "yearly"]),
  priority: z.number().min(0).max(1),
});

const docsSitemapSlugs = [
  "introduction",
  "getting-started",
  "project-structure",
  "design-contract",
  "visual-presets",
  "blocks-and-recipes",
  "site-configuration",
  "content-and-i18n",
  "agent-workflows",
  "clean-room-references",
  "quality-and-testing",
  "cloudflare-deployment",
  "troubleshooting",
];

function createDocsSitemapEntries(): Array<z.infer<typeof sitemapEntrySchema>> {
  return locales.flatMap((docsLocale) =>
    docsSitemapSlugs.map((slug) => ({
      path: `/docs/${docsLocale}/${slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  );
}

export const siteConfigSchema = z.object({
  metadata: metadataSchema,
  announcement: z
    .object({
      text: z.string().min(1),
      action: siteLinkSchema.optional(),
    })
    .optional(),
  navigation: z.array(siteLinkSchema),
  actions: z.object({
    primary: siteLinkSchema,
    secondary: siteLinkSchema.optional(),
  }),
  socialLinks: z.array(siteLinkSchema),
  footer: z.object({
    tagline: z.string().min(1),
    copyright: z.string().min(1),
    groups: z.array(
      z.object({
        label: z.string().min(1),
        links: z.array(siteLinkSchema),
      }),
    ),
    legalLinks: z.array(siteLinkSchema),
  }),
  seo: z.object({
    sitemap: z.array(sitemapEntrySchema).min(1),
  }),
});

export type SiteConfig = z.infer<typeof siteConfigSchema>;
export type SiteLinkConfig = z.infer<typeof siteLinkSchema>;

export function defineSiteConfig(config: SiteConfig) {
  return siteConfigSchema.parse(config);
}

export function createLocalizedSiteConfig(locale: Locale, dictionary: Dictionary) {
  return defineSiteConfig({
    metadata: {
      name: "TanSail",
      title: dictionary.meta.title,
      description: dictionary.meta.description,
      siteUrl: "https://tansail-official.bioinfoark.workers.dev",
      locale,
      themeColor: {
        light: "#f4f7fa",
        dark: "#07111f",
      },
    },
    navigation: [
      {
        kind: "route",
        label: dictionary.navigation.docs,
        to: locale === "zh" ? "/docs/zh/" : "/docs/en/",
      },
      { kind: "route", label: dictionary.navigation.recipes, to: "/generated-preview/" },
      { kind: "anchor", label: dictionary.navigation.system, href: "#system" },
      { kind: "anchor", label: dictionary.navigation.scenarios, href: "#scenarios" },
      { kind: "anchor", label: dictionary.navigation.workflow, href: "#workflow" },
      { kind: "anchor", label: dictionary.navigation.faq, href: "#faq" },
    ],
    actions: {
      primary: {
        kind: "external",
        label: dictionary.actions.github,
        href: "https://github.com/JohnnyChen1113/tanSail",
        newTab: true,
      },
      secondary: {
        kind: "anchor",
        label: dictionary.actions.explore,
        href: "#paths",
      },
    },
    socialLinks: [
      {
        kind: "external",
        label: "GitHub",
        href: "https://github.com/JohnnyChen1113/tanSail",
        newTab: true,
      },
    ],
    footer: {
      tagline: dictionary.footer.tagline,
      copyright: dictionary.footer.copyright,
      groups: [
        {
          label: dictionary.footer.product,
          links: [
            { kind: "anchor", label: dictionary.navigation.system, href: "#system" },
            { kind: "anchor", label: dictionary.navigation.workflow, href: "#workflow" },
          ],
        },
        {
          label: dictionary.footer.project,
          links: [
            {
              kind: "external",
              label: dictionary.footer.designContract,
              href: "https://github.com/JohnnyChen1113/tanSail/blob/main/DESIGN.md",
              newTab: true,
            },
            {
              kind: "route",
              label: dictionary.footer.documentation,
              to: locale === "zh" ? "/docs/zh/" : "/docs/en/",
            },
          ],
        },
      ],
      legalLinks: [
        {
          kind: "external",
          label: dictionary.footer.license,
          href: "https://github.com/JohnnyChen1113/tanSail/blob/main/LICENSE",
          newTab: true,
        },
      ],
    },
    seo: {
      sitemap: [
        { path: "/en/", changeFrequency: "monthly", priority: 1 },
        { path: "/zh/", changeFrequency: "monthly", priority: 1 },
        { path: "/gallery/", changeFrequency: "monthly", priority: 0.8 },
        { path: "/docs/", changeFrequency: "monthly", priority: 0.7 },
        { path: "/docs/en/", changeFrequency: "monthly", priority: 0.8 },
        { path: "/docs/zh/", changeFrequency: "monthly", priority: 0.8 },
        ...createDocsSitemapEntries(),
      ],
    },
  });
}

export const siteConfig = createLocalizedSiteConfig("en", getDictionary("en"));
