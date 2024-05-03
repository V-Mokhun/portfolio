import { expect, test } from "@playwright/test";

test.describe("Language picker", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("Language picker works", async ({ page }) => {
    const languagePicker = await page.getByTestId("lang-picker-trigger");
    // Initially English
    await expect(page.getByRole("link", { name: "Contact" })).toBeInViewport();

    // Change to Polish
    await languagePicker.click();
    await page.getByRole("link", { name: "Polski" }).click();

    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/\/pl/);
    await expect(
      page.getByRole("link", { name: "See My Portfolio" })
    ).not.toBeInViewport();
    await expect(
      page.getByRole("link", { name: "Zobacz portfolio" })
    ).toBeInViewport();

    // Change to Ukrainian
    await languagePicker.click();
    await page.getByRole("link", { name: "Українська" }).click();

    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/\/ua/);
    await expect(
      page.getByRole("link", { name: "See My Portfolio" })
    ).not.toBeInViewport();
    await expect(
      page.getByRole("link", { name: "Переглянути портфоліо" })
    ).toBeInViewport();

    // Change back to English
    await languagePicker.click();
    await page.getByRole("link", { name: "English" }).click();

    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL("/");
    await expect(
      page.getByRole("link", { name: "See My Portfolio" })
    ).toBeInViewport();
  });
});
