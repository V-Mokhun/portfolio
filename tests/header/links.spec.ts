import { test, expect } from "@playwright/test";

test.describe("Header Links navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Main navigation links take to corresponding sections", async ({
    page,
  }) => {
    await page.getByRole("link", { name: "About" }).click();
    await expect(
      page.getByRole("heading", { name: "About Me" })
    ).toBeInViewport();

    await page.getByRole("link", { name: "Technologies" }).click();
    await expect(
      page.getByRole("heading", { name: "Technologies", exact: true })
    ).toBeInViewport();

    await page.getByRole("link", { name: "Projects" }).click();
    await expect(
      page.getByRole("heading", { name: "Projects" })
    ).toBeInViewport();

    await page.getByRole("link", { name: "Home" }).click();
    await expect(
      page.getByRole("button", { name: "Hey, I'm Volodymyr," })
    ).toBeInViewport();
  });

  test("Contact link takes to contact section", async ({ page }) => {
    await page.getByRole("link", { name: "Contact" }).click();
    await expect(
      page.getByRole("heading", { name: "Get in Touch" })
    ).toBeInViewport();
  });
});
