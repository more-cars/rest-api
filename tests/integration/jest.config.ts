import * as path from "node:path"

// Making the variables in the ".env" file available as regular environment variables.
// Only relevant for local development, because the CI/CD pipeline doesn't use ".env" files.
// (Command will not fail when the file doesn't exist.)
require('dotenv').config({path: path.resolve(__dirname, '../../.env')})

module.exports = {
    displayName: 'Integration Tests',
    preset: 'ts-jest',
    rootDir: path.resolve(__dirname, '../../'),
    testMatch: ['<rootDir>/tests/integration/**/*.test.ts'],
    maxConcurrency: 1,
    maxWorkers: 1,
    reporters: [
        "default",
        ["<rootDir>/node_modules/jest-html-reporter", {
            "pageTitle": "Integration Tests - Report",
            "outputPath": "./test-reports/integration/report.html",
        }]
    ],
    collectCoverage: false,
    coverageProvider: "v8",
    coverageDirectory: '<rootDir>/test-reports/integration/code-coverage',
    collectCoverageFrom: [
        '<rootDir>/src/**/*.ts',
        '!<rootDir>/src/server.ts',
        '!<rootDir>/src/**/types/**',
    ],
    coverageThreshold: {
        global: {
            statements: 69,
            branches: 71
        }
    }
}
