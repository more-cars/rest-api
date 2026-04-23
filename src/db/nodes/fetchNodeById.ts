import neo4j, {Node} from "neo4j-driver"
import {DbNodeType} from "../types/DbNodeType"
import type {DbNode} from "../types/DbNode"
import {getDriver} from "../driver"
import {runNeo4jQuery} from "../runNeo4jQuery"
import {convertNeo4jNodeToDbNode} from "./convertNeo4jNodeToDbNode"
import {getDenamespacedNodeTypeLabel, getNamespacedNodeTypeLabel} from "../getNamespacedNodeTypeLabel"
import {Neo4jNodeType} from "../types/Neo4jNodeType"
import {mapDbNodeTypeToNeo4jNodeType} from "./mapDbNodeTypeToNeo4jNodeType"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

export async function fetchNodeById(id: number, nodeType: DbNodeType = DbNodeType.Node): Promise<DbNode | false> {
    const driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.READ})

    try {
        const records = await session.executeRead(async txc => {
            const result = await runNeo4jQuery(fetchNodeByIdQuery(id, nodeType), txc)
            return result.records
        })

        if (records.length === 0) {
            return false
        }

        const node = records[0].get('n') as Node

        return convertNeo4jNodeToDbNode(node, getDenamespacedNodeTypeLabel(node.labels[0]) as Neo4jNodeType)
    } finally {
        await session.close()
    }
}

export function fetchNodeByIdQuery(id: number, nodeType: DbNodeType = DbNodeType.Node) {
    const nodeTypeLabel = getNamespacedNodeTypeLabel(mapDbNodeTypeToNeo4jNodeType(nodeType))

    return getCypherQueryTemplate('nodes/_cypher/getNodeById.cypher')
        .trim()
        .replace(':nodeLabel', nodeType === DbNodeType.Node ? '' : `:${nodeTypeLabel}`)
        .replace('$id', id.toString())
}
