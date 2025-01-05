/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
import type {Config} from 'jest'

// Making the variables in the ".env" file available as regular environment variables.
// Only relevant for local development, because the CI/CD pipeline doesn't use ".env" files.
// (Command will not fail when the file doesn't exist.)
require('dotenv').config({path: '.env'})

const config: Config = {
    preset: 'ts-jest',
    testMatch: ['<rootDir>/tests/**/*Test.ts'],
    reporters: [
        "default",
        ["./node_modules/jest-html-reporter", {
            "pageTitle": "Combined Tests - Report",
            "outputPath": "./test-reports/combined/report.html",
        }]
    ],
    collectCoverage: false,
    coverageProvider: "v8",
    coverageDirectory: '<rootDir>/test-reports/code_coverage',
    collectCoverageFrom: ['<rootDir>/src/**'],
    coveragePathIgnorePatterns: [
        '<rootDir>/src/server.ts',
        '<rootDir>/src/types',
    ],
    coverageThreshold: {
        global: {
            statements: 50,
            branches: 50
        }
    }
}

export default config
