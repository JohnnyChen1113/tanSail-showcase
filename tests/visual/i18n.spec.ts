import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
  await page.addInitScript(() => {
    localStorage.setItem("theme", "light");
    localStorage.setItem("tansail-preset", "harbor");
  });
});

test("localized homepages expose language-safe navigation and SEO", async ({ page }) => {
  await page.goto("/en");
  await page.waitForLoadState("networkidle");

  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "A sharper starting point for your next product.",
    }),
  ).toBeVisible();
  await expect(page.locator('link[rel="alternate"]')).toHaveCount(3);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/en\/$/);

  await page.getByRole("link", { name: "Change language" }).click();
  await expect(page).toHaveURL(/\/zh\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
  await expect(
    page.getByRole("heading", { level: 1, name: "为下一个产品，选一个更好的起点。" }),
  ).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/zh\/$/);
});

test("hero composition stays separated and inside the viewport", async ({ page }) => {
  await page.goto("/zh");
  await page.waitForLoadState("networkidle");

  const copy = await page.locator(".luminous-hero-copy").boundingBox();
  const preview = await page.locator(".product-preview").boundingBox();

  expect(copy).not.toBeNull();
  expect(preview).not.toBeNull();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );

  if ((page.viewportSize()?.width ?? 0) < 768) {
    const footerTagline = await page.locator(".footer-intro p").boundingBox();
    expect(footerTagline?.width ?? 0).toBeGreaterThan(250);
  }

  if (!copy || !preview) return;
  if (page.viewportSize()?.width && page.viewportSize()!.width >= 1024) {
    expect(copy.x + copy.width).toBeLessThanOrEqual(preview.x);
  } else {
    expect(copy.y + copy.height).toBeLessThanOrEqual(preview.y);
  }
});

test("mobile navigation remains operable", async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 0) >= 768, "Mobile-only interaction");

  await page.goto("/en");
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: "Open navigation" }).click();
  const navigation = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(navigation).toBeVisible();
  await navigation.getByRole("link", { name: "System" }).click();
  await expect(page).toHaveURL(/#system$/);
});

test("captures localized visual evidence", async ({ page }, testInfo) => {
  await page.goto("/zh");
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: testInfo.outputPath("zh-homepage.png"), fullPage: true });
});
