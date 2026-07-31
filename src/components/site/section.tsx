import type { ReactNode } from "react";

import { cn } from "#/lib/utils";

type SectionProps = {
  readonly children: ReactNode;
  readonly className?: string;
  readonly description?: string;
  readonly eyebrow: string;
  readonly id: string;
  readonly title: string;
};

export function Section({ children, className, description, eyebrow, id, title }: SectionProps) {
  const headingId = `${id}-title`;

  return (
    <section id={id} className={cn("content-section", className)} aria-labelledby={headingId}>
      <div className="section-heading">
        <p>{eyebrow}</p>
        <div>
          <h2 id={headingId}>{title}</h2>
          {description ? <p className="section-description">{description}</p> : null}
        </div>
      </div>
      {children}
    </section>
  );
}
