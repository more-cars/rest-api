module.exports = {
    displayName: 'Unit Tests',
    testMatch: ['<rootDir>/**/*Test.ts'],
    preset: 'ts-jest',
    reporters: [
        "default",
        ["../../node_modules/jest-html-reporter", {
            "pageTitle": "Unit Tests - Report",
            "outputPath": "./test-reports/unit/report.html",
        }]
    ],
}
