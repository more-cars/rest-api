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
    },
})
