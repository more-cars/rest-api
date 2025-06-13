import path from "node:path"

module.exports = {
    displayName: 'Unit Tests',
    preset: 'ts-jest',
    rootDir: path.resolve(__dirname, '../../'),
    testMatch: ['<rootDir>/tests/unit/**/*.test.ts'],
    reporters: [
        "default",
        ["<rootDir>/node_modules/jest-html-reporter", {
            "pageTitle": "Unit Tests - Report",
            "outputPath": "./test-reports/unit/report.html",
        }]
    ],
}
