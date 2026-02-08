import neo4j, {Driver, Session} from "neo4j-driver"
import {getDriver} from "../driver"
import {getCypherQueryTemplate} from "../getCypherQueryTemplate"

export async function deleteNode(id: number): Promise<boolean> {
    const driver: Driver = getDriver()
    const session: Session = driver.session({defaultAccessMode: neo4j.session.WRITE})

    const result = await session.executeWrite(async txc => {
        const result = await txc.run(deleteNodeQuery(id))
        return result.summary.counters.containsUpdates()
    })

    await session.close()

    return result
}

export function deleteNodeQuery(id: number) {
    return getCypherQueryTemplate('nodes/_cypher/deleteNode.cypher')
        .trim()
        .replace('$id', id.toString())
}
