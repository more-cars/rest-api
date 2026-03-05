import type {DbNodeType} from "../types/DbNodeType"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"
import {getNamespacedNodeTypeLabel} from "../getNamespacedNodeTypeLabel"
import {mapDbNodeTypeToNeo4jNodeType} from "./mapDbNodeTypeToNeo4jNodeType"
import neo4j, {type Session} from "neo4j-driver"
import {getDriver} from "../driver"

export async function fetchNodeCountByNodeType(nodeType: DbNodeType) {
    const driver = getDriver()
    const session: Session = driver.session({defaultAccessMode: neo4j.session.READ})

    const records = await session.executeRead(async txc => {
        const result = await txc.run(fetchNodeCountByNodeTypeQuery(nodeType))
        return result.records
    })

    await session.close()

    return records[0].get('nodeCount') as number
}

export function fetchNodeCountByNodeTypeQuery(nodeType: DbNodeType) {
    const nodeTypeLabel = getNamespacedNodeTypeLabel(mapDbNodeTypeToNeo4jNodeType(nodeType))

    return getCypherQueryTemplate('nodes/_cypher/getNodeCountByNodeLabel.cypher')
        .trim()
        .replace(':nodeLabel', `:${nodeTypeLabel}`)
}
