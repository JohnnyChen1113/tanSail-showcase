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
  await expect(page.getByText("Showing 17 of 17 examples")).toBeVisible();
  await expect(page.getByRole("button", { name: /change design preset/i })).toBeVisible();
  await expect(page.getByRole("button", { name: "Toggle theme" })).toBeVisible();
  await expect(page.locator(".gallery-example")).toHaveCount(17);
});

test("gallery filters categories and changes preview width", async ({ page }) => {
  await page.getByRole("button", { name: "Features", exact: true }).click();
  await expect(page.getByText("Showing 5 of 17 examples")).toBeVisible();
  await expect(page.locator(".gallery-example")).toHaveCount(5);

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

test("catalog filters and demo evidence remain explicit", async ({ page }) => {
  const catalog = page.locator("#use-cases-catalog");
  await catalog.getByRole("button", { name: "Research" }).click();
  await expect(catalog.locator(".use-case-catalog article")).toHaveCount(1);
  await expect(catalog.getByRole("heading", { name: "Lab or research site" })).toBeVisible();

  const testimonials = page.locator("#testimonials-masonry");
  await expect(testimonials).toHaveAttribute("data-evidence", "demo");
  await expect(testimonials.getByText("Template example · fictional feedback")).toHaveCount(7);
});
