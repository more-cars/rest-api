import neo4j, {Node} from "neo4j-driver"
import type {DbNodeType} from "../types/DbNodeType"
import type {DbInputData} from "../types/DbInputData"
import type {DbNode} from "../types/DbNode"
import {getDriver} from "../driver"
import {runNeo4jQuery} from "../runNeo4jQuery"
import {convertNeo4jNodeToDbNode} from "./convertNeo4jNodeToDbNode"
import {getDenamespacedNodeTypeLabel, getNamespacedNodeTypeLabel} from "../getNamespacedNodeTypeLabel"
import {Neo4jNodeType} from "../types/Neo4jNodeType"
import {mapDbNodeTypeToNeo4jNodeType} from "./mapDbNodeTypeToNeo4jNodeType"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"
import {getCypherFormattedProperties} from "./getCypherFormattedProperties"

export async function updateDbNode(nodeType: DbNodeType, id: number, data: DbInputData): Promise<DbNode> {
    const driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    try {
        const node = await session.executeWrite(async txc => {
            const inputData = {...data}
            inputData.updated_at = new Date().toISOString()

            const result = await runNeo4jQuery(updateNodeQuery(nodeType, id, inputData), txc)
            return result.records[0].get('n') as Node
        })

        return convertNeo4jNodeToDbNode(node, getDenamespacedNodeTypeLabel(node.labels[0]) as Neo4jNodeType)
    } finally {
        await session.close()
    }
}

export function updateNodeQuery(nodeType: DbNodeType, id: number, data: DbInputData) {
    const nodeTypeLabel = getNamespacedNodeTypeLabel(mapDbNodeTypeToNeo4jNodeType(nodeType))
    const properties = getCypherFormattedProperties(data)

    return getCypherQueryTemplate('nodes/_cypher/updateNode.cypher')
        .trim()
        .replace('$label', nodeTypeLabel)
        .replace('$id', id.toString())
        .replace('$properties', properties)
}
