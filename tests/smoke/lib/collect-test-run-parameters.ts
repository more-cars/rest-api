import fs from "node:fs"
import {getTargetEnvironment} from "./getTargetEnvironment"
import {getApiUrl} from "./getApiUrl"
import {getTestRunner} from "./getTestRunner"
import {getTargetCluster} from "./getTargetCluster"
import {isReportingEnabled} from "./isReportingEnabled"
import {getReportingPath} from "./getReportingPath"

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
    const reportsEnabled = await isReportingEnabled(process.env.REPORTS_ENABLED)
    const reportsPath = reportsEnabled ? getReportingPath(testRunner, process.env.REPORTS_PATH) : ''

    return assembleEnvFileData({
        testRunner,
        targetCluster,
        targetEnvironment,
        apiUrl,
        reportsEnabled,
        reportsPath,
    })
}

function assembleEnvFileData(params: SmokeTestData) {
    const data = `
export TEST_RUNNER=${params.testRunner}
export TARGET_CLUSTER=${params.targetCluster}
export TARGET_ENVIRONMENT=${params.targetEnvironment}
export API_URL=${params.apiUrl}
export REPORTS_ENABLED=${params.reportsEnabled}
export REPORTS_PATH=${params.reportsPath}
`

    return data
}

type SmokeTestData = {
    testRunner: string
    targetCluster: string
    targetEnvironment: string
    apiUrl: string
    reportsEnabled: boolean
    reportsPath: string
}
