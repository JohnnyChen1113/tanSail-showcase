import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

import { cn } from "#/lib/utils";

export function MotionReveal({
  children,
  className,
}: {
  readonly children: ReactNode;
  readonly className?: string;
}) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.dataset.state = "visible";
      return;
    }

    element.dataset.state = "pending";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        element.dataset.state = "visible";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8%", threshold: 0.08 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={elementRef} className={cn("motion-reveal", className)} data-reveal="true">
      {children}
    </div>
  );
}
