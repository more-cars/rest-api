import {Driver, Node, Session} from "neo4j-driver"
import {closeDriver, getDriver} from "../driver.ts"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

/**
 * Adds the properties "created_at" and "updated_at" to the given node.
 */
export async function addTimestampsToNode(elementId: string, timestamp: string): Promise<Node> {
    const driver: Driver = getDriver()
    const session: Session = driver.session()

    const {records} = await driver.executeQuery(addTimestampsToNodeQuery(elementId, timestamp, timestamp))

    await session.close()
    await closeDriver(driver)

    return records[0].get('node')
}

export function addTimestampsToNodeQuery(elementId: string, createdAt: string, updatedAt: string) {
    return getCypherQueryTemplate('nodes/_cypher/addTimestampsToNode.cypher')
        .trim()
        .replace('$elementId', elementId)
        .replace('$createdAt', createdAt)
        .replace('$updatedAt', updatedAt)
}
