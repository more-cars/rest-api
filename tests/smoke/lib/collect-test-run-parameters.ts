import fs from "node:fs"
import {getTargetEnvironment} from "./getTargetEnvironment"
import {getApiUrl} from "./getApiUrl"
import {getTestRunner} from "./getTestRunner"
import {isReportingEnabled} from "./isReportingEnabled"
import {getReportingPath} from "./getReportingPath"

collectParams()
    .then((data) => {
        const filename = process.argv[2]
        fs.writeFileSync(__dirname + '/../' + filename, data)
    })

async function collectParams() {
    const testRunner = await getTestRunner(process.env.TEST_RUNNER)
    const targetEnvironment = await getTargetEnvironment(process.env.TARGET_ENVIRONMENT)
    const apiUrl = getApiUrl(targetEnvironment, process.env.API_URL)
    const reportsEnabled = await isReportingEnabled(process.env.REPORTS_ENABLED)
    const reportsPath = reportsEnabled ? getReportingPath(process.env.REPORTS_PATH) : ''

    return assembleEnvFileData({
        testRunner,
        targetEnvironment,
        apiUrl,
        reportsEnabled,
        reportsPath,
    })
}

function assembleEnvFileData(params: SmokeTestData) {
    const data = `
export TARGET_ENVIRONMENT=${params.targetEnvironment}
export API_URL=${params.apiUrl}
export TEST_RUNNER=${params.testRunner}
export REPORTS_ENABLED=${params.reportsEnabled}
export REPORTS_PATH=${params.reportsPath}
`

    return data
}

type SmokeTestData = {
    targetEnvironment: string
    apiUrl: string
    testRunner: string
    reportsEnabled: boolean
    reportsPath: string
}
