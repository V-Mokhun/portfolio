import { expect, test } from "@playwright/test";

test.describe("About Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("Personal information is visible", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "About Me" })
    ).not.toBeInViewport();
    await page.getByRole("link", { name: "About" }).click();

    await expect(
      page.getByRole("heading", { name: "About Me" })
    ).toBeInViewport();
    await expect(
      page.locator("#about").getByText("Volodymyr Mokhun")
    ).toBeInViewport();
    await expect(
      page.locator("#about").getByRole("link", { name: "v.mokhun@gmail.com" })
    ).toBeInViewport();
    await expect(page.locator("#about").getByText("18")).toBeInViewport();
    await expect(page.locator("#about").getByText("Olsztyn")).toBeInViewport();
  });

});
