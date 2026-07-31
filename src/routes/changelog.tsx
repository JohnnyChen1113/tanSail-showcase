import { createFileRoute } from "@tanstack/react-router";

import { MarketingPageShell } from "#/components/content/marketing-page-shell";
import { changelogEntries } from "#/config/marketing";

export const Route = createFileRoute("/changelog")({
  head: () => ({ meta: [{ title: "Changelog — TanSail" }] }),
  component: ChangelogPage,
});

function ChangelogPage() {
  return (
    <MarketingPageShell
      eyebrow="Product history"
      title="Changelog"
      description="A transparent record of meaningful changes, organized for readers rather than commit logs."
    >
      <div className="changelog-list">
        {changelogEntries.map((entry) => (
          <article key={entry.version}>
            <div>
              <span>v{entry.version}</span>
              <time dateTime={entry.date}>{entry.date}</time>
            </div>
            <div>
              <h2>{entry.title}</h2>
              <p>{entry.summary}</p>
              <ul>
                {entry.changes.map((change) => (
                  <li key={change}>{change}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </MarketingPageShell>
  );
}
