import fs from "node:fs"
import {getMigrationRunner} from "./getMigrationRunner"
import {getTargetCluster} from "./getTargetCluster"
import {getTargetEnvironment} from "./getTargetEnvironment"

collectParams()
    .then((data) => {
        const filename = process.argv[2]
        fs.writeFileSync(__dirname + '/../' + filename, data)
    })

async function collectParams() {
    const migrationRunner = await getMigrationRunner(process.env.MIGRATION_RUNNER)
    const targetCluster = await getTargetCluster(migrationRunner, process.env.TARGET_CLUSTER)
    const targetEnvironment = await getTargetEnvironment(targetCluster, process.env.TARGET_ENVIRONMENT)

    return assembleEnvFileData({
        migrationRunner,
        targetCluster,
        targetEnvironment,
    })
}

function assembleEnvFileData(params: Mc1DbRestoreConfig) {
    return `
export MIGRATION_RUNNER=${params.migrationRunner}
export TARGET_CLUSTER=${params.targetCluster}
export TARGET_ENVIRONMENT=${params.targetEnvironment}
`
}

type Mc1DbRestoreConfig = {
    migrationRunner: string
    targetCluster: string
    targetEnvironment: string
}
