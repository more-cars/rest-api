import fs from "node:fs"
import {getTestRunner} from "../../smoke/lib/getTestRunner"
import {getTargetEnvironment} from "./getTargetEnvironment"
import {getApiUrl} from "./getApiUrl"
import {getTestScenario} from "./getTestScenario"
import {isReportEnabled} from "./isReportEnabled"
import {getReportPath} from "./getReportPath"
import {isDashboardOpenedInBrowser} from "./isDashboardOpenedInBrowser"
import {getDashboardRefreshRate} from "./getDashboardRefreshRate"
import {getReportFilename} from "./getReportFilename"

collectParams()
    .then((data) => {
        const filename = process.argv[2]
        fs.writeFileSync(__dirname + '/../' + filename, data)
    })

async function collectParams() {
    const testRunner = await getTestRunner(process.env.TEST_RUNNER)
    const targetEnvironment = await getTargetEnvironment(process.env.TARGET_ENVIRONMENT)
    const apiUrl = getApiUrl(targetEnvironment, process.env.API_URL)
    const scenario = await getTestScenario(process.env.SCENARIO)
    const enableReport = await isReportEnabled(process.env.K6_WEB_DASHBOARD)
    const reportPath = getReportPath(process.env.REPORT_PATH)
    const reportFilename = getReportFilename(process.env.REPORT_FILENAME)
    const dashboardExportPath = reportPath + '/' + reportFilename
    const autoOpenDashboardInBrowser = await isDashboardOpenedInBrowser(process.env.K6_WEB_DASHBOARD_OPEN)
    const dashboardRefreshRate = getDashboardRefreshRate(process.env.K6_WEB_DASHBOARD_PERIOD)

    return assembleEnvFileData({
        testRunner,
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
