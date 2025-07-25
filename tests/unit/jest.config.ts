import path from "node:path"

module.exports = {
    displayName: 'Unit Tests',
    preset: 'ts-jest',
    rootDir: path.resolve(__dirname, '../../'),
    testMatch: ['<rootDir>/tests/unit/**/*.test.ts'],
    reporters: [
        "default",
        ['jest-junit', {
            outputDirectory: 'test-reports/unit',
            outputName: 'report.xml',
            suiteName: 'Unit Tests',
            suiteNameTemplate: '{filepath}',
            classNameTemplate: '',
        }],
        ["<rootDir>/node_modules/jest-html-reporter", {
            "pageTitle": "Unit Tests - Report",
            "outputPath": "./test-reports/unit/report.html",
        }]
    ],
    collectCoverage: false,
    coverageProvider: "v8",
    coverageDirectory: '<rootDir>/test-reports/unit/code-coverage',
    collectCoverageFrom: [
        '<rootDir>/src/**/*.ts',
        '!<rootDir>/src/server.ts',
        '!<rootDir>/src/**/types/**',
        '!<rootDir>/src/db/driver-mc1.ts',
    ],
    coverageThreshold: {
        global: {
            statements: 40,
            branches: 53
        }
    }
}
