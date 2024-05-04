import { expect, test } from "@playwright/test";

const GITHUB_URL = "https://github.com/V-Mokhun";
const LINKEDIN_URL = "https://www.linkedin.com/in/v-mokhun";
const TWITTER_URL = "https://twitter.com/v_mokhun";

test.describe("Footer", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("Copyright is visible", async ({ page }) => {
    await expect(
      page.locator("footer").getByText("Volodymyr Mokhun")
    ).toBeVisible();
  });

  test("Social links don't show up on desktop", async ({ page }) => {
    await expect(page.locator("footer").getByLabel("GitHub")).not.toBeVisible();
    await expect(
      page.locator("footer").getByLabel("LinkedIn")
    ).not.toBeVisible();
    await expect(
      page.locator("footer").getByLabel("Twitter (X)")
    ).not.toBeVisible();
  });
});

test.describe("Mobile Footer", () => {
  test.use({
    viewport: { width: 640, height: 480 },
  });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("Social links work", async ({ page }) => {
    const githubPagePromise = page.waitForEvent("popup");
    await page.locator("footer").getByLabel("GitHub").click();
    const githubPage = await githubPagePromise;
    await expect(githubPage).toHaveURL(GITHUB_URL);
    await githubPage.close();

    const linkedinPagePromise = page.waitForEvent("popup");
    await page.locator("footer").getByLabel("LinkedIn").click();
    const linkedinPage = await linkedinPagePromise;
    await expect(linkedinPage).toHaveURL(LINKEDIN_URL);
    await linkedinPage.close();

    const twitterPagePromise = page.waitForEvent("popup");
    await page.locator("footer").getByLabel("Twitter (X)").click();
    const twitterPage = await twitterPagePromise;
    await expect(twitterPage).toHaveURL(TWITTER_URL);
    await twitterPage.close();
  });
});
