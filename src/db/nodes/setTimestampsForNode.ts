import neo4j, {Node} from "neo4j-driver"
import type {DbNode} from "../types/DbNode"
import {getDriver} from "../driver"
import {runNeo4jQuery} from "../runNeo4jQuery"
import {convertNeo4jNodeToDbNode} from "./convertNeo4jNodeToDbNode"
import {getDenamespacedNodeTypeLabel} from "../getNamespacedNodeTypeLabel"
import {Neo4jNodeType} from "../types/Neo4jNodeType"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

export async function setTimestampsForNode(moreCarsId: number, createdAt: string, updatedAt: string): Promise<DbNode> {
    const driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    try {
        const node = await session.executeWrite(async txc => {
            const result = await runNeo4jQuery(setTimestampsForNodeQuery(moreCarsId, createdAt, updatedAt), txc)
            return result.records[0].get('n') as Node
        })

        return convertNeo4jNodeToDbNode(node, getDenamespacedNodeTypeLabel(node.labels[0]) as Neo4jNodeType)
    } finally {
        await session.close()
    }
}

export function setTimestampsForNodeQuery(moreCarsId: number, createdAt: string, updatedAt: string) {
    return getCypherQueryTemplate('nodes/_cypher/setTimestampsForNode.cypher')
        .trim()
        .replace('$nodeId', moreCarsId.toString())
        .replace('$createdAt', createdAt)
        .replace('$updatedAt', updatedAt)
}
