import fs from "node:fs"
import {getTestRunner} from "../../smoke/lib/getTestRunner"
import {getTargetCluster} from "./getTargetCluster"
import {getTargetEnvironment} from "./getTargetEnvironment"
import {getApiUrl} from "./getApiUrl"
import {getTestScenario} from "./getTestScenario"
import {isReportEnabled} from "./isReportEnabled"
import {getReportingPath} from "./getReportingPath"
import {getReportFilename} from "./getReportFilename"
import {isDashboardOpenedInBrowser} from "./isDashboardOpenedInBrowser"
import {getDashboardRefreshRate} from "./getDashboardRefreshRate"

collectParams()
    .then((data) => {
        const filename = process.argv[2]
        fs.writeFileSync(__dirname + '/../' + filename, data)
    })

async function collectParams() {
    const testRunner = await getTestRunner(process.env.TEST_RUNNER)
    const targetCluster = await getTargetCluster(testRunner, process.env.TARGET_CLUSTER)
    const targetEnvironment = await getTargetEnvironment(targetCluster, process.env.TARGET_ENVIRONMENT)
    const apiUrl = getApiUrl(testRunner, targetCluster, targetEnvironment, process.env.API_URL)
    const scenario = await getTestScenario(process.env.SCENARIO)
    const enableReport = await isReportEnabled(process.env.K6_WEB_DASHBOARD)
    const reportPath = getReportingPath(testRunner, process.env.REPORT_PATH)
    const reportFilename = getReportFilename(process.env.REPORT_FILENAME)
    const dashboardExportPath = reportPath + '/' + reportFilename
    const autoOpenDashboardInBrowser = await isDashboardOpenedInBrowser(testRunner, process.env.K6_WEB_DASHBOARD_OPEN)
    const dashboardRefreshRate = getDashboardRefreshRate(process.env.K6_WEB_DASHBOARD_PERIOD)

    return assembleEnvFileData({
        testRunner,
        targetCluster,
        targetEnvironment,
        apiUrl,
        scenario,
        enableReport,
        reportPath,
        reportFilename,
        dashboardExportPath,
        autoOpenDashboardInBrowser,
        dashboardRefreshRate,
    })
}

function assembleEnvFileData(params: PerformanceTestData) {
    const data = `
export TEST_RUNNER=${params.testRunner}
export TARGET_CLUSTER=${params.targetCluster}
export TARGET_ENVIRONMENT=${params.targetEnvironment}
export API_URL=${params.apiUrl}
export SCENARIO=${params.scenario}
export K6_WEB_DASHBOARD=${params.enableReport}
export REPORT_PATH=${params.reportPath}
export REPORT_FILENAME=${params.reportFilename}
export K6_WEB_DASHBOARD_EXPORT=${params.dashboardExportPath}
export K6_WEB_DASHBOARD_OPEN=${params.autoOpenDashboardInBrowser}
export K6_WEB_DASHBOARD_PERIOD=${params.dashboardRefreshRate}
`

    return data
}

type PerformanceTestData = {
    testRunner: string
    targetCluster: string
    targetEnvironment: string
    apiUrl: string
    scenario: string
    enableReport: boolean
    reportPath: string
    reportFilename: string
    dashboardExportPath: string
    autoOpenDashboardInBrowser: boolean
    dashboardRefreshRate: string
}
