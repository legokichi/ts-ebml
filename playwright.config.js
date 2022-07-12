module.exports = {
    testDir: 'test',
    testMatch: 'run_test.mjs',
    webServer: {
        command: 'npx http-server',
        port: 8080,
        reuseExistingServer: false
    }
};
