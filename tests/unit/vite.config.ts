import {defineConfig} from 'vitest/config'

export default defineConfig({
    test: {
        name: 'unit',
        include: [
            '**/unit/**/*.test.ts',
        ],
        reporters: [
            'default',
            ['junit', {outputFile: 'test-reports/unit/report.xml', suiteName: 'Unit Tests', classnameTemplate: ''}],
        ],
        coverage: {
            provider: 'v8',
            include: ['src/**'],
            exclude: [
                'src/**/types/**',
                'src/server.ts',
                'src/db/driver-mc1.ts',
            ],
            reporter: [
                'text',
                'html',
            ],
            reportsDirectory: 'test-reports/unit/coverage',
            thresholds: {
                statements: 33,
                branches: 79,
            }
        }
    },
})
