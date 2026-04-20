import neo4j, {Driver, Node, Session} from "neo4j-driver"
import {getDriver} from "../driver"
import {runNeo4jQuery} from "../runNeo4jQuery"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

export async function addMoreCarsIdToNode(
    elementId: string,
    moreCarsId: number,
): Promise<Node> {
    const driver: Driver = getDriver()
    const session: Session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    const dbNode: Node = await session.executeWrite(async txc => {
        const result = await runNeo4jQuery(addMoreCarsIdToNodeQuery(elementId, moreCarsId), txc)
        return result.records[0].get('node')
    })

    await session.close()

    return dbNode
}

export function addMoreCarsIdToNodeQuery(elementId: string, moreCarsId: number) {
    return getCypherQueryTemplate('nodes/_cypher/addMoreCarsIdToNode.cypher')
        .trim()
        .replace('$elementId', elementId)
        .replace('$moreCarsId', moreCarsId.toString())
}
