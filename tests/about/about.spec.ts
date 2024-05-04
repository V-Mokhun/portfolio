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
    await page.waitForLoadState("networkidle");

    await expect(
      page.getByRole("heading", { name: "About Me" })
    ).toBeInViewport();
    await expect(
      page.locator("#about").getByText("Volodymyr")
    ).toBeInViewport();
    await expect(
      page
        .locator("#about")
        .getByRole("link", { name: "University of Warmia and Mazury" })
    ).toBeInViewport();
  });

  test("External links work", async ({ page }) => {
    const universityPagePromise = page.waitForEvent("popup");
    await page
      .getByRole("link", { name: "University of Warmia and Mazury" })
      .click();
    const universityPage = await universityPagePromise;
    await expect(universityPage).toHaveURL(/uwm/);
    await universityPage.close();

    const caePagePromise = page.waitForEvent("popup");
    await page
      .getByRole("link", { name: "Cambridge C1 Advanced Certificate" })
      .click();
    const caePage = await caePagePromise;
    await expect(caePage).toHaveURL(/cambridgeenglish/);
    await caePage.close();
  });
});
