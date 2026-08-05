import { expect, test } from "@playwright/test";

test("generated brief renders a guarded site preview", async ({ page }) => {
  await page.goto("/generated-preview");

  await expect(page.getByRole("heading", { level: 1, name: "TanSail Ledger" })).toBeVisible();
  await expect(page.getByText("Generated fixture")).toBeVisible();
  await expect(page.getByText("Before deployment", { exact: true })).toHaveCount(0);
  await expect(page.locator("main section")).toHaveCount(7);
  await expect(page.locator("html")).toHaveAttribute("data-preset", "ledger");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );

  const visualContract = await page
    .locator("main section")
    .first()
    .evaluate((element) => {
      const styles = getComputedStyle(element);
      return {
        borderWidth: styles.borderBottomWidth,
        fontFamily: styles.fontFamily,
      };
    });

  expect(visualContract.borderWidth).toBe("2px");
  expect(visualContract.fontFamily).toContain("SFMono-Regular");
});
