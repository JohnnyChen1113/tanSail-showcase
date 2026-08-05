import type { PresetId } from "#/config/presets";

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
    descriptions: Record<PresetId, string>;
  };
  announcement: {
    text: string;
    action: string;
  };
  navigation: {
    docs: string;
    recipes: string;
    system: string;
    scenarios: string;
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
  paths: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{ kicker: string; title: string; description: string; command: string }>;
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
    title: "TanSail v0.2.0 — Design direction. Ship bilingual websites.",
    description:
      "Build original bilingual product websites with TanSail v0.2.0 using governed design contracts, typed routes, browser-tested UI, SEO, and Cloudflare Workers.",
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
      ledger: "Graphic, compact, and structured like a working manual.",
    },
  },
  announcement: {
    text: "TanSail v0.2.0 is live: design contracts, bilingual routes, and clean-room references.",
    action: "Read the release",
  },
  navigation: {
    docs: "Docs",
    recipes: "Ledger demo",
    system: "System",
    scenarios: "Scenarios",
    workflow: "Delivery",
    quality: "Proof",
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
    label: "TanSail v0.2.0, in working parts",
    values: [
      "DESIGN.md",
      "/en + /zh",
      "9 block families",
      "6 page recipes",
      "Cloudflare Workers",
      "0 required secrets",
    ],
  },
  paths: {
    eyebrow: "Three ways in",
    title: "Start with the context you actually have.",
    description:
      "A prompt, a reference, or a clean foundation can enter the same governed workflow without turning into the same-looking website.",
    items: [
      {
        kicker: "01 · Prompt",
        title: "A product idea",
        description:
          "Translate audience, outcome, pages, tone, and deployment into a validated site brief before touching presentation code.",
        command: "$ build-tansail-site",
      },
      {
        kicker: "02 · Reference",
        title: "A URL or screenshot",
        description:
          "Record high-level design observations, require visible transformations, and rebuild with original copy, assets, and composition.",
        command: "$ reference-to-tansail",
      },
      {
        kicker: "03 · Starter",
        title: "A clean foundation",
        description:
          "Begin with React 19, typed routes, curated blocks, themes, checks, and a Cloudflare-native production target.",
        command: "$ vp dev",
      },
    ],
  },
  system: {
    eyebrow: "Governed system",
    title: "The page stays flexible. The standards stay put.",
    description:
      "The v0.2.0 contracts keep identity, language, composition, and delivery aligned without coupling them to one website.",
    items: [
      {
        kicker: "01 · Direction",
        title: "A design contract that travels",
        description:
          "DESIGN.md stores machine-readable tokens beside the reasoning that keeps them coherent.",
        metric: "1 source",
      },
      {
        kicker: "02 · Language",
        title: "Routes built for both languages",
        description:
          "English and Chinese share structure while keeping independent copy, metadata, type metrics, and accessible controls.",
        metric: "2 locales",
      },
      {
        kicker: "03 · Composition",
        title: "Curated blocks, not a page builder",
        description:
          "Typed blocks and six narrative recipes create range without a proprietary runtime or arbitrary canvas.",
        metric: "9 families",
      },
      {
        kicker: "04 · Delivery",
        title: "A Worker is the default output",
        description:
          "The official Cloudflare Vite plugin, prerendering, Wrangler, and SEO routes share one documented path.",
        metric: "1 target",
      },
    ],
  },
  workflow: {
    eyebrow: "One delivery path",
    title: "From intent to a live Worker, with evidence at every step.",
    description:
      "Each phase leaves a typed or versioned artifact behind, so the finish is reproducible instead of accidental.",
    steps: [
      {
        number: "01",
        title: "Brief the outcome",
        description: "Define the audience, promise, pages, tone, locales, and production target.",
      },
      {
        number: "02",
        title: "Lock design intent",
        description:
          "Record tokens, material rules, type metrics, and explicit clean-room boundaries.",
      },
      {
        number: "03",
        title: "Compose the routes",
        description:
          "Build English and Chinese pages from typed content and original product surfaces.",
      },
      {
        number: "04",
        title: "Check and deploy",
        description:
          "Verify design, types, tests, browser behavior, build output, and the live Worker.",
      },
    ],
  },
  quality: {
    eyebrow: "Proof, not promises",
    title: "The useful numbers are the ones the repository can verify.",
    description:
      "TanSail avoids invented customers, vanity metrics, and hidden service dependencies. Its evidence lives in the codebase.",
    items: [
      { value: "0", label: "required services", detail: "No auth, database, or secret needed." },
      { value: "2", label: "first-class locales", detail: "English and Simplified Chinese." },
      { value: "3", label: "visual atmospheres", detail: "Harbor, Luminous, and Signal." },
      {
        value: "6",
        label: "page recipes",
        detail: "Product, open-source, expert, and studio paths.",
      },
    ],
  },
  faq: {
    eyebrow: "Frequently asked",
    title: "What TanSail is—and what it deliberately is not.",
    items: [
      {
        question: "Is TanSail a SaaS boilerplate or a page builder?",
        answer:
          "Neither. It is a browser-first product and marketing foundation built from ordinary typed React compositions. Authentication, billing, and databases stay optional.",
      },
      {
        question: "Can it reproduce a reference website?",
        answer:
          "It can analyze composition, typography, rhythm, and interaction patterns, then generate an original implementation without copying proprietary code or assets.",
      },
      {
        question: "What changed in v0.2.0?",
        answer:
          "The release added the DESIGN.md contract, English and Chinese routes, language-aware typography, original product surfaces, and the clean-room Reference-to-TanSail workflow.",
      },
    ],
  },
  cta: {
    eyebrow: "Set the course",
    title: "Give the next website a direction before it gets more files.",
    description: "Start from the v0.2.0 repository. Keep the contracts, replace the product.",
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
    title: "TanSail v0.2.0｜先定设计方向，再交付双语 TanStack Start 产品官网",
    description:
      "TanSail v0.2.0 帮助团队把清晰简报转化为原创双语产品官网，覆盖 DESIGN.md 设计契约、类型安全的 TanStack Start 路由、中英文 SEO、响应式界面与无障碍默认值、真实浏览器质量验证，以及 Cloudflare Workers 构建、预览和部署，全程不要求登录、数据库或密钥。",
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
      ledger: "硬朗、紧凑，像一本可直接工作的编目手册。",
    },
  },
  announcement: {
    text: "TanSail v0.2.0 已发布：设计契约、双语路由与 clean-room 参考流程。",
    action: "查看版本说明",
  },
  navigation: {
    docs: "使用文档",
    recipes: "Ledger 方案",
    system: "设计系统",
    scenarios: "适用场景",
    workflow: "交付路径",
    quality: "项目证据",
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
    label: "组成 TanSail v0.2.0 的真实部件",
    values: [
      "DESIGN.md",
      "/en + /zh",
      "9 类区块",
      "6 套页面 recipe",
      "Cloudflare Workers",
      "0 个必需密钥",
    ],
  },
  paths: {
    eyebrow: "三种入口",
    title: "从你手上真正拥有的上下文开始。",
    description:
      "无论是一段想法、一个参考站，还是一套干净的基础，都能进入同一条受约束的流程，但不会长成千篇一律的网站。",
    items: [
      {
        kicker: "01 · 一段需求",
        title: "从产品想法开始",
        description:
          "先把受众、结果、页面、语气和部署目标整理成通过校验的 brief，再触碰表现层代码。",
        command: "$ build-tansail-site",
      },
      {
        kicker: "02 · 一个参考",
        title: "从网址或截图开始",
        description: "只记录高层设计观察，明确要求可见转化，再用原创文案、素材和构图重新实现。",
        command: "$ reference-to-tansail",
      },
      {
        kicker: "03 · 一套基础",
        title: "从干净 starter 开始",
        description:
          "直接获得 React 19、类型安全路由、精选区块、主题、质量检查和 Cloudflare 生产目标。",
        command: "$ vp dev",
      },
    ],
  },
  system: {
    eyebrow: "受治理的系统",
    title: "页面可以灵活，标准不会漂移。",
    description: "v0.2.0 的契约让品牌、语言、构图和交付始终对齐，却不把它们锁死在某一个网站里。",
    items: [
      {
        kicker: "01 · 方向",
        title: "可以随项目迁移的设计契约",
        description: "DESIGN.md 把机器可读的 token 与保持系统一致的设计理由放在同一个地方。",
        metric: "1 个源头",
      },
      {
        kicker: "02 · 语言",
        title: "真正为两种语言设计的路由",
        description: "中英文共享结构，但各自拥有自然文案、元数据、排版尺度和无障碍控件。",
        metric: "2 种语言",
      },
      {
        kicker: "03 · 构图",
        title: "精选区块，而不是页面构建器",
        description: "类型安全区块与六套叙事 recipe 提供变化，不需要专有运行时或任意拖拽画布。",
        metric: "9 个家族",
      },
      {
        kicker: "04 · 交付",
        title: "默认产物就是一个 Worker",
        description: "官方 Cloudflare Vite 插件、预渲染、Wrangler 与 SEO 路由共用一条清楚路径。",
        metric: "1 个目标",
      },
    ],
  },
  workflow: {
    eyebrow: "一条交付路径",
    title: "从意图到在线 Worker，每一步都有证据。",
    description: "每个阶段都会留下类型安全或可版本化的产物，让完成度可以复现，而不是偶然出现。",
    steps: [
      {
        number: "01",
        title: "定义结果",
        description: "明确受众、承诺、页面、语气、语言与生产环境。",
      },
      {
        number: "02",
        title: "锁定设计意图",
        description: "记录 token、材质规则、排版尺度和明确的 clean-room 边界。",
      },
      {
        number: "03",
        title: "构建双语路由",
        description: "用类型安全内容与原创产品画面完成中英文页面。",
      },
      {
        number: "04",
        title: "检查并部署",
        description: "验证设计、类型、测试、浏览器行为、构建产物和线上 Worker。",
      },
    ],
  },
  quality: {
    eyebrow: "证据，而不是口号",
    title: "真正有用的数字，都应该能在仓库里验证。",
    description: "TanSail 不虚构客户与指标，也不隐藏服务依赖；它的证据就在代码里。",
    items: [
      { value: "0", label: "必需服务", detail: "不依赖登录、数据库或密钥。" },
      { value: "2", label: "一等语言", detail: "英文与简体中文。" },
      { value: "3", label: "视觉氛围", detail: "Harbor、Luminous 与 Signal。" },
      { value: "6", label: "页面 recipe", detail: "覆盖产品、开源、专家与工作室。" },
    ],
  },
  faq: {
    eyebrow: "常见问题",
    title: "TanSail 是什么，以及它刻意不做什么。",
    items: [
      {
        question: "TanSail 是 SaaS 模板或页面构建器吗？",
        answer:
          "都不是。它是由普通、类型安全 React 构图组成的浏览器优先产品站基础；登录、付费和数据库始终可选。",
      },
      {
        question: "它能克隆参考网站吗？",
        answer: "它可以分析构图、排版、节奏与交互模式，再生成原创实现，但不会复制专有代码或素材。",
      },
      {
        question: "v0.2.0 新增了什么？",
        answer:
          "这一版加入 DESIGN.md 契约、中英文路由、语言感知排版、原创产品画面，以及 clean-room 的 Reference-to-TanSail 流程。",
      },
    ],
  },
  cta: {
    eyebrow: "设定航向",
    title: "在文件变多之前，先给下一个网站一个方向。",
    description: "从 v0.2.0 仓库开始。保留契约，替换产品。",
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
  const segments = pathname.split("/").filter(Boolean);
  const candidate = segments[0] === "docs" ? segments[1] : segments[0];
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
