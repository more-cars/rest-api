/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest'

const config: Config = {
    preset: 'ts-jest',
    testMatch: ['<rootDir>/tests/**/*Test.ts'],
    collectCoverage: false,
    coverageProvider: "v8",
    coverageDirectory: '<rootDir>/test-reports/code_coverage',
    collectCoverageFrom: ['<rootDir>/src/**'],
}

export default config
