import { SailboatIcon } from "lucide-react";

export function TanSailMark({ className }: { readonly className?: string }) {
  return (
    <span aria-hidden="true" className={`tansail-mark ${className ?? ""}`}>
      <SailboatIcon />
    </span>
  );
}
