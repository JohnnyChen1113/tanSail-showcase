import { defineLandingBlocks, type LogoCloudBlockConfig } from "#/config/blocks";
import type { Locale } from "#/i18n";

const sharedTechnology: LogoCloudBlockConfig["logos"] = [
  { name: "TanStack Start", mark: "TS", category: "Framework", tone: "amber" },
  { name: "TanStack Router", mark: "TR", category: "Routing", tone: "amber" },
  { name: "React 19", mark: "R19", category: "UI", tone: "aqua" },
  { name: "TypeScript", mark: "TS", category: "Language", tone: "blue" },
  { name: "Tailwind CSS", mark: "TW", category: "Styles", tone: "aqua" },
  { name: "shadcn/ui", mark: "UI", category: "Components", tone: "neutral" },
  { name: "Base UI", mark: "BU", category: "Primitives", tone: "neutral" },
  { name: "Vite+", mark: "V+", category: "Toolchain", tone: "violet" },
  { name: "Zod", mark: "Z", category: "Validation", tone: "blue" },
  { name: "Vitest", mark: "VT", category: "Unit tests", tone: "violet" },
  { name: "Playwright", mark: "PW", category: "Browser tests", tone: "blue" },
  { name: "Cloudflare", mark: "CF", category: "Workers runtime", tone: "amber" },
];

const enHomeProofBlocks = defineLandingBlocks([
  {
    kind: "logo-cloud",
    id: "ecosystem",
    variant: "compact-rail",
    title: "A verified, modern stack from typed routes to the Workers runtime",
    logos: sharedTechnology,
  },
  {
    kind: "use-cases",
    id: "scenarios",
    variant: "catalog",
    eyebrow: "Where TanSail fits",
    title: "Start from a real publishing job, not a generic page template.",
    description:
      "Filter the maintained site scenarios. Each one keeps authentication, data, billing, and other services optional until the product actually needs them.",
    filterLabel: "Filter TanSail site scenarios",
    allLabel: "All scenarios",
    items: [
      {
        audience: "Product",
        category: "Product",
        icon: "app-window",
        outcome: "SaaS product launch",
        description: "Connect a clear promise to capabilities, plans, objections, and action.",
        tags: ["Product-led", "Pricing-ready"],
      },
      {
        audience: "Open source",
        category: "Open source",
        icon: "globe",
        outcome: "Open-source project",
        description: "Balance technical proof, community context, documentation, and adoption.",
        tags: ["Docs", "Community"],
      },
      {
        audience: "AI",
        category: "AI",
        icon: "bot",
        outcome: "AI tool or workflow",
        description:
          "Explain a new capability through concrete steps and explicit trust boundaries.",
        tags: ["Workflow", "Trust"],
      },
      {
        audience: "Research",
        category: "Research",
        icon: "flask",
        outcome: "Lab or research project",
        description:
          "Publish methods, tools, projects, and bilingual context without requiring a CMS.",
        tags: ["Methods", "Bilingual"],
      },
      {
        audience: "Knowledge",
        category: "Knowledge",
        icon: "book-open",
        outcome: "Expert-led knowledge site",
        description: "Organize authority, learning outcomes, resources, and replaceable evidence.",
        tags: ["Editorial", "Learning"],
      },
      {
        audience: "Studio",
        category: "Studio",
        icon: "users",
        outcome: "Consulting or product studio",
        description: "Frame the point of view, show the method, and invite a focused conversation.",
        tags: ["Services", "Evidence"],
      },
      {
        audience: "Independent",
        category: "Product",
        icon: "rocket",
        outcome: "Independent product",
        description: "Keep the site personal, focused, and close to one memorable outcome.",
        tags: ["Lean", "Founder-led"],
      },
      {
        audience: "Community",
        category: "Open source",
        icon: "users",
        outcome: "Bilingual community hub",
        description:
          "Give English and Chinese readers equivalent routes, metadata, and navigation.",
        tags: ["i18n", "SEO"],
      },
    ],
  },
  {
    kind: "testimonials",
    id: "feedback-samples",
    variant: "masonry",
    eyebrow: "Testimonial composition",
    title: "A complete feedback wall, ready for real voices.",
    description:
      "These fictional names and quotes demonstrate the reusable template only. Replace them with permissioned feedback before switching the block to verified evidence.",
    evidence: { status: "demo", label: "Sample content · fictional feedback" },
    items: [
      {
        quote:
          "The brief gave the team a shared direction before anyone started debating individual components.",
        name: "Maya Chen",
        role: "Independent builder · example",
        initials: "MC",
        size: "medium",
      },
      {
        quote: "The page stayed ordinary React even after the visual direction became distinctive.",
        name: "Alex Morgan",
        role: "Design engineer · example",
        initials: "AM",
        size: "short",
      },
      {
        quote:
          "We could organize methods, tools, and bilingual project context without adding a database or CMS.",
        name: "Professor Li",
        role: "University researcher · example",
        initials: "LI",
        size: "long",
      },
      {
        quote:
          "Cloudflare remained a concrete delivery target from the brief to the production build.",
        name: "Jordan Lee",
        role: "Product developer · example",
        initials: "JL",
        size: "short",
      },
      {
        quote:
          "English and Chinese read like two designed routes instead of one page passed through a translation layer.",
        name: "Lab member Wang",
        role: "Research team · example",
        initials: "W",
        size: "medium",
      },
      {
        quote:
          "The quality gates made it obvious whether a visual change still worked in a real browser.",
        name: "Noah Patel",
        role: "Frontend contributor · example",
        initials: "NP",
        size: "medium",
      },
      {
        quote:
          "Recipes helped us change the story without turning the codebase into a page builder.",
        name: "Sofia Garcia",
        role: "Product designer · example",
        initials: "SG",
        size: "short",
      },
      {
        quote:
          "The reference workflow kept useful design observations while making the final site visibly original.",
        name: "Ethan Brooks",
        role: "Open-source maintainer · example",
        initials: "EB",
        size: "long",
      },
      {
        quote:
          "Typed content made the handoff much calmer than editing copy inside page components.",
        name: "Nora Kim",
        role: "Content lead · example",
        initials: "NK",
        size: "medium",
      },
    ],
  },
]);

