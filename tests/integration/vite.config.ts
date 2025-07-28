import {loadEnv} from 'vite'
import {defineConfig} from 'vitest/config'

export default defineConfig({
    test: {
        name: 'integration',
        include: [
            './**/*.test.ts',
        ],
        // All integration tests work on the same database (not mocked).
        // Therefore, they cannot run in parallel.
        // The following three options make sure that the tests run strictly sequential.
        fileParallelism: false,
        // Using "forks" here, because the default option "threads" always creates parallel tests (even when disabled).
        pool: "forks",
        poolOptions: {
            forks: {
                singleFork: true,
            },
        },
        // giving vitest access to all environment variables, so the tests can for example find the database
        env: loadEnv('', process.cwd(), ''),
    },
})
