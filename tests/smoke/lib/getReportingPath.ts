export function getReportingPath(override: string | undefined): string {
    let path = __dirname + '/../../../test-reports/smoke/smoke'

    if (override && override !== "") {
        path = override
    }

    return path
}
