import neo4j, {Driver, Node, Session} from "neo4j-driver"
import {getDriver} from "../driver"
import {runNeo4jQuery} from "../runNeo4jQuery"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

export async function addTimestampsToNode(elementId: string, createdAt: string, updatedAt: string): Promise<Node> {
    const driver: Driver = getDriver()
    const session: Session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    const dbNode: Node = await session.executeWrite(async txc => {
        const result = await runNeo4jQuery(addTimestampsToNodeQuery(elementId, createdAt, updatedAt), txc)
        return result.records[0].get('node')
    })

    await session.close()

    return dbNode
}

export function addTimestampsToNodeQuery(elementId: string, createdAt: string, updatedAt: string) {
    return getCypherQueryTemplate('nodes/_cypher/addTimestampsToNode.cypher')
        .trim()
        .replace('$elementId', elementId)
        .replace('$createdAt', createdAt)
        .replace('$updatedAt', updatedAt)
}
