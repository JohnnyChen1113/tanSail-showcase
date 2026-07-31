import { cn } from "#/lib/utils";

export function BlockHeading({
  centered = false,
  description,
  eyebrow,
  title,
}: {
  readonly centered?: boolean;
  readonly description: string;
  readonly eyebrow: string;
  readonly title: string;
}) {
  return (
    <header className={cn("block-heading", centered && "block-heading-centered")}>
      <p className="block-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p className="block-description">{description}</p>
    </header>
  );
}
