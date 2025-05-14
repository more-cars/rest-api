import {Driver, Node} from "neo4j-driver"

/**
 * Adds the properties "created_at" and "updated_at" to the given node.
 */
export async function addTimestampsToNode(elementId: string, timestamp: string, driver: Driver): Promise<Node> {
    const {records} = await driver.executeQuery(`
        MATCH (node)
        WHERE elementId(node) = "${elementId}"
        SET 
            node.created_at = "${timestamp}", 
            node.updated_at = "${timestamp}"
        RETURN node
        LIMIT 1
    `)

    return records[0].get('node')
}
