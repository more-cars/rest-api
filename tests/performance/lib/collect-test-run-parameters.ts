import fs from "node:fs"
import {getTargetEnvironment} from "./getTargetEnvironment"
import {getApiUrl} from "./getApiUrl"
import {getTestScenario} from "./getTestScenario"
import {isDashboardEnabled} from "./isDashboardEnabled"
import {getDashboardExportPath} from "./getDashboardExportPath"
import {isDashboardOpenedInBrowser} from "./isDashboardOpenedInBrowser"
import {getDashboardRefreshRate} from "./getDashboardRefreshRate"

const filename = process.argv[2]

collectParams()
    .then((data) => {
        fs.writeFileSync(__dirname + '/../' + filename, data)
    })

async function collectParams() {
    const targetEnvironment = process.env.TARGET_ENVIRONMENT || await getTargetEnvironment()

    return assembleEnvFileData({
        targetEnvironment,
        apiUrl: process.env.API_URL || getApiUrl(targetEnvironment) || '',
        scenario: process.env.SCENARIO || await getTestScenario(),
        enableDashboard: process.env.K6_WEB_DASHBOARD === "true" || process.env.K6_WEB_DASHBOARD === "false" || await isDashboardEnabled(),
        dashboardExportPath: process.env.K6_WEB_DASHBOARD_EXPORT || getDashboardExportPath(),
        autoOpenDashboardInBrowser: process.env.K6_WEB_DASHBOARD_OPEN === "true" || process.env.K6_WEB_DASHBOARD_OPEN === "false" || await isDashboardOpenedInBrowser(),
        dashboardRefreshRate: process.env.K6_WEB_DASHBOARD_PERIOD || getDashboardRefreshRate(),
    })
}

function assembleEnvFileData(params: PerformanceTestData) {
    const data = `
export TARGET_ENVIRONMENT=${params.targetEnvironment}
export API_URL=${params.apiUrl}
export SCENARIO=${params.scenario}
export K6_WEB_DASHBOARD=${params.enableDashboard}
export K6_WEB_DASHBOARD_EXPORT=${params.dashboardExportPath}
export K6_WEB_DASHBOARD_OPEN=${params.autoOpenDashboardInBrowser}
export K6_WEB_DASHBOARD_PERIOD=${params.dashboardRefreshRate}
`

    return data
}

type PerformanceTestData = {
    targetEnvironment: string
    apiUrl: string
    scenario: string
    enableDashboard: boolean
    dashboardExportPath: string
    autoOpenDashboardInBrowser: boolean
    dashboardRefreshRate: string
}
