import { test, expect } from '@playwright/test';

const expected_num_tests = 17;

test('tests should pass', async ({ page }) => {
    const response = await page.goto('/test/test.html');
    expect(response.status()).toBe(200);
    await page.waitForFunction(() => globalThis.runEnd);
    const runEnd = await page.evaluate(() => globalThis.runEnd);
    expect(runEnd.status).toBe('passed');
    expect(runEnd.testCounts).toEqual({
        total: expected_num_tests,
        passed: expected_num_tests,
        failed: 0,
        skipped: 0,
        todo: 0
    });
});
