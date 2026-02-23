import {defineConfig} from 'vitest/config'
import {loadEnv} from 'vite'

const rootDir = __dirname + '/../../'

export default defineConfig(({mode}) => ({
    test: {
        name: 'developer',
        root: rootDir,
        include: [
            'tests/unit/**/*.test.ts',
            'tests/integration/**/*.test.ts',
        ],
        // Whenever an integration tests needs a running API to test against, it will create one on the fly.
        // For those API instances to be able to access the database they need to know its location and the credentials.
        // For all Kubernetes deployments this information is provided via environment variables.
        // In the local development environment this information is provided via the .env file.
        // The following line allows vitest to read all variables that are DB-related (but nothing else).
        env: loadEnv(mode, rootDir, 'DB_'),
        silent: true,
        reporters: [
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
                '*.cypher',
            ],
            reporter: [
                'html',
            ],
            reportsDirectory: 'test-reports/developer/coverage',
            reportOnFailure: true,
            thresholds: {
                statements: 98,
                branches: 97,
            }
        }
    },
}))
