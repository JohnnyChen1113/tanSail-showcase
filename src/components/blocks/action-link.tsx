import { ArrowUpRightIcon } from "lucide-react";

import type { ActionConfig } from "#/config/blocks";
import { cn } from "#/lib/utils";

export function ActionLink({
  action,
  className,
  secondary = false,
}: {
  readonly action: ActionConfig;
  readonly className?: string;
  readonly secondary?: boolean;
}) {
  const external = action.href.startsWith("http");

  return (
    <a
      className={cn("block-action", secondary && "block-action-secondary", className)}
      href={action.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {action.label}
      <ArrowUpRightIcon aria-hidden="true" />
    </a>
  );
}
