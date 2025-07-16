// Making the variables in the ".env" file available as regular environment variables.
// Only relevant for local development, because the CI/CD pipeline doesn't use ".env" files.
// (Command will not fail when the file doesn't exist.)
require('dotenv').config()

module.exports = {
    displayName: 'Unit + Integration Tests',
    preset: 'ts-jest',
    testMatch: [
        '<rootDir>/tests/unit/**/*.test.ts',
        '<rootDir>/tests/integration/**/*.test.ts'
    ],
    maxConcurrency: 1,
    maxWorkers: 1,
    forceExit: true,
    reporters: [
        "default",
        ["<rootDir>/node_modules/jest-html-reporter", {
            "pageTitle": "Unit + Integration Tests - Report",
            "outputPath": "./test-reports/unit+integration/report.html",
        }]
    ],
    collectCoverage: false,
    coverageProvider: "v8",
    coverageDirectory: '<rootDir>/test-reports/unit+integration/code-coverage',
    collectCoverageFrom: [
        '<rootDir>/src/**/*.ts',
        '!<rootDir>/src/server.ts',
        '!<rootDir>/src/**/types/**',
        '!<rootDir>/src/db/driver-mc1.ts',
    ],
    coverageThreshold: {
        global: {
            statements: 80,
            branches: 62
        }
    }
}
