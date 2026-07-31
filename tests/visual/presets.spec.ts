import { expect, test } from "@playwright/test";

import { presetCatalog } from "../../src/config/presets";

for (const preset of presetCatalog.presets) {
  test(`${preset.label} homepage`, { tag: "@visual" }, async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
    await page.addInitScript((presetId) => {
      localStorage.setItem("theme", "light");
      localStorage.setItem("tansail-preset", presetId);
    }, preset.id);

    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.evaluate(() => document.fonts.ready);

    await expect(page.locator("html")).toHaveAttribute("data-preset", preset.id);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);

    await expect(page).toHaveScreenshot(`${preset.id}-homepage.png`, { fullPage: true });
  });
}

test("preset selection persists across reloads", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
  await page.addInitScript(() => {
    localStorage.setItem("theme", "light");
  });

  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: /change design preset/i }).click();
  await page.getByRole("menuitemcheckbox", { name: /horizon/i }).click();

  await expect(page.locator("html")).toHaveAttribute("data-preset", "horizon");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-preset", "horizon");
});
