import fs from "node:fs"
import {getMigrationRunner} from "./getMigrationRunner"
import {getTargetCluster} from "./getTargetCluster"
import {getTargetEnvironment} from "./getTargetEnvironment"
import {getSourceDb} from "./getSourceDb"
import {getSourceDbPassword} from "./getSourceDbPassword"
import {getTargetDb} from "./getTargetDb"
import {getTargetDbPassword} from "./getTargetDbPassword"
import {getDataType} from "./getDataType"
import {getNodeType} from "./getNodeType"
import {deleteExistingNodes} from "./deleteExistingNodes"

collectParams()
    .then((data) => {
        const filename = process.argv[2]
        fs.writeFileSync(__dirname + '/../' + filename, data)
    })

async function collectParams() {
    const migrationRunner = await getMigrationRunner(process.env.MIGRATION_RUNNER)
    const targetCluster = await getTargetCluster(migrationRunner, process.env.TARGET_CLUSTER)
    const targetEnvironment = await getTargetEnvironment(targetCluster, process.env.TARGET_ENVIRONMENT)
    const sourceDb = await getSourceDb(migrationRunner, process.env.MIGRATION_SOURCE_DB_HOST)
    const sourceDbPassword = getSourceDbPassword(process.env.MIGRATION_SOURCE_DB_PASSWORD)
    const targetDb = getTargetDb(migrationRunner, targetCluster, targetEnvironment, process.env.MIGRATION_TARGET_DB_HOST)
    const targetDbPassword = getTargetDbPassword(process.env.MIGRATION_TARGET_DB_PASSWORD)
    const dataType = await getDataType(process.env.MIGRATE_DATA_TYPE)

    let nodeType = ''
    if (dataType === 'nodes') {
        nodeType = await getNodeType(process.env.MIGRATE_NODE_TYPE)

    } else if (dataType === 'relationships') {

    }

    const deleteExistingData = await deleteExistingNodes(process.env.DELETE_EXISTING_DATA)

    return assembleEnvFileData({
        migrationRunner,
        targetCluster,
        targetEnvironment,
        sourceDbHost: sourceDb,
        sourceDbPassword: sourceDbPassword,
        targetDbHost: targetDb,
        targetDbPassword: targetDbPassword,
        dataType,
        nodeType,
        deleteExistingData,
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
export DB_PASSWORD=${params.targetDbPassword}
export MIGRATE_DATA_TYPE=${params.dataType}
export MIGRATE_NODE_TYPE=${params.nodeType}
export DELETE_EXISTING_DATA=${params.deleteExistingData}
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
    nodeType: string,
    deleteExistingData: boolean,
}
