import { expect, test } from "@playwright/test";

test.describe("Hero Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("Contact me link navigates to contact section", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: "Contact Me" })
    ).toBeInViewport();
    await expect(
      page.getByRole("heading", { name: "Get in Touch" })
    ).not.toBeInViewport();

    await page.getByRole("link", { name: "Contact Me" }).click();
    await page.waitForLoadState("networkidle");
    await expect(
      page.getByRole("heading", { name: "Get in Touch" })
    ).toBeInViewport();
  });
});
