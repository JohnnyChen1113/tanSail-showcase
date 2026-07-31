import { z } from "zod";

const routeLinkSchema = z.object({
  kind: z.literal("route"),
  label: z.string().min(1),
  to: z.literal("/"),
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
  title: z.string().min(1),
  description: z.string().min(1).max(160),
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

export const siteConfig = defineSiteConfig({
  metadata: {
    name: "TanSail",
    title: "TanSail — 为下一个网站，设定更好的航向",
    description: "设计优先、开源且可配置的 TanStack Start 网站起点，原生面向 Cloudflare Workers。",
    siteUrl: "https://tansail-official.bioinfoark.workers.dev",
    locale: "zh-CN",
    themeColor: {
      light: "#f6fbff",
      dark: "#10182a",
    },
  },
  announcement: {
    text: "TanSail v0.1.0 已发布：一个干净、开放、可直接部署的起点。",
    action: {
      kind: "external",
      label: "查看发布说明",
      href: "https://github.com/JohnnyChen1113/tanSail/releases/tag/v0.1.0",
      newTab: true,
    },
  },
  navigation: [
    { kind: "anchor", label: "核心能力", href: "#capabilities" },
    { kind: "anchor", label: "适用场景", href: "#use-cases" },
    { kind: "anchor", label: "项目数据", href: "#stats" },
    { kind: "anchor", label: "常见问题", href: "#faq" },
  ],
  actions: {
    primary: {
      kind: "external",
      label: "在 GitHub 查看",
      href: "https://github.com/JohnnyChen1113/tanSail",
      newTab: true,
    },
    secondary: {
      kind: "anchor",
      label: "探索核心能力",
      href: "#capabilities",
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
    tagline: "设计优先的 TanStack Start 起点，以 MIT 许可证开放。",
    copyright: "© 2026 TanSail contributors",
    groups: [
      {
        label: "产品",
        links: [
          { kind: "anchor", label: "核心能力", href: "#capabilities" },
          { kind: "anchor", label: "适用场景", href: "#use-cases" },
          { kind: "anchor", label: "常见问题", href: "#faq" },
        ],
      },
      {
        label: "项目",
        links: [
          {
            kind: "external",
            label: "GitHub 仓库",
            href: "https://github.com/JohnnyChen1113/tanSail",
            newTab: true,
          },
          {
            kind: "external",
            label: "开发路线图",
            href: "https://github.com/JohnnyChen1113/tanSail/blob/main/DEVELOPMENT_PLAN.md",
            newTab: true,
          },
          {
            kind: "external",
            label: "贡献指南",
            href: "https://github.com/JohnnyChen1113/tanSail/blob/main/CONTRIBUTING.md",
            newTab: true,
          },
        ],
      },
    ],
    legalLinks: [
      {
        kind: "external",
        label: "MIT 许可证",
        href: "https://github.com/JohnnyChen1113/tanSail/blob/main/LICENSE",
        newTab: true,
      },
    ],
  },
  seo: {
    sitemap: [{ path: "/", changeFrequency: "monthly", priority: 1 }],
  },
});
