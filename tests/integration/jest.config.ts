module.exports = {
    displayName: 'Integration Tests',
    testMatch: ['<rootDir>/**/*.test.ts'],
    maxConcurrency: 1,
    maxWorkers: 1,
    forceExit: true,
    preset: 'ts-jest',
    setupFiles: [
        'dotenv/config',
    ],
    reporters: [
        "default",
        ["../../node_modules/jest-html-reporter", {
            "pageTitle": "Integration Tests - Report",
            "outputPath": "./test-reports/integration/report.html",
        }]
    ],
}
