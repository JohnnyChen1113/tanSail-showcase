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

test("documentation and marketing recipes remain navigable", async ({ page }) => {
  await page.goto("/docs/getting-started");
  await page.waitForLoadState("networkidle");
  await expect(
    page.getByRole("heading", { level: 1, name: "Getting started with TanSail" }),
  ).toBeVisible();

  for (const path of ["/changelog", "/legal", "/contact"]) {
    await page.goto(path);
    await expect(page.locator("h1")).toBeVisible();
  }

  await expect(page.getByRole("link", { name: "Write an email" })).toHaveCount(3);
  expect(await page.locator('script[type="application/ld+json"]').textContent()).toContain(
    '"@type":"Organization"',
  );
});
