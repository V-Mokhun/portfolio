import { expect, test } from "@playwright/test";

test.describe("Hero Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("Hire me link navigates to contact section", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Hire Me" })).toBeInViewport();
    await expect(
      page.getByRole("heading", { name: "Get in Touch" })
    ).not.toBeInViewport();

    await page.getByRole("link", { name: "Hire Me" }).click();
    await expect(
      page.getByRole("heading", { name: "Get in Touch" })
    ).toBeInViewport();
  });

  test("Hovering over on name shows correct tooltip", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: "Hey, I'm Volodymyr," })
    ).toBeInViewport();
    await expect(page.getByTestId("hero-tooltip")).not.toBeVisible();

    await page.getByRole("button", { name: "Hey, I'm Volodymyr," }).hover();
    await page.waitForSelector("[data-testid='hero-tooltip']");
    await expect(page.getByTestId("hero-tooltip")).toBeVisible();
    await expect(page.getByTestId("hero-tooltip")).toHaveText(/Vova/);
    await page.getByRole("link", { name: "Home" }).click();
    await expect(page.getByTestId("hero-tooltip")).not.toBeVisible();
  });

  test("See My Portfolio link navigates to projects section", async ({
    page,
  }) => {
    await expect(
      page.getByRole("link", { name: "See My Portfolio" })
    ).toBeInViewport();
    await expect(
      page.getByRole("heading", { name: "Projects" })
    ).not.toBeInViewport();

    await page.getByRole("link", { name: "See My Portfolio" }).click();
    await expect(
      page.getByRole("heading", { name: "Projects" })
    ).toBeInViewport();
  });
});
