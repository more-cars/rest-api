import neo4j, {Node} from "neo4j-driver"
import type {DbNode} from "../types/DbNode"
import {getDriver} from "../driver"
import {runNeo4jQuery} from "../runNeo4jQuery"
import {convertNeo4jNodeToDbNode} from "./convertNeo4jNodeToDbNode"
import {getDenamespacedNodeTypeLabel} from "../getNamespacedNodeTypeLabel"
import {Neo4jNodeType} from "../types/Neo4jNodeType"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

// TODO: oldMoreCarsId is a fallback in case the elementId is unknown -> this is a workaround for the migration scripts -> can be removed after all migrations are done
export async function addMoreCarsIdToNode(newMoreCarsId: number, elementId: string, oldMoreCarsId?: number): Promise<DbNode> {
    const driver = getDriver()
    const session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    try {
        const node = await session.executeWrite(async txc => {
            const result = await runNeo4jQuery(addMoreCarsIdToNodeQuery(newMoreCarsId, elementId, oldMoreCarsId), txc)
            return result.records[0].get('n') as Node
        })

        return convertNeo4jNodeToDbNode(node, getDenamespacedNodeTypeLabel(node.labels[0]) as Neo4jNodeType)
    } finally {
        await session.close()
    }
}

export function addMoreCarsIdToNodeQuery(newMoreCarsId: number, elementId: string, oldMoreCarsId?: number) {
    let template = getCypherQueryTemplate('nodes/_cypher/addMoreCarsIdToNode.cypher')
        .trim()
        .replace('$moreCarsId', newMoreCarsId.toString())

    if (oldMoreCarsId) {
        template = template.replace('elementId(n)', 'n.mc_id')
        template = template.replace("'$elementId'", oldMoreCarsId.toString())
    } else {
        template = template.replace('$elementId', elementId)
    }

    return template
}
