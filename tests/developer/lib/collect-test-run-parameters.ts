import fs from "node:fs"
import {getTestRunner} from "./getTestRunner"
import {getTargetCluster} from "./getTargetCluster"
import {getTargetEnvironment} from "./getTargetEnvironment"
import {getTestVersion} from "./getTestVersion"
import {getReportingPath} from "./getReportingPath"
import {isCodeCoverageEnabled} from "./isCodeCoverageEnabled"

collectParams()
    .then((data) => {
        const filename = process.argv[2]
        fs.writeFileSync(__dirname + '/../' + filename, data)
    })

async function collectParams() {
    const testRunner = await getTestRunner(process.env.TEST_RUNNER)
    const targetCluster = await getTargetCluster(testRunner, process.env.TARGET_CLUSTER)
    const targetEnvironment = await getTargetEnvironment(targetCluster, process.env.TARGET_ENVIRONMENT)
    const testVersion = await getTestVersion(testRunner, targetCluster, process.env.TEST_VERSION)
    const codeCoverageEnabled = await isCodeCoverageEnabled(process.env.CODE_COVERAGE_ENABLED)
    const reportsPath = getReportingPath(testRunner, process.env.REPORTS_PATH)

    return assembleEnvFileData({
        testRunner,
        targetCluster,
        targetEnvironment,
        testVersion,
        codeCoverageEnabled,
        reportsPath,
    })
}

function assembleEnvFileData(params: DeveloperTestsConfig) {
    return `
export TEST_RUNNER=${params.testRunner}
export TARGET_CLUSTER=${params.targetCluster}
export TARGET_ENVIRONMENT=${params.targetEnvironment}
export TEST_VERSION=${params.testVersion}
export CODE_COVERAGE_ENABLED=${params.codeCoverageEnabled}
export REPORTS_PATH=${params.reportsPath}
`
}

type DeveloperTestsConfig = {
    testRunner: string
    targetCluster: string
    targetEnvironment: string
    testVersion: string
    codeCoverageEnabled: boolean
    reportsPath: string
}
