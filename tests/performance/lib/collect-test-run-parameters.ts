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
    const targetEnvironment = await getTargetEnvironment()

    return assembleEnvFileData({
        targetEnvironment,
        apiUrl: getApiUrl(targetEnvironment) || '',
        scenario: await getTestScenario(),
        enableDashboard: await isDashboardEnabled(),
        dashboardExportPath: getDashboardExportPath(),
        autoOpenDashboardInBrowser: await isDashboardOpenedInBrowser(),
        dashboardRefreshRate: getDashboardRefreshRate(),
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
