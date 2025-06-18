import {Driver, Node} from "neo4j-driver"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

/**
 * Adds the properties "created_at" and "updated_at" to the given node.
 */
export async function addTimestampsToNode(elementId: string, timestamp: string, driver: Driver): Promise<Node> {
    const {records} = await driver.executeQuery(addTimestampsToNodeQuery(elementId, timestamp, timestamp))

    return records[0].get('node')
}

export function addTimestampsToNodeQuery(elementId: string, createdAt: string, updatedAt: string) {
    return getCypherQueryTemplate('nodes/_cypher/addTimestampsToNode.cypher')
        .trim()
        .replace('$elementId', elementId)
        .replace('$createdAt', createdAt)
        .replace('$updatedAt', updatedAt)
}
