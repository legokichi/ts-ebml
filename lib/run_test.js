"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
const test_1 = require("@playwright/test");
// fix this when chnage the number of tests
const expected_num_tests = 26;
(0, test_1.test)("tests should pass", async ({ page }) => {
    const response = await page.goto("/test/test.html");
    (0, test_1.expect)(response.status()).toBe(200);
    await page.waitForFunction(() => globalThis.runEnd);
    const runEnd = await page.evaluate(() => globalThis.runEnd);
    (0, test_1.expect)(runEnd.status).toBe("passed");
    (0, test_1.expect)(runEnd.testCounts).toEqual({
        total: expected_num_tests,
        passed: expected_num_tests,
        failed: 0,
        skipped: 0,
        todo: 0
    });
});
let log_on_fail = "";
test_1.test.beforeEach(({ page }) => {
    log_on_fail = "";
    page.on("console", (msg) => {
        // console.log(msg.text());
        log_on_fail += msg.text() + os_1.EOL;
    });
    page.on("pageerror", (err) => {
        log_on_fail += err.message + os_1.EOL;
    });
});
test_1.test.afterEach(({}, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
        console.error(log_on_fail);
    }
});
log_on_fail = "";
test_1.test.beforeEach(({ page }) => {
    log_on_fail = "";
    page.on("console", (msg) => {
        // console.log(msg.text());
        log_on_fail += msg.text() + os_1.EOL;
    });
    page.on("pageerror", (err) => {
        log_on_fail += err.message + os_1.EOL;
    });
});
test_1.test.afterEach(({}, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
        console.error(log_on_fail);
    }
});
