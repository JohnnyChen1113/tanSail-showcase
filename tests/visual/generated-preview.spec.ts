import { expect, test } from "@playwright/test";

test("generated brief renders a guarded site preview", async ({ page }) => {
  await page.goto("/generated-preview");

  await expect(page.getByRole("heading", { level: 1, name: "Northstar" })).toBeVisible();
  await expect(page.getByText("Generated fixture")).toBeVisible();
  await expect(page.getByText("Before deployment", { exact: true })).toBeVisible();
  await expect(page.locator("main section")).toHaveCount(9);
  await expect(page.locator("html")).toHaveAttribute("data-preset", "horizon");
});
