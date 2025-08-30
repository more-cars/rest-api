export function getReportingPath(envVarOverride: string | undefined): string {
    let path = __dirname + '/../../../test-reports/smoke/smoke'

    if (envVarOverride && envVarOverride !== "") {
        path = envVarOverride
    }

    return path
}
