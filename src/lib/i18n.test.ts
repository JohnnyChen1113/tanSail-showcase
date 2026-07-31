import { describe, expect, it } from "vite-plus/test";

import {
  defaultLocale,
  getAlternateLocale,
  getDictionary,
  getLocalizedPath,
  isLocale,
  locales,
} from "#/i18n";

describe("localization contract", () => {
  it("ships English and Simplified Chinese with a safe fallback", () => {
    expect(locales).toEqual(["en", "zh"]);
    expect(defaultLocale).toBe("en");
    expect(isLocale("zh")).toBe(true);
    expect(isLocale("fr")).toBe(false);
    expect(getDictionary("fr")).toBe(getDictionary(defaultLocale));
  });

  it("keeps both dictionaries structurally complete", () => {
    expect(Object.keys(getDictionary("zh"))).toEqual(Object.keys(getDictionary("en")));
    expect(getDictionary("zh").meta.title).toContain("TanSail");
    expect(getDictionary("en").a11y.skipToContent).toBeTruthy();
    expect(getDictionary("zh").appearance.light).toBe("浅色");
  });

  it("creates locale-aware paths without stringly-typed route assembly", () => {
    expect(getLocalizedPath("zh")).toBe("/zh/");
    expect(getLocalizedPath("en", "gallery")).toBe("/en/gallery/");
    expect(getAlternateLocale("en")).toBe("zh");
    expect(getAlternateLocale("zh")).toBe("en");
  });
});
