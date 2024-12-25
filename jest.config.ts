/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest'

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: [
        '**/tests/unit/*.ts',
    ],

    collectCoverage: false,
    collectCoverageFrom: [
        '**/src/**',
    ],

    // The directory where Jest should output its coverage files
    coverageDirectory: "test-reports/unit/coverage",

    // Indicates which provider should be used to instrument code for coverage
    coverageProvider: "v8",
}

export default config
