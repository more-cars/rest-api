import fs from "node:fs"
import {getTargetCluster} from "./getTargetCluster"
import {getTargetEnvironment} from "./getTargetEnvironment"
import {getPackageName} from "./getPackageName"
import {getPackageVersion} from "./getPackageVersion"

collectParams()
    .then((data) => {
        const filename = process.argv[2]
        fs.writeFileSync(__dirname + '/../' + filename, data)
    })

async function collectParams() {
    const targetCluster = await getTargetCluster(process.env.TARGET_CLUSTER)
    const targetEnvironment = await getTargetEnvironment(process.env.TARGET_ENVIRONMENT, targetCluster)
    const packageName = await getPackageName(process.env.PACKAGE_NAME)
    const packageVersion = await getPackageVersion(process.env.PACKAGE_VERSION)

    return assembleEnvFileData({
        targetCluster,
        targetEnvironment,
        packageName,
        packageVersion,
    })
}

function assembleEnvFileData(params: DeployAppConfig) {
    const data = `
export TARGET_CLUSTER=${params.targetCluster}
export TARGET_ENVIRONMENT=${params.targetEnvironment}
export PACKAGE_NAME=${params.packageName}
export PACKAGE_VERSION=${params.packageVersion}
`

    return data
}

type DeployAppConfig = {
    targetCluster: string
    targetEnvironment: string
    packageName: string
    packageVersion: string
}
