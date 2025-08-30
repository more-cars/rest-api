export function getReportPath(override: string | undefined) {
    if (override && override !== "") {
        return override
    }

    return __dirname + '/../../../test-reports/performance'
}
