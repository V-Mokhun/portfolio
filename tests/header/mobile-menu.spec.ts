import { expect, test } from "@playwright/test";

// Use chromium browser because firefox doesn't support isMobile option
test.use({
  isMobile: true,
  browserName: "chromium",
  viewport: { width: 640, height: 480 },
});

test.describe("Header Mobile Menu", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("It opens, has correct content and closes", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Home" })).not.toBeInViewport();

    const mobileMenuTrigger = await page.getByTestId("mobile-menu-trigger");
    await mobileMenuTrigger.click();

    await expect(page.getByRole("link", { name: "Home" })).toBeInViewport();

    // Check mobile language picker
    await expect(page.getByRole("button", { name: "en" })).toBeInViewport();
    await page.getByRole("button", { name: "en" }).click();
    await expect(page.getByRole("link", { name: "Polski" })).toBeInViewport();

    await expect(page.getByRole("link", { name: "Resume" })).toBeVisible();

    // Close button
    await expect(page.getByRole("button", { name: "Close" })).toBeInViewport();
    await page.getByRole("button", { name: "Close" }).click();
    await expect(page.getByRole("link", { name: "Home" })).not.toBeInViewport();
    await expect(
      page.getByRole("button", { name: "Close" })
    ).not.toBeInViewport();
  });

  test("Links work", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Home" })).not.toBeInViewport();

    const mobileMenuTrigger = await page.getByTestId("mobile-menu-trigger");
    await mobileMenuTrigger.click();
    await expect(page.getByRole("link", { name: "Home" })).toBeInViewport();

    await page.getByRole("link", { name: "About" }).click();
    await page.waitForLoadState("networkidle");
    await expect(
      page.getByRole("heading", { name: "About Me" })
    ).toBeInViewport();
    await expect(page.getByRole("link", { name: "Home" })).not.toBeInViewport();

    await page.keyboard.press("PageUp");
    await mobileMenuTrigger.click();

    await page.getByRole("link", { name: "Projects" }).click();
    await page.waitForLoadState("networkidle");
    await expect(
      page.getByRole("heading", { name: "Projects" })
    ).toBeInViewport();

    await page.keyboard.press("PageUp");
    await mobileMenuTrigger.click();
    await expect(page.getByRole("link", { name: "Home" })).toBeInViewport();

    await page.getByRole("link", { name: "Home" }).click();
    await page.waitForLoadState("networkidle");
    await expect(
      page.getByRole("heading", { name: "Hi, I'm" })
    ).toBeInViewport();
    await expect(page.getByRole("link", { name: "Home" })).not.toBeInViewport();
  });

  /*
  test("Language picker works", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: "en", exact: true })
    ).not.toBeInViewport();
    const mobileMenuTrigger = await page.getByTestId("mobile-menu-trigger");
    await mobileMenuTrigger.click();

    await expect(
      page.getByRole("button", { name: "en", exact: true })
    ).toBeInViewport();
    await expect(page.getByRole("button", { name: "pl" })).not.toBeInViewport();
    await page.getByRole("button", { name: "en", exact: true }).click();
    await expect(page.getByRole("link", { name: "Polski" })).toBeInViewport();

    // Change to Polish
    await page.getByRole("link", { name: "Polski" }).click();
    await page.waitForURL(/\/pl/);
    await expect(
      page.getByRole("link", { name: "Contact Me" })
    ).not.toBeInViewport();
    await expect(
      page.getByRole("link", { name: "Skontaktuj się" })
    ).toBeInViewport();

    // Change back to English
    await mobileMenuTrigger.click();
    await expect(page.getByRole("button", { name: "pl" })).toBeInViewport();
    await expect(
      page.getByRole("button", { name: "en", exact: true })
    ).not.toBeInViewport();
    await page.getByRole("button", { name: "pl" }).click();

    await page.getByRole("link", { name: "English" }).click();
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL("/");
    await expect(
      page.getByRole("link", { name: "Skontaktuj się" })
    ).not.toBeInViewport();
    await expect(
      page.getByRole("link", { name: "Contact Me" })
    ).toBeInViewport();
  });
  */

  test("Resume link works", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: "Resume" })
    ).not.toBeInViewport();

    const mobileMenuTrigger = await page.getByTestId("mobile-menu-trigger");
    await mobileMenuTrigger.click();
    const newTabPromise = page.waitForEvent("download");

    await expect(page.getByRole("link", { name: "Resume" })).toBeInViewport();
    await page.getByRole("link", { name: "Resume" }).click();
    const newTab = await newTabPromise;
    await newTab.saveAs("/tmp/" + newTab.suggestedFilename());
    await expect(page.getByRole("link", { name: "Resume" })).toBeInViewport();
  });
});
