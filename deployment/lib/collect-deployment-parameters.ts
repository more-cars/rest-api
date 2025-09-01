import fs from "node:fs"
import {getTargetCluster} from "./getTargetCluster"
import {getTargetEnvironment} from "./getTargetEnvironment"
import {getTargetVersion} from "./getTargetVersion"

collectParams()
    .then((data) => {
        const filename = process.argv[2]
        fs.writeFileSync(__dirname + '/../' + filename, data)
    })

async function collectParams() {
    const targetCluster = await getTargetCluster(process.env.TARGET_CLUSTER)
    const targetEnvironment = await getTargetEnvironment(process.env.TARGET_ENVIRONMENT, targetCluster)
    const targetVersion = await getTargetVersion(process.env.TARGET_VERSION)

    return assembleEnvFileData({
        targetCluster,
        targetEnvironment,
        targetVersion,
    })
}

function assembleEnvFileData(params: DeployAppConfig) {
    const data = `
export TARGET_CLUSTER=${params.targetCluster}
export TARGET_ENVIRONMENT=${params.targetEnvironment}
export TARGET_VERSION=${params.targetVersion}
`

    return data
}

type DeployAppConfig = {
    targetCluster: string
    targetEnvironment: string
    targetVersion: string
}
