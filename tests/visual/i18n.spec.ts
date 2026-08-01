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
      name: "Design the direction. Ship the whole site.",
    }),
  ).toBeVisible();
  await expect(page.locator('link[rel="alternate"]')).toHaveCount(3);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/en\/$/);

  await page.getByRole("link", { name: "Change language" }).click();
  await expect(page).toHaveURL(/\/zh\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
  await expect(
    page.getByRole("heading", { level: 1, name: "先把方向设计好，再把整个网站交付。" }),
  ).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/zh\/$/);
});

test("hero remains centered, focused, and inside the viewport", async ({ page }) => {
  await page.goto("/zh");
  await page.waitForLoadState("networkidle");

  const hero = await page.locator(".luminous-hero").boundingBox();
  const copy = await page.locator(".luminous-hero-copy").boundingBox();

  expect(hero).not.toBeNull();
  expect(copy).not.toBeNull();
  await expect(page.locator(".product-preview")).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );

  if (!hero || !copy) return;
  expect(Math.abs(copy.x + copy.width / 2 - (hero.x + hero.width / 2))).toBeLessThan(2);
});

test("footer copy remains readable at an extra-narrow width", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("/zh");
  await page.waitForLoadState("networkidle");

  const tagline = await page.locator(".footer-intro p").boundingBox();
  expect(tagline).not.toBeNull();
  expect(tagline?.width ?? 0).toBeGreaterThan(200);
  expect(tagline?.height ?? Number.POSITIVE_INFINITY).toBeLessThan(90);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
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
