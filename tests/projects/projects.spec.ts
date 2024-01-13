import { expect, test } from "@playwright/test";

test.describe("Technologies Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await expect(
      page.getByRole("heading", { name: "Projects", exact: true })
    ).not.toBeInViewport();
    await page.getByRole("link", { name: "Projects" }).click();

    await expect(
      page.getByRole("heading", { name: "Projects", exact: true })
    ).toBeInViewport();
  });

  test("Project image redirects to live demo", async ({ page }) => {
    const projectPagePromise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "TechSphere" }).first().click();
    const projectPage = await projectPagePromise;
    await expect(projectPage).toHaveURL(/ecommerce/);
    await projectPage.close();
  });

  test("Live Demo link works", async ({ page }) => {
    const projectPagePromise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "Live Demo" }).first().click();
    const projectPage = await projectPagePromise;
    await expect(projectPage).toHaveURL(/ecommerce/);
    await projectPage.close();
  });

  test("Source Code link works", async ({ page }) => {
    const projectPagePromise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "Source Code" }).first().click();
    const projectPage = await projectPagePromise;
    await expect(projectPage).toHaveURL(/github.com/);
    await projectPage.close();
  });
});
