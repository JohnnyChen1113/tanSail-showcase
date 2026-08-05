import {
  AppWindowIcon,
  ArrowRightIcon,
  BotIcon,
  BookOpenIcon,
  FlaskConicalIcon,
  Globe2Icon,
  RocketIcon,
  UsersIcon,
} from "lucide-react";
import { useState } from "react";

import { BlockHeading } from "#/components/blocks/block-heading";
import { MotionReveal } from "#/components/blocks/motion-reveal";
import type { UseCaseBlockConfig } from "#/config/blocks";

function ScenarioIcon({ icon }: { readonly icon: UseCaseBlockConfig["items"][number]["icon"] }) {
  switch (icon) {
    case "bot":
      return <BotIcon aria-hidden="true" />;
    case "book-open":
      return <BookOpenIcon aria-hidden="true" />;
    case "flask":
      return <FlaskConicalIcon aria-hidden="true" />;
    case "globe":
      return <Globe2Icon aria-hidden="true" />;
    case "rocket":
      return <RocketIcon aria-hidden="true" />;
    case "users":
      return <UsersIcon aria-hidden="true" />;
    default:
      return <AppWindowIcon aria-hidden="true" />;
  }
}

export function UseCaseBlock({ block }: { readonly block: UseCaseBlockConfig }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const categories = Array.from(
    new Set(block.items.map((item) => item.category).filter((category) => category !== undefined)),
  );
  const visibleItems =
    activeCategory === "all"
      ? block.items
      : block.items.filter((item) => item.category === activeCategory);

  return (
    <section id={block.id} className="landing-block use-case-block" data-variant={block.variant}>
      <MotionReveal>
        <BlockHeading eyebrow={block.eyebrow} title={block.title} description={block.description} />
        {block.variant === "catalog" ? (
          <>
            <div className="use-case-filters" role="group" aria-label={block.filterLabel}>
              <button
                type="button"
                aria-pressed={activeCategory === "all"}
                onClick={() => setActiveCategory("all")}
              >
                {block.allLabel}
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  aria-pressed={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="use-case-catalog" aria-live="polite">
              {visibleItems.map((item) => (
                <article key={`${item.category}-${item.outcome}`}>
                  <div className="use-case-catalog-meta">
                    <span>{item.audience}</span>
                    <ScenarioIcon icon={item.icon} />
                  </div>
                  <h3>{item.outcome}</h3>
                  <p>{item.description}</p>
                  {item.tags.length > 0 ? (
                    <ul aria-label={`${item.outcome} tags`}>
                      {item.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="use-case-list">
            {block.items.map((item, index) => (
              <article key={item.audience}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <p>{item.audience}</p>
                  <h3>{item.outcome}</h3>
                  <p>{item.description}</p>
                </div>
                <ArrowRightIcon aria-hidden="true" />
              </article>
            ))}
          </div>
        )}
      </MotionReveal>
    </section>
  );
}
