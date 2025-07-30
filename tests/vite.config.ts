import {defineConfig} from 'vitest/config'
import {loadEnv} from 'vite'

const rootDir = __dirname + '/../'

export default defineConfig(({mode}) => ({
    test: {
        name: 'unit+integration',
        root: rootDir,
        include: [
            'tests/unit/**/*.test.ts',
            'tests/integration/**/*.test.ts',
        ],
        // All integration tests work on the same database (not mocked).
        // Therefore, they cannot run in parallel.
        // The following options make sure that the tests run strictly sequential.
        // Using "forks" here, because the default option "threads" always creates parallel tests (even when disabled).
        pool: "forks",
        poolOptions: {
            forks: {
                singleFork: true,
            },
        },
        // giving vitest access to all environment variables, so the tests can for example find the database
        env: loadEnv(mode, rootDir, ''),
        reporters: [
            'default',
            ['junit', {
                outputFile: 'test-reports/unit+integration/report.xml',
                suiteName: 'Unit+Integration Tests',
                classnameTemplate: ''
            }],
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
            reportsDirectory: 'test-reports/unit+integration/coverage',
            reportOnFailure: true,
            thresholds: {
                statements: 98,
                branches: 95,
            }
        }
    },
}))
