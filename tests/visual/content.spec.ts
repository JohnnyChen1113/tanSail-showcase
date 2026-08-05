import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
  await page.addInitScript(() => {
    localStorage.setItem("theme", "light");
    localStorage.setItem("tansail-preset", "harbor");
  });
});

test("MDX blog index and article render with structured data", async ({ page }) => {
  await page.goto("/blog");
  await page.waitForLoadState("networkidle");
  await expect(page.getByRole("heading", { level: 1, name: "TanSail journal" })).toBeVisible();
  await expect(page.locator(".content-entry-list article")).toHaveCount(2);

  await page.getByRole("link", { name: "Read article" }).first().click();
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Why a starter should offer direction, not decoration",
    }),
  ).toBeVisible();
  expect(await page.locator('script[type="application/ld+json"]').textContent()).toContain(
    '"@type":"Article"',
  );
});

test("bilingual field guide remains navigable", async ({ page }) => {
  await page.goto("/docs/zh/");
  await page.waitForLoadState("networkidle");
  await expect(
    page.getByRole("heading", { level: 1, name: "从第一次运行，到完成网站交付" }),
  ).toBeVisible();
  await expect(page.locator(".docs-index-grid article")).toHaveCount(13);

  await page
    .locator(".docs-index-grid article")
    .filter({ hasText: "快速开始" })
    .getByRole("link", { name: "阅读指南" })
    .click();
  await expect(page.getByRole("heading", { level: 1, name: "快速开始" })).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
  await expect(page.locator(".docs-toc a")).toHaveCount(5);

  const titleLength = (await page.title()).length;
  const description =
    (await page.locator('meta[name="description"]').getAttribute("content")) ?? "";
  expect(titleLength).toBeGreaterThanOrEqual(40);
  expect(titleLength).toBeLessThanOrEqual(60);
  expect(description.length).toBeGreaterThanOrEqual(140);
  expect(description.length).toBeLessThanOrEqual(160);

  await page.getByRole("link", { name: /Read in English/ }).click();
  await expect(page.getByRole("heading", { level: 1, name: "Getting started" })).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("marketing recipes remain navigable", async ({ page }) => {
  for (const path of ["/changelog", "/legal", "/contact"]) {
    await page.goto(path);
    await expect(page.locator("h1")).toBeVisible();
  }

  await expect(page.getByRole("link", { name: "Write an email" })).toHaveCount(3);
  expect(await page.locator('script[type="application/ld+json"]').textContent()).toContain(
    '"@type":"Organization"',
  );
});

test("field guide stays contained on a mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/docs/zh/getting-started");
  await expect(page.getByText("浏览文档", { exact: true })).toBeVisible();

  const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  expect(hasOverflow).toBe(false);
});

test("documentation code blocks expose a working copy action", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/docs/en/getting-started");
  const copyButton = page.getByRole("button", { name: "Copy code" }).first();
  await expect(copyButton).toBeVisible({ timeout: 30_000 });
  await copyButton.click();
  await expect(copyButton).toHaveText("Copied");
});
