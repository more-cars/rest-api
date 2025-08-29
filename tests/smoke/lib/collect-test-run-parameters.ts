import fs from "node:fs"
import {getTargetEnvironment} from "./getTargetEnvironment"
import {getApiUrl} from "./getApiUrl"
import {getTestRunner} from "./getTestRunner"

const filename = process.argv[2]

collectParams()
    .then((data) => {
        fs.writeFileSync(__dirname + '/../' + filename, data)
    })

async function collectParams() {
    const testRunner = process.env.TEST_RUNNER || await getTestRunner()
    const targetEnvironment = process.env.TARGET_ENVIRONMENT || await getTargetEnvironment()
    const apiUrl = process.env.API_URL || getApiUrl(targetEnvironment) || ''
    return assembleEnvFileData({
        testRunner,
        targetEnvironment,
        apiUrl,
    })
}

function assembleEnvFileData(params: SmokeTestData) {
    const data = `
export TARGET_ENVIRONMENT=${params.targetEnvironment}
export API_URL=${params.apiUrl}
export TEST_RUNNER=${params.testRunner}
`

    return data
}

type SmokeTestData = {
    targetEnvironment: string
    apiUrl: string
    testRunner: string
}
