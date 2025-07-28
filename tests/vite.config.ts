import {defineConfig} from 'vitest/config'
import {loadEnv} from 'vite'

export default defineConfig({
    test: {
        name: 'unit+integration',
        include: [
            '**/unit/**/*.test.ts',
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
            reportsDirectory: 'test-reports/unit+integration',
            thresholds: {
                statements: 77,
                branches: 90,
            }
        }
    },
})
