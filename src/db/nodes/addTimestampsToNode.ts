import neo4j, {Driver, Node, Session} from "neo4j-driver"
import {getDriver} from "../driver"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

/**
 * Adds the properties "created_at" and "updated_at" to the given node.
 */
export async function addTimestampsToNode(elementId: string, createdAt: string, updatedAt: string): Promise<Node> {
    const driver: Driver = getDriver()
    const session: Session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    const dbNode: Node = await session.executeWrite(async txc => {
        const result = await txc.run(addTimestampsToNodeQuery(elementId, createdAt, updatedAt))
        return result.records[0].get('node')
    })

    await session.close()
    await driver.close()

    return dbNode
}

export function addTimestampsToNodeQuery(elementId: string, createdAt: string, updatedAt: string) {
    return getCypherQueryTemplate('nodes/_cypher/addTimestampsToNode.cypher')
        .trim()
        .replace('$elementId', elementId)
        .replace('$createdAt', createdAt)
        .replace('$updatedAt', updatedAt)
}
