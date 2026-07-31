declare module "*.mdx" {
  import type { ComponentType } from "react";

  export const metadata: unknown;
  const MdxContent: ComponentType;
  export default MdxContent;
}
