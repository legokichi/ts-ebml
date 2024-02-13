module.exports = {
    testDir: 'lib',
    testMatch: 'run_test.js',
    webServer: {
        command: 'npx http-server',
        port: 8080,
        reuseExistingServer: false
    },
    timeout: 1 * 60 * 1000,
};
