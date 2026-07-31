import {
  CheckCircle2Icon,
  CircleIcon,
  Code2Icon,
  FileCode2Icon,
  Globe2Icon,
  LayoutTemplateIcon,
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
          <span>TanSail Studio</span>
        </div>
        <span className="product-status">
          <CircleIcon aria-hidden="true" /> Cloudflare preview
        </span>
      </div>

      <div className="product-workspace">
        <aside className="product-files" aria-label={isChinese ? "项目文件" : "Project files"}>
          <strong>{isChinese ? "项目" : "Project"}</strong>
          <span className="is-active">
            <SparklesIcon aria-hidden="true" /> DESIGN.md
          </span>
          <span>
            <Globe2Icon aria-hidden="true" /> i18n.ts
          </span>
          <span>
            <LayoutTemplateIcon aria-hidden="true" /> blocks.ts
          </span>
          <span>
            <FileCode2Icon aria-hidden="true" /> index.tsx
          </span>
        </aside>

        <div className="product-editor">
          <div className="product-editor-tab">
            <Code2Icon aria-hidden="true" /> DESIGN.md
          </div>
          <pre aria-hidden="true">
            <code>
              <span>name:</span> Luminous Harbor{"\n"}
              <span>principles:</span>
              {"\n"}
              {"  "}- language-aware type{"\n"}
              {"  "}- restrained glass{"\n"}
              {"  "}- real product evidence{"\n"}
              <span>quality:</span> WCAG AA
            </code>
          </pre>
          <div className="product-checks">
            <span>
              <CheckCircle2Icon aria-hidden="true" /> design:check
            </span>
            <span>
              <CheckCircle2Icon aria-hidden="true" /> typecheck
            </span>
            <span>
              <CheckCircle2Icon aria-hidden="true" /> browser
            </span>
          </div>
        </div>

        <div className="product-canvas">
          <div className="product-canvas-toolbar">
            <span>/{locale}</span>
            <PlayIcon aria-hidden="true" />
          </div>
          <div className="product-canvas-page" lang={isChinese ? "zh-CN" : "en"}>
            <span className="product-mini-label">TANSAIL</span>
            <strong>
              {isChinese ? "为你的产品，设定更好的航向。" : "Give your product a better course."}
            </strong>
            <p>
              {isChinese
                ? "清楚的系统，真实的产品画面。"
                : "A clear system with real product evidence."}
            </p>
            <i aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}
