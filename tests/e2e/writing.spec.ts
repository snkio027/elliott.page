import { expect, test as base, type Page } from "@playwright/test";
import { writeFile } from "node:fs/promises";

async function layoutEvidence(page: Page) {
  return page.evaluate(() => {
    const viewport = document.documentElement.clientWidth;
    return {
      viewport,
      document: document.documentElement.scrollWidth,
      body: document.body.scrollWidth,
      overflowingElements: Array.from(document.body.querySelectorAll("*"))
        .filter((element) => {
          const rect = element.getBoundingClientRect();
          return rect.left < -1 || rect.right > viewport + 1;
        })
        .slice(0, 20)
        .map((element) => ({
          tag: element.tagName,
          id: element.id,
          className: element.className,
          left: element.getBoundingClientRect().left,
          right: element.getBoundingClientRect().right,
        })),
    };
  });
}

const test = base.extend<{ browserHealth: void }>({
  browserHealth: [
    async ({ page }, use, testInfo) => {
      const errors: object[] = [];
      page.on("console", (message) => {
        if (message.type() === "error") {
          errors.push({
            kind: "console",
            message: message.text(),
            location: message.location(),
          });
        }
      });
      page.on("pageerror", (error) => {
        errors.push({
          kind: "pageerror",
          message: error.message,
          stack: error.stack,
        });
      });
      page.on("requestfailed", (request) => {
        errors.push({
          kind: "requestfailed",
          url: request.url(),
          failure: request.failure(),
        });
      });
      page.on("response", (response) => {
        if (response.status() >= 400) {
          errors.push({
            kind: "http",
            url: response.url(),
            status: response.status(),
          });
        }
      });
      try {
        await use();
        expect(errors, "Browser errors during Writing navigation").toEqual([]);
      } finally {
        if (errors.length > 0 || testInfo.status !== testInfo.expectedStatus) {
          const diagnosticsPath = testInfo.outputPath(
            "browser-diagnostics.json",
          );
          await writeFile(
            diagnosticsPath,
            JSON.stringify(
              {
                url: page.url(),
                viewport: page.viewportSize(),
                errors,
                layout: await layoutEvidence(page).catch((error: Error) => ({
                  unavailable: error.message,
                })),
              },
              null,
              2,
            ),
          );
          await testInfo.attach("browser-diagnostics", {
            path: diagnosticsPath,
            contentType: "application/json",
          });
        }
      }
    },
    { auto: true },
  ],
});

async function expectNoHorizontalOverflow(page: Page) {
  await page.evaluate(() => document.fonts.ready);
  const layout = await layoutEvidence(page);
  expect(layout.document, JSON.stringify(layout)).toBeLessThanOrEqual(
    layout.viewport + 1,
  );
  expect(layout.body, JSON.stringify(layout)).toBeLessThanOrEqual(
    layout.viewport + 1,
  );
}

test("Writing list → published article → list", async ({ page }) => {
  const response = await page.goto("/writing/");
  expect(response?.status()).toBe(200);
  await expect(page).toHaveURL("/writing/");
  await expect(
    page.getByRole("heading", { level: 1, name: "Writing", exact: true }),
  ).toBeVisible();
  await expectNoHorizontalOverflow(page);

  const links = page.getByRole("main").getByRole("list").getByRole("link");
  const articles = await links.evaluateAll((elements) =>
    elements.map((element) => ({
      href: element.getAttribute("href") ?? "",
      title: element.textContent?.trim() ?? "",
    })),
  );
  expect(
    articles.length,
    "Published Writing inventory must not be empty",
  ).toBeGreaterThan(0);
  expect(new Set(articles.map((article) => article.href)).size).toBe(
    articles.length,
  );

  for (const [index, article] of articles.entries()) {
    await test.step(article.href, async () => {
      expect(article.href).toMatch(/^\/writing\/[^/]+\/$/);
      expect(article.title).not.toBe("");
      await expect(links.nth(index)).toHaveAttribute("href", article.href);
      await links.nth(index).click();
      await page.waitForLoadState("load");
      await expect(page).toHaveURL(article.href);
      await expect(
        page.getByRole("article").getByRole("heading", { level: 1 }),
      ).toHaveText(article.title);
      await expect(page.getByRole("article").locator(".prose")).not.toBeEmpty();
      await expectNoHorizontalOverflow(page);

      // The frozen design returns through Primary / Writing, not a new back button.
      await page
        .getByRole("navigation", { name: "Primary" })
        .getByRole("link", { name: "Writing", exact: true })
        .click();
      await page.waitForLoadState("load");
      await expect(page).toHaveURL("/writing/");
      await expect(links).toHaveCount(articles.length);
      await expectNoHorizontalOverflow(page);
    });
  }
});
