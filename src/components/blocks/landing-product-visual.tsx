import { CheckCircle2Icon, FileTextIcon, LayoutGridIcon, MonitorIcon } from "lucide-react";

export function LandingProductVisual() {
  return (
    <div
      className="landing-product-visual"
      role="img"
      aria-label="Responsive TanSail page composition preview"
    >
      <div className="landing-product-sidebar" aria-hidden="true">
        <strong>TS</strong>
        <span className="is-active">
          <LayoutGridIcon />
        </span>
        <span>
          <FileTextIcon />
        </span>
        <span>
          <MonitorIcon />
        </span>
      </div>
      <div className="landing-product-main">
        <div className="landing-product-toolbar">
          <span>Live composition</span>
          <i />
        </div>
        <div className="landing-product-content" aria-hidden="true">
          <span>DESIGN-FIRST STARTER</span>
          <strong>One system. A clearer product story.</strong>
          <p />
          <p />
          <button type="button" tabIndex={-1}>
            Start building
          </button>
          <div className="landing-product-cards">
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="landing-product-status">
          <span>
            <CheckCircle2Icon /> Contract valid
          </span>
          <span>
            <CheckCircle2Icon /> Responsive
          </span>
        </div>
      </div>
    </div>
  );
}