const zhHomeProofBlocks = defineLandingBlocks([
  {
    kind: "logo-cloud",
    id: "ecosystem",
    variant: "compact-rail",
    title: "从类型安全路由到 Workers 运行时，均由仓库中的真实技术组成",
    logos: sharedTechnology,
  },
  {
    kind: "use-cases",
    id: "scenarios",
    variant: "catalog",
    eyebrow: "适用场景",
    title: "从真实的建站任务出发，而不是套用一张万能页面。",
    description:
      "筛选 TanSail 维护的建站方向。登录、数据、付费与其他服务始终保持可选，只有产品确实需要时才加入。",
    filterLabel: "筛选 TanSail 建站场景",
    allLabel: "全部场景",
    items: [
      {
        audience: "产品",
        category: "产品",
        icon: "app-window",
        outcome: "SaaS 产品发布",
        description: "把清楚的产品承诺连接到能力、方案、疑问与行动。",
        tags: ["产品导向", "可扩展定价"],
      },
      {
        audience: "开源",
        category: "开源",
        icon: "globe",
        outcome: "开源项目官网",
        description: "平衡技术证据、社区背景、使用文档与采用路径。",
        tags: ["文档", "社区"],
      },
      {
        audience: "AI",
        category: "AI",
        icon: "bot",
        outcome: "AI 工具与工作流",
        description: "通过具体步骤和明确的信任边界解释一项新能力。",
        tags: ["工作流", "可信边界"],
      },
      {
        audience: "科研",
        category: "科研",
        icon: "flask",
        outcome: "实验室或科研项目",
        description: "发布方法、工具、项目与双语研究背景，同时不强制引入 CMS。",
        tags: ["研究方法", "双语"],
      },
      {
        audience: "知识",
        category: "知识",
        icon: "book-open",
        outcome: "专家知识网站",
        description: "组织专业可信度、学习结果、资源与可替换的证明内容。",
        tags: ["编辑叙事", "学习"],
      },
      {
        audience: "工作室",
        category: "工作室",
        icon: "users",
        outcome: "咨询或产品工作室",
        description: "表达观点、展示方法，并邀请一次目标明确的沟通。",
        tags: ["服务", "项目证据"],
      },
      {
        audience: "独立创作者",
        category: "产品",
        icon: "rocket",
        outcome: "独立产品",
        description: "让网站保持个人感、专注，并围绕一个容易记住的结果展开。",
        tags: ["轻量", "创作者主导"],
      },
      {
        audience: "社区",
        category: "开源",
        icon: "users",
        outcome: "双语社区入口",
        description: "为中英文读者提供对等的路由、元数据与导航体验。",
        tags: ["国际化", "SEO"],
      },
    ],
  },
  {
    kind: "testimonials",
    id: "feedback-samples",
    variant: "masonry",
    eyebrow: "评价组件模板",
    title: "一面完整的评价墙，等待换成真实声音。",
    description:
      "以下姓名与评价均为虚构的组件演示内容。获得授权的真实反馈后，再将区块切换为 verified 状态。",
    evidence: { status: "demo", label: "模板示例 · 虚构评价" },
    items: [
      {
        quote: "这份 brief 让团队先对齐方向，再开始讨论每一个组件。",
        name: "陈同学",
        role: "独立开发者 · 示例人物",
        initials: "陈",
        size: "medium",
      },
      {
        quote: "视觉方向变得鲜明以后，页面依然是普通、清楚的 React 代码。",
        name: "Alex Morgan",
        role: "设计工程师 · 示例人物",
        initials: "AM",
        size: "short",
      },
      {
        quote: "不用添加数据库或 CMS，也能把研究方法、适用工具和双语项目背景组织清楚。",
        name: "李教授",
        role: "高校研究者 · 示例人物",
        initials: "李",
        size: "long",
      },
      {
        quote: "从简报到生产构建，Cloudflare 始终是明确而具体的交付目标。",
        name: "Jordan Lee",
        role: "产品开发者 · 示例人物",
        initials: "JL",
        size: "short",
      },
      {
        quote: "中英文像两条分别设计过的路由，而不是把同一张页面简单翻译一次。",
        name: "王实验员",
        role: "科研团队 · 示例人物",
        initials: "王",
        size: "medium",
      },
      {
        quote: "质量门禁让我们很容易确认一次视觉修改是否仍能在真实浏览器里工作。",
        name: "Noah Patel",
        role: "前端贡献者 · 示例人物",
        initials: "NP",
        size: "medium",
      },
      {
        quote: "页面 recipe 改变了叙事方式，却没有把代码库变成一个页面构建器。",
        name: "张同学",
        role: "产品设计学生 · 示例人物",
        initials: "张",
        size: "short",
      },
      {
        quote: "参考流程保留了真正有用的设计观察，同时让最终网站保持明显的原创性。",
        name: "Ethan Brooks",
        role: "开源维护者 · 示例人物",
        initials: "EB",
        size: "long",
      },
      {
        quote: "类型化内容让交接更平静，不需要进入页面组件里寻找每一段文案。",
        name: "林老师",
        role: "内容负责人 · 示例人物",
        initials: "林",
        size: "medium",
      },
    ],
  },
]);

export function getHomeProofBlocks(locale: Locale) {
  return locale === "zh" ? zhHomeProofBlocks : enHomeProofBlocks;
}
