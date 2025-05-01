import * as path from "node:path"

// Making the variables in the ".env" file available as regular environment variables.
// Only relevant for local development, because the CI/CD pipeline doesn't use ".env" files.
// (Command will not fail when the file doesn't exist.)
require('dotenv').config({path: path.resolve(__dirname, '../../.env')})

module.exports = {
    displayName: 'Integration Tests',
    testMatch: ['<rootDir>/**/*Test.ts'],
    maxConcurrency: 1,
    maxWorkers: 1,
    forceExit: true,
    preset: 'ts-jest',
    reporters: [
        "default",
        ["../../node_modules/jest-html-reporter", {
            "pageTitle": "Integration Tests - Report",
            "outputPath": "./test-reports/integration/report.html",
        }]
    ],
}
