import {
  CheckCircle2Icon,
  CircleIcon,
  CloudIcon,
  Code2Icon,
  FileTextIcon,
  Globe2Icon,
  PaletteIcon,
  PlayIcon,
  SparklesIcon,
} from "lucide-react";

import type { Locale } from "#/i18n";

export function ProductPreview({ locale }: { readonly locale: Locale }) {
  const isChinese = locale === "zh";

  return (
    <div
      className="product-preview"
      role="img"
      aria-label={
        isChinese
          ? "TanSail 项目工作区，包含文件、设计契约和实时页面预览"
          : "TanSail workspace with files, a design contract, and a live page preview"
      }
    >
      <div className="product-window-bar">
        <div className="product-window-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className="product-window-title">
          <SparklesIcon aria-hidden="true" />
          <span>TanSail Course Control</span>
        </div>
        <span className="product-status">
          <CircleIcon aria-hidden="true" /> v0.2.0 · Cloudflare
        </span>
      </div>

      <div className="product-workspace">
        <aside className="product-files" aria-label={isChinese ? "项目文件" : "Project files"}>
          <strong>{isChinese ? "项目" : "Project"}</strong>
          <span className="is-active">
            <FileTextIcon aria-hidden="true" /> SITE-BRIEF.md
          </span>
          <span>
            <PaletteIcon aria-hidden="true" /> DESIGN.md
          </span>
          <span>
            <Globe2Icon aria-hidden="true" /> i18n.ts
          </span>
          <span>
            <CloudIcon aria-hidden="true" /> wrangler.jsonc
          </span>
        </aside>

        <div className="product-editor">
          <div className="product-editor-tab">
            <Code2Icon aria-hidden="true" /> SITE-BRIEF.md
          </div>
          <pre aria-hidden="true">
            <code>
              <span>brand:</span> TanSail{"\n"}
              <span>direction:</span> Course Control{"\n"}
              <span>locales:</span> [en, zh]{"\n"}
              <span>target:</span> cloudflare-workers{"\n"}
              <span>evidence:</span> repository
            </code>
          </pre>
          <div className="product-checks">
            <span>
              <CheckCircle2Icon aria-hidden="true" /> design:check
            </span>
            <span>
              <CheckCircle2Icon aria-hidden="true" /> test:browser
            </span>
            <span>
              <CheckCircle2Icon aria-hidden="true" /> build
            </span>
          </div>
        </div>

        <div className="product-canvas">
          <div className="product-canvas-toolbar">
            <span>/{locale}</span>
            <PlayIcon aria-hidden="true" />
          </div>
          <div className="product-canvas-page" lang={isChinese ? "zh-CN" : "en"}>
            <span className="product-mini-label">TANSAIL · v0.2.0</span>
            <strong>
              {isChinese
                ? "先定方向，再把整站交付。"
                : "Design the direction. Ship the whole site."}
            </strong>
            <p>
              {isChinese
                ? "设计契约、双语路由与可部署的 Worker。"
                : "A design contract, bilingual routes, and a deployable Worker."}
            </p>
            <i aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}
