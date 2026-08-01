export const locales = ["en", "zh"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

type FeatureItem = {
  kicker: string;
  title: string;
  description: string;
  metric: string;
};

export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  a11y: {
    skipToContent: string;
    primaryNavigation: string;
    mobileNavigation: string;
    openNavigation: string;
    closeNavigation: string;
    languageSwitcher: string;
    themeSwitcher: string;
  };
  appearance: {
    preset: string;
    current: string;
    light: string;
    dark: string;
    system: string;
    descriptions: Record<"harbor" | "horizon" | "nightwatch", string>;
  };
  announcement: {
    text: string;
    action: string;
  };
  navigation: {
    system: string;
    workflow: string;
    quality: string;
    faq: string;
  };
  actions: {
    github: string;
    explore: string;
    copyCommand: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    note: string;
  };
  proof: {
    label: string;
    values: string[];
  };
  system: {
    eyebrow: string;
    title: string;
    description: string;
    items: FeatureItem[];
  };
  workflow: {
    eyebrow: string;
    title: string;
    description: string;
    steps: Array<{ number: string; title: string; description: string }>;
  };
  quality: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{ value: string; label: string; detail: string }>;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: Array<{ question: string; answer: string }>;
  };
  cta: {
    eyebrow: string;
    title: string;
    description: string;
  };
  footer: {
    tagline: string;
    product: string;
    project: string;
    social: string;
    copyright: string;
    designContract: string;
    documentation: string;
    license: string;
  };
};

const en = {
  meta: {
    title: "TanSail — A design-first TanStack starter",
    description:
      "A refined, bilingual TanStack Start foundation with curated landing blocks and Cloudflare deployment.",
  },
  a11y: {
    skipToContent: "Skip to content",
    primaryNavigation: "Primary navigation",
    mobileNavigation: "Mobile navigation",
    openNavigation: "Open navigation",
    closeNavigation: "Close navigation",
    languageSwitcher: "Change language",
    themeSwitcher: "Change appearance",
  },
  appearance: {
    preset: "Visual atmosphere",
    current: "Current",
    light: "Light",
    dark: "Dark",
    system: "System",
    descriptions: {
      harbor: "Editorial, warm, and quietly confident.",
      horizon: "Cool, product-led, and quietly radiant.",
      nightwatch: "Graphite, violet, and technically precise.",
    },
  },
  announcement: {
    text: "TanSail is evolving into a design-governed, bilingual starter.",
    action: "Read the design contract",
  },
  navigation: {
    system: "System",
    workflow: "Workflow",
    quality: "Quality",
    faq: "FAQ",
  },
  actions: {
    github: "View on GitHub",
    explore: "See the delivery path",
    copyCommand: "Copy install command",
  },
  hero: {
    eyebrow: "Design first · Open source · Cloudflare ready",
    title: "Design the direction. Ship the whole site.",
    description:
      "TanSail turns one clear brief into an original bilingual site—with a governed design system, tested routes, and a deployable Cloudflare Worker.",
    note: "MIT licensed · bilingual by default · browser tested",
  },
  proof: {
    label: "Built on a modern, durable web stack",
    values: ["TanStack", "React 19", "Cloudflare", "Tailwind CSS", "shadcn/ui", "Vite+"],
  },
  system: {
    eyebrow: "Curated system",
    title: "More direction. Fewer arbitrary knobs.",
    description:
      "Every layer has a clear job, from the design contract to the product-facing compositions.",
    items: [
      {
        kicker: "01 · Identity",
        title: "Language-aware type",
        description:
          "Latin and Chinese typography use separate display metrics, fallbacks, and reading measures.",
        metric: "2 locales",
      },
      {
        kicker: "02 · Material",
        title: "Restrained glass",
        description:
          "Luminous surfaces clarify controls and navigation while content stays calm and opaque.",
        metric: "AA contrast",
      },
      {
        kicker: "03 · Composition",
        title: "Real product evidence",
        description:
          "Product frames, workflows, and measurable proof replace decorative placeholder geometry.",
        metric: "9 blocks",
      },
      {
        kicker: "04 · Governance",
        title: "A contract that travels",
        description:
          "DESIGN.md keeps tokens and design rationale readable by people, tools, and coding agents.",
        metric: "1 source",
      },
    ],
  },
  workflow: {
    eyebrow: "One clear workflow",
    title: "From reference to an original, deployable site.",
    description:
      "Capture intent, establish constraints, compose from tested primitives, then verify the result in a real browser.",
    steps: [
      {
        number: "01",
        title: "Describe the outcome",
        description:
          "Start from audience, product promise, content, and reference URLs or screenshots.",
      },
      {
        number: "02",
        title: "Generate the brief",
        description:
          "Translate references into an original SITE-BRIEF and a project-specific DESIGN.md.",
      },
      {
        number: "03",
        title: "Compose and verify",
        description:
          "Build with curated blocks, then run type, behavior, accessibility, and design checks.",
      },
    ],
  },
  quality: {
    eyebrow: "Quality is part of the starter",
    title: "Fast to begin, difficult to accidentally degrade.",
    description:
      "The same workflow checks the design contract, TypeScript, behavior, production output, and browser essentials.",
    items: [
      { value: "0", label: "required services", detail: "No auth, database, or secret needed." },
      { value: "AA", label: "contrast target", detail: "Controls remain legible across themes." },
      { value: "2", label: "first-class locales", detail: "English and Simplified Chinese." },
    ],
  },
  faq: {
    eyebrow: "Frequently asked",
    title: "What TanSail is—and what it deliberately is not.",
    items: [
      {
        question: "Is TanSail a SaaS boilerplate?",
        answer:
          "No. It is a browser-first product and marketing foundation. Authentication, billing, and databases stay optional.",
      },
      {
        question: "Can it reproduce a reference website?",
        answer:
          "It can analyze composition, typography, rhythm, and interaction patterns, then generate an original implementation without copying proprietary code or assets.",
      },
      {
        question: "Why is glass used sparingly?",
        answer:
          "Glass works best as a functional layer for controls and navigation. Opaque content surfaces preserve hierarchy, contrast, and performance.",
      },
    ],
  },
  cta: {
    eyebrow: "Set a better course",
    title: "Start with a system that already has a point of view.",
    description: "Clone the starter, replace the content, and keep the quality gates.",
  },
  footer: {
    tagline: "Design-first TanStack Start, released under MIT.",
    product: "Product",
    project: "Project",
    social: "Social",
    copyright: "© 2026 TanSail contributors",
    designContract: "Design contract",
    documentation: "Documentation",
    license: "MIT License",
  },
} satisfies Dictionary;

