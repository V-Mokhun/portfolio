import { expect, test } from "@playwright/test";

const GITHUB_URL = "https://github.com/V-Mokhun";
const LINKEDIN_URL = "https://www.linkedin.com/in/v-mokhun";
const FACEBOOK_URL = "https://www.facebook.com/volodymyr.mokhun";

test.describe("Footer", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("Social links work", async ({ page }) => {
    const githubPagePromise = page.waitForEvent("popup");
    await page.getByLabel("GitHub").click();
    const githubPage = await githubPagePromise;
    await expect(githubPage).toHaveURL(GITHUB_URL);
    await githubPage.close();

    const linkedinPagePromise = page.waitForEvent("popup");
    await page.getByLabel("LinkedIn").click();
    const linkedinPage = await linkedinPagePromise;
    await expect(linkedinPage).toHaveURL(LINKEDIN_URL);
    await linkedinPage.close();

    const facebookPagePromise = page.waitForEvent("popup");
    await page.getByLabel("Facebook").click();
    const facebookPage = await facebookPagePromise;
    await expect(facebookPage).toHaveURL(FACEBOOK_URL);
    await facebookPage.close();
  });
});
