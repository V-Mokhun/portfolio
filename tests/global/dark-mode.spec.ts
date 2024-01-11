import { expect, test } from "@playwright/test";

test.use({
  colorScheme: "dark",
});

test.describe("Dark Mode", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("User color-scheme preference works", async ({ page }) => {
    await expect(page.locator("html")).toHaveClass(/dark/);
  });

  test("Dark mode toggle works", async ({ page }) => {
    const darkModeToggle = await page.getByTestId("dark-mode-toggle");
    // Dark mode initially on
    await expect(page.locator("html")).toHaveClass(/dark/);

    await darkModeToggle.click();
    await expect(page.locator("html")).not.toHaveClass(/dark/);

    await darkModeToggle.click();
    await expect(page.locator("html")).toHaveClass(/dark/);
  });
});
