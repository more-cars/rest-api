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
                'src/*.ts',
                'src/**/types/**',
                'src/routes/**',
                'src/controllers/*.ts',
                'src/controllers/*/*Relation',
                'src/db/driver-mc1.ts',
            ],
            reporter: [
                'text',
                'html',
            ],
            reportsDirectory: 'test-reports/unit/coverage',
            reportOnFailure: true,
            thresholds: {
                statements: 23,
                branches: 75,
            }
        }
    },
})
