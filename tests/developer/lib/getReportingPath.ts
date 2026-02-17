import * as path from "node:path"

export function getReportingPath(testRunner: string, override: string | undefined): string {
    if (override && override !== "") {
        return override
    }

    if (testRunner === 'local') {
        return path.resolve(__dirname + '/../../../test-reports/developer')
    }

    return './test-reports/developer'
}
