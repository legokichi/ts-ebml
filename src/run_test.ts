import { EOL } from "os";
import { test, expect } from "@playwright/test";

// fix this when chnage the number of tests
const expected_num_tests = 26;

test("tests should pass", async ({ page }) => {
  const response = await page.goto("/test/test.html");
  expect(response!.status()).toBe(200);
  await page.waitForFunction((): any => (globalThis as any).runEnd);
  const runEnd: any = await page.evaluate(
    (): any => (globalThis as any).runEnd
  );
  expect(runEnd.status).toBe("passed");
  expect(runEnd.testCounts).toEqual({
    total: expected_num_tests,
    passed: expected_num_tests,
    failed: 0,
    skipped: 0,
    todo: 0
  });
});

let log_on_fail = "";

test.beforeEach(({ page }) => {
  log_on_fail = "";
  page.on("console", (msg) => {
    // console.log(msg.text());
    log_on_fail += msg.text() + EOL;
  });
  page.on("pageerror", (err) => {
    log_on_fail += err.message + EOL;
  });
});

test.afterEach(({}, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    console.error(log_on_fail);
  }
});

log_on_fail = "";

test.beforeEach(({ page }) => {
  log_on_fail = "";
  page.on("console", (msg) => {
    // console.log(msg.text());
    log_on_fail += msg.text() + EOL;
  });
  page.on("pageerror", (err) => {
    log_on_fail += err.message + EOL;
  });
});

test.afterEach(({}, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    console.error(log_on_fail);
  }
});
