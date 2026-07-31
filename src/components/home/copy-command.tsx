import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

const installCommand = "pnpm create tansail@latest";

export function CopyCommand({ label }: { readonly label: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(installCommand);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1_600);
  }

  return (
    <button className="install-command" type="button" onClick={copy} aria-label={label}>
      <code>{installCommand}</code>
      {copied ? <CheckIcon aria-hidden="true" /> : <CopyIcon aria-hidden="true" />}
    </button>
  );
}
