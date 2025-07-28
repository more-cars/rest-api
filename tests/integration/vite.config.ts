import {loadEnv} from 'vite'
import {defineConfig} from 'vitest/config'

export default defineConfig({
    test: {
        name: 'integration',
        include: [
            '**/integration/**/*.test.ts',
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
        env: loadEnv('', process.cwd(), ''),
        reporters: [
            'default',
            ['junit', {
                outputFile: 'test-reports/integration/report.xml',
                suiteName: 'Integration Tests',
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
            reportsDirectory: 'test-reports/integration/coverage',
            thresholds: {
                statements: 65,
                branches: 92,
            },
        }
    },
})
