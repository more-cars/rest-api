import neo4j, {Driver, Session} from "neo4j-driver"
import type {DbNodeType} from "../../../src/db/types/DbNodeType"
import {getDriver} from "../../../src/db/driver"
import {runNeo4jQuery} from "../../../src/db/runNeo4jQuery"
import {mapDbNodeTypeToNeo4jNodeType} from "../../../src/db/nodes/mapDbNodeTypeToNeo4jNodeType"
import {getNamespacedNodeTypeLabel} from "../../../src/db/getNamespacedNodeTypeLabel"

export async function deleteAllNodesOfType(nodeType: DbNodeType) {
    const driver: Driver = getDriver()
    const session: Session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    const dbNodeType = mapDbNodeTypeToNeo4jNodeType(nodeType)

    await session.executeWrite(async txc => {
        await runNeo4jQuery(`
            MATCH (node:${getNamespacedNodeTypeLabel(dbNodeType)})
            DETACH DELETE node
        `, txc)
    })

    await session.close()
}
