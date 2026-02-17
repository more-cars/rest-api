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
        // giving vitest access to all environment variables, so the tests can for example find the database
        env: loadEnv(mode, rootDir, ''),
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