const zh = {
  meta: {
    title: "TanSail — 设计优先的 TanStack 起点",
    description: "精炼、双语、可部署到 Cloudflare 的 TanStack Start 网站基础与精品页面区块。",
  },
  a11y: {
    skipToContent: "跳到主要内容",
    primaryNavigation: "主导航",
    mobileNavigation: "移动端导航",
    openNavigation: "打开导航",
    closeNavigation: "关闭导航",
    languageSwitcher: "切换语言",
    themeSwitcher: "切换外观",
  },
  appearance: {
    preset: "视觉氛围",
    current: "当前",
    light: "浅色",
    dark: "深色",
    system: "跟随系统",
    descriptions: {
      harbor: "编辑感、温暖而克制。",
      horizon: "冷静、产品导向，带一点柔和光感。",
      nightwatch: "石墨与紫色，精确而技术化。",
    },
  },
  announcement: {
    text: "TanSail 正在成为一个由设计契约管理的双语起点。",
    action: "查看设计契约",
  },
  navigation: {
    system: "设计系统",
    workflow: "工作流",
    quality: "质量",
    faq: "常见问题",
  },
  actions: {
    github: "在 GitHub 查看",
    explore: "查看交付路径",
    copyCommand: "复制安装命令",
  },
  hero: {
    eyebrow: "设计优先 · 开源 · Cloudflare 就绪",
    title: "先把方向设计好，再把整个网站交付。",
    description:
      "TanSail 把一份清楚的简报变成原创双语网站——设计规则、页面路由、质量验证与 Cloudflare 部署，沿一条路径完成。",
    note: "MIT 许可 · 默认双语 · 浏览器验证",
  },
  proof: {
    label: "建立在现代、耐用且开放的 Web 技术之上",
    values: ["TanStack", "React 19", "Cloudflare", "Tailwind CSS", "shadcn/ui", "Vite+"],
  },
  system: {
    eyebrow: "精选系统",
    title: "方向更清楚，随意的旋钮更少。",
    description: "从设计契约到面向产品的构图，每一层都只有一个明确职责。",
    items: [
      {
        kicker: "01 · 识别",
        title: "真正适合双语的排版",
        description: "中文和英文分别使用合适的标题比例、字体回退、字距和阅读宽度。",
        metric: "2 种语言",
      },
      {
        kicker: "02 · 材质",
        title: "克制的动态玻璃",
        description: "发光半透明材质只用于导航与控件，正文区域保持安静、扎实。",
        metric: "AA 对比度",
      },
      {
        kicker: "03 · 构图",
        title: "看得懂的产品画面",
        description: "用真实界面、工作流和数据证据，替代没有含义的抽象同心图形。",
        metric: "9 类区块",
      },
      {
        kicker: "04 · 治理",
        title: "可以随项目迁移的契约",
        description: "DESIGN.md 让设计取舍同时对人、工具和编程 Agent 清晰可读。",
        metric: "1 个源头",
      },
    ],
  },
  workflow: {
    eyebrow: "一条清楚的工作流",
    title: "从参考网站，到原创、可部署的成品。",
    description: "先提取意图与约束，再用经过测试的组件构图，最后在真实浏览器里验证。",
    steps: [
      {
        number: "01",
        title: "说清要达成什么",
        description: "从受众、产品承诺、内容，以及参考网址或截图开始。",
      },
      {
        number: "02",
        title: "生成设计简报",
        description: "把参考转译成原创 SITE-BRIEF 和项目专属 DESIGN.md。",
      },
      {
        number: "03",
        title: "构建并验证",
        description: "用精选区块完成页面，再检查类型、行为、无障碍与设计质量。",
      },
    ],
  },
  quality: {
    eyebrow: "质量是起点的一部分",
    title: "开始很快，但不容易被随手改坏。",
    description: "同一套工作流检查设计契约、TypeScript、页面行为、生产构建与浏览器基础。",
    items: [
      { value: "0", label: "必需服务", detail: "不依赖登录、数据库或密钥。" },
      { value: "AA", label: "对比度目标", detail: "控件在各种主题下都清晰可读。" },
      { value: "2", label: "一等语言", detail: "英文与简体中文。" },
    ],
  },
  faq: {
    eyebrow: "常见问题",
    title: "TanSail 是什么，以及它刻意不做什么。",
    items: [
      {
        question: "TanSail 是 SaaS 模板吗？",
        answer: "不是。它是浏览器优先的产品与营销网站基础；登录、付费和数据库始终是可选项。",
      },
      {
        question: "它能克隆参考网站吗？",
        answer: "它可以分析构图、排版、节奏与交互模式，再生成原创实现，但不会复制专有代码或素材。",
      },
      {
        question: "为什么玻璃效果用得这么克制？",
        answer: "玻璃最适合导航和控件等功能层；不透明的内容表面能保住层级、对比度和性能。",
      },
    ],
  },
  cta: {
    eyebrow: "设定更好的航向",
    title: "从一个已经有设计立场的系统开始。",
    description: "克隆起点，替换内容，同时保留质量门禁。",
  },
  footer: {
    tagline: "设计优先的 TanStack Start，采用 MIT 许可。",
    product: "产品",
    project: "项目",
    social: "社区",
    copyright: "© 2026 TanSail 贡献者",
    designContract: "设计契约",
    documentation: "文档",
    license: "MIT 许可",
  },
} satisfies Dictionary;

const dictionaries: Record<Locale, Dictionary> = { en, zh };

export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}

export function getDictionary(locale: string | undefined): Dictionary {
  if (!locale || !isLocale(locale)) return dictionaries[defaultLocale];
  return dictionaries[locale];
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === "en" ? "zh" : "en";
}

export function resolveLocaleFromPath(pathname: string): Locale {
  const [, candidate] = pathname.split("/");
  return candidate && isLocale(candidate) ? candidate : defaultLocale;
}

export type LocalizedSegment = "gallery" | "docs" | "recipes";
export type LocalizedPath = `/${Locale}/` | `/${Locale}/${LocalizedSegment}/`;

export function getLocalizedPath(locale: Locale): `/${Locale}/`;
export function getLocalizedPath(
  locale: Locale,
  segment: LocalizedSegment,
): `/${Locale}/${LocalizedSegment}/`;
export function getLocalizedPath(locale: Locale, segment?: LocalizedSegment): LocalizedPath {
  return segment ? `/${locale}/${segment}/` : `/${locale}/`;
}
