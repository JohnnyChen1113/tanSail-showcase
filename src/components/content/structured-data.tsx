import { serializeJsonLd } from "#/lib/structured-data";

export function StructuredData({ data }: { readonly data: Record<string, unknown> }) {
  return <script type="application/ld+json">{serializeJsonLd(data)}</script>;
}
