import fs from "node:fs"
import {getMigrationRunner} from "./getMigrationRunner"
import {getTargetCluster} from "./getTargetCluster"
import {getTargetEnvironment} from "./getTargetEnvironment"
import {getTargetDb} from "./getTargetDb"
import {getDataType} from "./getDataType"
import {getSourceDb} from "./getSourceDb"
import {getDbNewPassword} from "./getDbNewPassword"
import {getDbOldPassword} from "./getDbOldPassword"

collectParams()
    .then((data) => {
        const filename = process.argv[2]
        fs.writeFileSync(__dirname + '/../' + filename, data)
    })

async function collectParams() {
    const migrationRunner = await getMigrationRunner(process.env.MIGRATION_RUNNER)
    const targetCluster = await getTargetCluster(migrationRunner, process.env.TARGET_CLUSTER)
    const targetEnvironment = await getTargetEnvironment(targetCluster, process.env.TARGET_ENVIRONMENT)
    const sourceDb = await getSourceDb(process.env.MIGRATION_SOURCE_DB_HOST)
    const sourceDbPassword = getDbOldPassword(process.env.MIGRATION_SOURCE_DB_PASSWORD)
    const targetDb = getTargetDb(migrationRunner, targetCluster, targetEnvironment, process.env.MIGRATION_TARGET_DB_HOST)
    const targetDbPassword = getDbNewPassword(process.env.MIGRATION_TARGET_DB_PASSWORD)
    const dataType = await getDataType(process.env.DATA_TYPE)

    return assembleEnvFileData({
        migrationRunner,
        targetCluster,
        targetEnvironment,
        sourceDbHost: sourceDb,
        sourceDbPassword: sourceDbPassword,
        targetDbHost: targetDb,
        targetDbPassword: targetDbPassword,
        dataType,
    })
}

function assembleEnvFileData(params: MigrationConfig) {
    return `
export MIGRATION_RUNNER=${params.migrationRunner}
export TARGET_CLUSTER=${params.targetCluster}
export TARGET_ENVIRONMENT=${params.targetEnvironment}
export DB_MC1_HOST=${params.sourceDbHost}
export DB_MC1_PASSWORD=${params.sourceDbPassword}
export DB_HOST=${params.targetDbHost}
export DB_PASSWORD=${params.targetDbHost}
export DATA_TYPE=${params.dataType}
`
}

type MigrationConfig = {
    migrationRunner: string
    targetCluster: string
    targetEnvironment: string
    sourceDbHost: string,
    sourceDbPassword: string,
    targetDbHost: string,
    targetDbPassword: string,
    dataType: string,
}
