import { expect, test } from "@playwright/test";

test.describe("Skills Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("Skills show up", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Skills", exact: true })
    ).not.toBeInViewport();
    await expect(
      page.getByRole("heading", { name: "React.js" })
    ).not.toBeInViewport();
    await expect(page.getByRole("heading", { name: "Git" })).not.toBeInViewport();

    await page.getByRole("link", { name: "Skills" }).click();
    await page.waitForLoadState("domcontentloaded");

    await expect(page.getByRole("heading", { name: "React.js" })).toBeInViewport();
    await expect(page.getByRole("heading", { name: "Git" })).toBeInViewport();
  });
});
