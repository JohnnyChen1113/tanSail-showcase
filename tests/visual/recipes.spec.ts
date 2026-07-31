import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
  await page.addInitScript(() => {
    localStorage.setItem("theme", "light");
    localStorage.setItem("tansail-preset", "harbor");
  });
});

test("recipe index links to six typed compositions", async ({ page }) => {
  await page.goto("/recipes");
  await page.waitForLoadState("networkidle");

  await expect(
    page.getByRole("heading", { level: 1, name: "Choose a page recipe, then make it yours." }),
  ).toBeVisible();
  await expect(page.locator(".recipe-card-grid article")).toHaveCount(6);
  await expect(page.getByRole("link", { name: "Preview recipe" })).toHaveCount(6);
});

test("recipe detail renders its configured block sequence", async ({ page }) => {
  await page.goto("/recipes/saas-product");
  await page.waitForLoadState("networkidle");

  await expect(page.getByRole("heading", { level: 1, name: "SaaS product" })).toBeVisible();
  await expect(page.getByText("9 blocks")).toBeVisible();
  await expect(page.locator(".recipe-composition > .landing-block")).toHaveCount(9);
  await expect(page.getByRole("link", { name: "All recipes" })).toHaveAttribute(
    "href",
    "/recipes/",
  );
});
