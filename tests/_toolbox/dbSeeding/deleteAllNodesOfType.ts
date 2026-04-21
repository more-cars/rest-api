import neo4j from "neo4j-driver"
import type {DbNodeType} from "../../../src/db/types/DbNodeType"
import {closeDriver, getDriver} from "../../../src/db/driver"
import {runNeo4jQuery} from "../../../src/db/runNeo4jQuery"
import {mapDbNodeTypeToNeo4jNodeType} from "../../../src/db/nodes/mapDbNodeTypeToNeo4jNodeType"
import {getNamespacedNodeTypeLabel} from "../../../src/db/getNamespacedNodeTypeLabel"

export async function deleteAllNodesOfType(nodeType: DbNodeType) {
    const driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    const dbNodeType = mapDbNodeTypeToNeo4jNodeType(nodeType)

    try {
        await session.executeWrite(async txc => {
            await runNeo4jQuery(`
            MATCH (node:${getNamespacedNodeTypeLabel(dbNodeType)})
            DETACH DELETE node
        `, txc)
        })
    } finally {
        await session.close()
        await closeDriver()
    }
}
