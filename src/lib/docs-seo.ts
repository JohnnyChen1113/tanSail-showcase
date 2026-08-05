import type { Locale } from "#/i18n";

function truncateWithEllipsis(value: string, maximum: number) {
  if (value.length <= maximum) return value;
  return `${value.slice(0, maximum - 1).trimEnd()}…`;
}

export function createDocsSeoTitle(title: string, locale: Locale) {
  const suffix =
    locale === "zh"
      ? "｜TanSail 官方文档：设计系统与 Cloudflare Workers 建站指南"
      : " | TanSail Docs for TanStack Start and Cloudflare";
  return truncateWithEllipsis(`${title}${suffix}`, 60);
}

export function createDocsSeoDescription(description: string, locale: Locale) {
  const suffix =
    locale === "zh"
      ? "本文提供明确的配置位置、命令示例、操作步骤、验证方法和常见错误，并说明它如何与 TanSail 的双语路由、设计系统、质量门禁及 Cloudflare Workers 交付流程协同；默认核心不要求数据库、鉴权、支付或项目密钥。"
      : "This guide includes exact configuration locations, commands, verification steps, and common failure modes, while keeping TanSail deployable without auth, a database, billing, or required secrets.";
  return truncateWithEllipsis(`${description.trim()} ${suffix}`, 160);
}
