import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
  await page.addInitScript(() => {
    localStorage.setItem("theme", "light");
    localStorage.setItem("tansail-preset", "harbor");
  });
  await page.goto("/gallery");
  await page.waitForLoadState("networkidle");
});

test("gallery exposes every block example and appearance controls", async ({ page }) => {
  await expect(
    page.getByRole("heading", { level: 1, name: "TanSail block gallery" }),
  ).toBeVisible();
  await expect(page.getByText("Showing 14 of 14 examples")).toBeVisible();
  await expect(page.getByRole("button", { name: /change design preset/i })).toBeVisible();
  await expect(page.getByRole("button", { name: "Toggle theme" })).toBeVisible();
  await expect(page.locator(".gallery-example")).toHaveCount(14);
});

test("gallery filters categories and changes preview width", async ({ page }) => {
  await page.getByRole("button", { name: "Features", exact: true }).click();
  await expect(page.getByText("Showing 4 of 14 examples")).toBeVisible();
  await expect(page.locator(".gallery-example")).toHaveCount(4);

  await page.getByRole("button", { name: "Mobile preview" }).click();
  await expect(page.locator(".gallery-canvas").first()).toHaveAttribute("data-viewport", "mobile");
  await expect
    .poll(() =>
      page
        .locator(".gallery-preview")
        .first()
        .evaluate((element) => element.clientWidth),
    )
    .toBeLessThanOrEqual(390);
});
