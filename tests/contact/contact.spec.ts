import { Page, expect, test } from "@playwright/test";

async function fillForm(page: Page) {
  await page.getByPlaceholder("Enter your name").click();
  await page.getByPlaceholder("Enter your name").fill("Volodymyr");
  await page.getByPlaceholder("Enter your email").click();
  await page.getByPlaceholder("Enter your email").fill("email@gmail.com");
  await page.getByPlaceholder("Enter your message").click();
  await page.getByPlaceholder("Enter your message").fill("Hello friend");
}

test.describe("Contact Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await expect(
      page.getByRole("heading", { name: "Get in Touch", exact: true })
    ).not.toBeInViewport();
    await page.getByRole("link", { name: "Contact" }).click();

    await expect(
      page.getByRole("heading", { name: "Get in Touch", exact: true })
    ).toBeInViewport();
  });

  test("Shows form errors", async ({ page }) => {
    await expect(page.getByTestId("contact-name-error")).not.toBeVisible();
    await expect(page.getByTestId("contact-email-error")).not.toBeVisible();
    await expect(page.getByTestId("contact-message-error")).not.toBeVisible();
    await page.getByRole("button", { name: "Send Message" }).click();

    await expect(page.getByTestId("contact-name-error")).toBeVisible();
    await expect(page.getByTestId("contact-email-error")).toBeVisible();
    await expect(page.getByTestId("contact-message-error")).toBeVisible();

    await page.getByPlaceholder("Enter your name").click();
    await page.getByPlaceholder("Enter your name").fill("Volodymyr");
    await page.getByPlaceholder("Enter your message").click();
    await page.getByPlaceholder("Enter your message").fill("Hello friend");
    await page.getByRole("button", { name: "Send Message" }).click();

    await expect(page.getByTestId("contact-name-error")).not.toBeVisible();
    await expect(page.getByTestId("contact-email-error")).toBeVisible();
    await expect(page.getByTestId("contact-message-error")).not.toBeVisible();

    await page.getByPlaceholder("Enter your email").fill("invalidemail");
    await page.getByRole("button", { name: "Send Message" }).click();
    await expect(page.getByTestId("contact-email-error")).toBeVisible();
  });

  test("Sends a message and shows a success toast", async ({ page }) => {
    await page.route("*/**/api/send-email", async (route) => {
      const json = { message: "Success!", success: true };
      await route.fulfill({ json });
    });
    await expect(
      page.getByText("Your message has been sent successfully!", {
        exact: true,
      })
    ).not.toBeVisible();

    await fillForm(page);
    await page.getByRole("button", { name: "Send Message" }).click();

    await expect(
      page.getByText("Your message has been sent successfully!", {
        exact: true,
      })
    ).toBeVisible();
  });

  test("Shows an error toast if the request fails", async ({ page }) => {
    await page.route("*/**/api/send-email", async (route) => {
      const json = { message: "Something went wrong", success: false };
      await route.fulfill({ json });
    });
    await expect(
      page.getByText("Something went wrong", { exact: true })
    ).not.toBeVisible();

    await fillForm(page);
    await page.getByRole("button", { name: "Send Message" }).click();

    await expect(
      page.getByText("Something went wrong", { exact: true })
    ).toBeVisible();
  });
});
