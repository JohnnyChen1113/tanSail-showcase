import { defineLandingBlocks } from "#/config/blocks";

export const officialHomeBlocks = defineLandingBlocks([
  {
    kind: "hero",
    id: "official-hero",
    variant: "product",
    eyebrow: "开源 · 设计优先 · Cloudflare 原生",
    title: "为下一个网站，设定更好的航向。",
    description:
      "TanSail 把可靠的 TanStack Start 工程基础、可切换的视觉系统和类型安全的页面区块装进一个精炼的起点，让你把时间留给真正独特的产品。",
    primaryAction: {
      label: "在 GitHub 开始",
      href: "https://github.com/JohnnyChen1113/tanSail",
    },
    secondaryAction: { label: "探索核心能力", href: "#capabilities" },
    note: "MIT 许可证 · 无必需密钥 · 面向 Cloudflare Workers",
  },
  {
    kind: "logo-cloud",
    id: "stack",
    title: "建立在现代、耐用且开放的 Web 技术之上",
    logos: ["TanStack", "React 19", "Cloudflare", "Tailwind CSS", "shadcn/ui", "Vite+"],
  },
  {
    kind: "features",
    id: "capabilities",
    variant: "bento",
    eyebrow: "核心能力",
    title: "从第一屏到上线，保持同一套清晰的工程语言。",
    description: "内容、结构与视觉彼此解耦；你可以快速改变品牌表达，而不必反复重写页面基础。",
    items: [
      {
        icon: "sparkles",
        title: "三套完整视觉预设",
        description: "Harbor、Horizon 与 Nightwatch 同时改变颜色、字体、密度、几何与构图。",
        metric: "3 presets",
      },
      {
        icon: "layout",
        title: "类型安全的页面区块",
        description: "Hero、特性、场景、数据、FAQ 与 CTA 都由 Zod 验证的配置驱动。",
        metric: "9 families",
      },
      {
        icon: "gauge",
        title: "Cloudflare 原生",
        description: "通过官方 Cloudflare Vite 插件构建、预览并部署到 Workers。",
      },
      {
        icon: "shield",
        title: "质量门槛内置",
        description: "格式化、Lint、类型检查、单元测试和生产构建共享同一条工作流。",
      },
      {
        icon: "wand",
        title: "从 brief 生成",
        description: "把自然语言需求约束为版本化站点 brief，再安全映射到预设与页面 recipe。",
      },
      {
        icon: "blocks",
        title: "小核心，可选扩展",
        description: "认证、数据库、支付、邮件、分析和 CMS 都不与 starter 核心绑定。",
      },
    ],
  },
  {
    kind: "use-cases",
    id: "use-cases",
    eyebrow: "适用场景",
    title: "给不同的团队，同一条更短的起跑线。",
    description: "TanSail 负责重复却关键的基础，让每个项目保留自己的内容与个性。",
    items: [
      {
        audience: "独立开发者",
        outcome: "更快发布第一版",
        description: "跳过从零拼装设计系统的阶段，从一个已经精心打磨的产品页面开始。",
      },
      {
        audience: "开源维护者",
        outcome: "更清楚地解释项目",
        description: "用文档、博客、更新日志与着陆页区块，建立连贯的采用路径。",
      },
      {
        audience: "产品工作室",
        outcome: "复用质量，不复用品牌",
        description: "保留稳定的工程规范，为不同项目切换内容、构图和视觉方向。",
      },
    ],
  },
  {
    kind: "stats",
    id: "stats",
    title: "精炼核心，覆盖从设计到部署的关键路径",
    items: [
      { value: "3", label: "完整视觉预设" },
      { value: "9", label: "着陆页区块家族" },
      { value: "6", label: "页面叙事 recipes" },
      { value: "0", label: "默认所需密钥" },
    ],
  },
  {
    kind: "faq",
    id: "faq",
    eyebrow: "常见问题",
    title: "保持简单，也保持开放。",
    description: "TanSail 的默认选择围绕可理解、可删除和可长期维护而设计。",
    items: [
      {
        question: "TanSail 是页面构建器吗？",
        answer: "不是。页面是普通的、类型安全的 React 组合，没有运行时编辑器，也没有专有内容格式。",
      },
      {
        question: "必须使用数据库、登录或第三方服务吗？",
        answer:
          "不需要。默认项目不依赖密钥即可运行和部署；认证、数据库、支付、邮件与分析保持可选。",
      },
      {
        question: "可以只保留需要的区块吗？",
        answer:
          "可以。每个区块通过独立配置接收数据，不依赖全局页面构建器状态，可以安全删除或重新排序。",
      },
      {
        question: "如何部署？",
        answer:
          "项目通过官方 Cloudflare Vite 插件构建，并使用 Wrangler 发布到 Cloudflare Workers。",
      },
      {
        question: "可以用于商业项目吗？",
        answer: "可以。TanSail 以 MIT 许可证发布，请在使用前阅读仓库中的完整许可证文本。",
      },
    ],
  },
  {
    kind: "cta",
    id: "start",
    variant: "banner",
    eyebrow: "准备启航？",
    title: "从可靠的基础出发，把独特留给你的产品。",
    description: "浏览源码、阅读路线图，然后用 TanSail 构建你的下一个网站。",
    primaryAction: {
      label: "查看 GitHub 仓库",
      href: "https://github.com/JohnnyChen1113/tanSail",
    },
    secondaryAction: {
      label: "阅读开发路线图",
      href: "https://github.com/JohnnyChen1113/tanSail/blob/main/DEVELOPMENT_PLAN.md",
    },
  },
]);
