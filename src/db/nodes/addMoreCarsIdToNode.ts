import neo4j, {Node} from "neo4j-driver"
import type {DbNode} from "../types/DbNode"
import {getDriver} from "../driver"
import {runNeo4jQuery} from "../runNeo4jQuery"
import {convertNeo4jNodeToDbNode} from "./convertNeo4jNodeToDbNode"
import {getDenamespacedNodeTypeLabel} from "../getNamespacedNodeTypeLabel"
import {Neo4jNodeType} from "../types/Neo4jNodeType"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

export async function addMoreCarsIdToNode(moreCarsId: number, elementId: string): Promise<DbNode> {
    const driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    try {
        const node = await session.executeWrite(async txc => {
            const result = await runNeo4jQuery(addMoreCarsIdToNodeQuery(moreCarsId, elementId), txc)
            return result.records[0].get('n') as Node
        })

        return convertNeo4jNodeToDbNode(node, getDenamespacedNodeTypeLabel(node.labels[0]) as Neo4jNodeType)
    } finally {
        await session.close()
    }
}

export function addMoreCarsIdToNodeQuery(moreCarsId: number, elementId: string) {
    return getCypherQueryTemplate('nodes/_cypher/addMoreCarsIdToNode.cypher')
        .trim()
        .replace('$elementId', elementId)
        .replace('$moreCarsId', moreCarsId.toString())
}
