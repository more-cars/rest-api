import {defineConfig} from 'vitest/config'
import {loadEnv} from 'vite'

const rootDir = __dirname + '/../'

export default defineConfig(({mode}) => ({
    test: {
        name: 'developer',
        root: rootDir,
        include: [
            'tests/unit/**/*.test.ts',
            'tests/integration/**/*.test.ts',
        ],
        // giving vitest access to all environment variables, so the tests can for example find the database
        env: loadEnv(mode, rootDir, ''),
        reporters: [
            'default',
            ['junit', {
                outputFile: 'test-reports/developer/report.xml',
                suiteName: 'Developer Tests',
                classnameTemplate: ''
            }],
        ],
        coverage: {
            provider: 'v8',
            include: ['src/**'],
            exclude: [
                'src/server.ts',
                'src/db/driver-mc1.ts',
            ],
            reporter: [
                'text',
                'html',
            ],
            reportsDirectory: 'test-reports/developer/coverage',
            reportOnFailure: true,
            thresholds: {
                statements: 98,
                branches: 96,
            }
        }
    },
    // The integration tests work on the same database (only partially mocked).
    // Therefore, they cannot run in parallel.
    // The following options make sure that the tests run strictly sequential.
    pool: 'forks',
    isolate: true,
    maxWorkers: 1,
    maxConcurrency: 1,
    fileParallelism: false,
}))
