import {loadEnv} from 'vite'
import {defineConfig} from 'vitest/config'

const rootDir = __dirname + '/../../'

export default defineConfig(({mode}) => ({
    test: {
        name: 'sync-scripts',
        root: rootDir,
        include: [
            'tests/sync-scripts/**/*.test.ts',
        ],
        // giving vitest access to all environment variables, so the tests can for example find the API
        env: loadEnv(mode, rootDir, ''),
        reporters: [
            'default',
        ],
        testTimeout: 15000
    },
}))
