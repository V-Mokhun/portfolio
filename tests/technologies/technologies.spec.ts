import { expect, test } from "@playwright/test";

test.describe("Technologies Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("Resume link works", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Technologies", exact: true })
    ).not.toBeInViewport();
    await page.getByRole("link", { name: "Technologies" }).click();

    await expect(
      page.getByRole("heading", { name: "Technologies", exact: true })
    ).toBeInViewport();

    const resumePagePromise = page.waitForEvent("download");
    await page.getByRole("link", { name: "See Resume" }).click();
    const resumePage = await resumePagePromise;
    await resumePage.saveAs("/tmp/" + resumePage.suggestedFilename());
    await expect(
      page.getByRole("heading", { name: "Technologies", exact: true })
    ).toBeInViewport();
  });
});
