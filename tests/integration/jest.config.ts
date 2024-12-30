module.exports = {
    displayName: 'Integration Tests',
    testMatch: ['<rootDir>/**/*Test.ts'],
    preset: 'ts-jest',
    reporters: [
        "default",
        ["../../node_modules/jest-html-reporter", {
            "pageTitle": "Integration Tests - Report",
            "outputPath": "./test-reports/integration/report.html",
        }]
    ],
}
