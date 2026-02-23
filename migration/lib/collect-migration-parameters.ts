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
import {getStartNodeType} from "./getStartNodeType"
import {getEndNodeType} from "./getEndNodeType"
import {getRelationshipType} from "./getRelationshipType"

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
    let nodeType, relationshipType, startNodeType, endNodeType

    if (dataType === 'nodes') {
        nodeType = await getNodeType(process.env.MIGRATE_NODE_TYPE)
    } else if (dataType === 'relationships') {
        startNodeType = await getStartNodeType(process.env.START_NODE_TYPE)
        endNodeType = await getEndNodeType(startNodeType, process.env.END_NODE_TYPE)
        relationshipType = await getRelationshipType(startNodeType, endNodeType, process.env.MIGRATE_RELATIONSHIP_TYPE)
    }

    return assembleEnvFileData({
        migrationRunner,
        targetCluster,
        targetEnvironment,
        sourceDbHost: sourceDb,
        sourceDbPassword: sourceDbPassword,
        targetDbHost: targetDb,
        targetDbPassword: targetDbPassword,
        dataType,
        nodeType: nodeType || '',
        relationshipType: relationshipType || '',
        startNodeType: startNodeType || '',
        endNodeType: endNodeType || '',
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
export MIGRATE_RELATIONSHIP_TYPE=${params.relationshipType}
export START_NODE_TYPE=${params.startNodeType}
export END_NODE_TYPE=${params.endNodeType}
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
    relationshipType: string,
    startNodeType: string,
    endNodeType: string,
}
