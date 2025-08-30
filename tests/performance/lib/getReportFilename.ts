export function getReportFilename(override: string | undefined) {
    if (override && override !== "") {
        return override
    }

    return 'report.html'
}
