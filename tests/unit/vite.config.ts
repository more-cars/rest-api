import {defineConfig} from 'vitest/config'

const rootDir = __dirname + '/../../'

export default defineConfig({
    test: {
        name: 'unit',
        root: rootDir,
        include: [
            'tests/unit/**/*.test.ts',
        ],
        reporters: [
            'default',
            ['junit', {
                outputFile: 'test-reports/unit/report.xml',
                suiteName: 'Unit Tests',
                classnameTemplate: '',
            }],
        ],
        coverage: {
            provider: 'v8',
            include: ['src/**'],
            exclude: [
                'src/**/types/**',
                'src/routes/**',
                'src/server.ts',
                'src/db/driver-mc1.ts',
            ],
            reporter: [
                'text',
                'html',
            ],
            reportsDirectory: 'test-reports/unit/coverage',
            reportOnFailure: true,
            thresholds: {
                statements: 24,
                branches: 74,
            }
        }
    },
})
