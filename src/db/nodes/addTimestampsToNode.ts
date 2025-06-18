import {Driver, Node} from "neo4j-driver"
import {addTimestampsToNodeQuery} from "./addTimestampsToNodeQuery"

/**
 * Adds the properties "created_at" and "updated_at" to the given node.
 */
export async function addTimestampsToNode(elementId: string, timestamp: string, driver: Driver): Promise<Node> {
    const {records} = await driver.executeQuery(addTimestampsToNodeQuery(elementId, timestamp, timestamp))

    return records[0].get('node')
}
