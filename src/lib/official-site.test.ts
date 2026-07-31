import { describe, expect, it } from "vite-plus/test";

import { officialHomeBlocks } from "#/config/official";
import { presetCatalog } from "#/config/presets";
import { siteConfig } from "#/config/site";

describe("TanSail official site", () => {
  it("uses Horizon as the default visual direction", () => {
    expect(presetCatalog.defaultPreset).toBe("horizon");
    expect(siteConfig.metadata.locale).toBe("zh-CN");
  });

  it("keeps claims factual and the conversion path focused", () => {
    expect(officialHomeBlocks.at(0)?.kind).toBe("hero");
    expect(officialHomeBlocks.at(-1)?.kind).toBe("cta");
    expect(officialHomeBlocks.some((block) => block.kind === "testimonials")).toBe(false);
    expect(officialHomeBlocks.some((block) => block.kind === "pricing")).toBe(false);
  });
});
