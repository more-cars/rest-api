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
    collectCoverage: false,
    coverageProvider: "v8",
    coverageDirectory: '<rootDir>/test-reports/unit/code-coverage',
    collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
    coveragePathIgnorePatterns: [
        '<rootDir>/src/server.ts',
        '<rootDir>/src/types',
    ],
    coverageThreshold: {
        global: {
            statements: 33,
            branches: 33
        }
    }
}
