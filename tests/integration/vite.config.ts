import {loadEnv} from 'vite'
import {defineConfig} from 'vitest/config'

const rootDir = __dirname + '/../../'

export default defineConfig(({mode}) => ({
    test: {
        name: 'integration',
        root: rootDir,
        include: [
            'tests/integration/**/*.test.ts',
        ],
        // Whenever an integration tests needs a running API to test against, it will create one on the fly.
        // For those API instances to be able to access the database they need to know its location and the credentials.
        // For all Kubernetes deployments this information is provided via environment variables.
        // In the local development environment this information is provided via the .env file.
        // The following line allows vitest to read all variables that are DB-related (but nothing else).
        env: loadEnv(mode, rootDir, 'DB_'),
        reporters: [
            'default',
            ['junit', {
                outputFile: 'test-reports/integration/report.xml',
                suiteName: 'Integration Tests',
                classnameTemplate: '',
            }],
        ],
    },
}))
